define([
'knockout',
'ojs/ojcontext',
'jquery',
'ojs/ojarraydataprovider',
'ojs/ojpagingdataproviderview',
'ojs/ojcollectiondataprovider',
'helper/model-helper',
'ojs/ojknockout',
'ojs/ojtable',
'ojs/ojpagingcontrol',
'ojs/ojbutton',
'hr-toolbar/loader',
'ojs/ojdialog',
'ojs/ojformlayout',
'ojs/ojinputtext',
'ojs/ojinputnumber',
'ojs/ojdatetimepicker',
'ojs/ojvalidationgroup'
],
function (ko, Context, $, ArrayDataProvider, PagingDataProviderView, CollectionDataProvider, Model) {
    
    function HrTableModel(context) {
        var self = this;

        self.dataProvider = ko.observable();
        self.currentModel = ko.observable();

        self.messages = ko.observableArray([]);
        self.messagesDataprovider = messageutils.messagesDataprovider(self.messages);

        self.composite = context.element;
        self.properties = context.properties;

        self.componentId = self.properties.componentId;

        self.tableProperties = self.properties.tableProperties;
        self.modelProperties = self.properties.modelProperties;
        self.pagingProperties = self.properties.pagingProperties;
        self.templateProperties = self.properties.templateProperties || {};

        self.columns = self.tableProperties.columns;
        self.showToolbar = !!self.tableProperties.toolbar && Array.isArray(self.tableProperties.toolbar) && self.tableProperties.toolbar.length > 0;
        if (self.showToolbar) {
          self.toolbar = new ArrayDataProvider(ko.observableArray(self.tableProperties.toolbar), { keyAttributes: 'name' });
        } else {
          self.toolbar = new ArrayDataProvider([]);
        }

        if (!!self.tableProperties.edit && !!self.tableProperties.edit.attributes) {
          const modalFields = self.tableProperties.edit.attributes || [];
          self.modalDataProvider = new ArrayDataProvider(ko.observableArray(modalFields), { keyAttributes: 'componentId' });
        } else {
          self.modalDataProvider = new ArrayDataProvider(ko.observableArray([]), { keyAttributes: 'componentId' });
        }
        
        self.selectionMode = {};
        const selection = self.tableProperties.selection;
        if (!!selection) {
          self.selectionMode.row = !!selection.row ? selection.row : 'none',
          self.selectionMode.column = !!selection.column ? selection.column : 'none'
        }

        self.enablePaging = self.pagingProperties.pagingEnabled;
        self.pageSize = self.pagingProperties.pageSize || 8;

        self.modelparams = self.modelProperties.modelparams;
        self.preSave = self.modelProperties.preSave || function() { return true; };
        self.urlRoot = restutils.buildURLPath(self.modelparams.urlPath);
        
        self.model = Model.getModel({
          urlRoot: self.urlRoot,
          parse: self.modelparams.parse,
          idAttribute: self.modelparams.idAttribute
        });

        const modelObject = new self.model();

        self.collection = Model.getCollection({
          fetchSize: self.pageSize,
          url: self.urlRoot,
          model: modelObject
        });

        self.getCollection = function() {
          const collectionObject = new self.collection();
          collectionObject.customPagingOptions = function(response) {
            return {
                totalResults: response.estimatedCount
            };
        };
          collectionObject.customURL = function(operation, collection, options) {
            const limit = options.fetchSize;
            const skip = options.startIndex > 0 ? (Math.floor(options.startIndex / options.fetchSize) * limit): 0;
            return {
              url: self.urlRoot + '?limit=' + limit + '&skip=' + skip,
              contentType: 'application/json',
              beforeSend: restutils.beforeSend
            }
          };
          return collectionObject;
        };

        self.currentAction = ko.observable(null);

        self.onToolbarAction = function(event) {
          const handler = event.detail;
          const validhandler = self.validateHandler(handler);
          const modalId = '#' + self.componentId + '_addOrEditDialog';

          if (validhandler) {
            const currentModel = new self.model();
            self.currentAction(handler);

            const successFn = function(datamodel) {
              self.currentModel(datamodel);
              self.currentRow(datamodel.attributes);
              $(modalId)[0].open();
            };

            const errorFn = function(err) {
              console.error(err);
            };

            const fetchParams = {
              beforeSend: restutils.beforeSend,
              success: successFn,
              error: errorFn
            };
            
            if (handler === 'addHandler') {
              currentModel.fetch(fetchParams);
            } else if (handler === 'editHandler') {
              currentModel.id = self.currentRowKey();
              currentModel.fetch(fetchParams);
            } else if (handler === 'deleteHandler') {
              currentModel.id = self.currentRowKey();
              currentModel.destroy({
                beforeSend: restutils.beforeSend,
                success: function() {
                  self.messages(self.buildMessage('confirmation', 'Data saved', 'Your changes have been saved', 3000));
                  self.refreshDatasource();
                },
                error: function(err) {
                  self.messages(self.buildMessage('error', 'Operation error', err.responseJSON.error, 3000));
                },
                wait: true
              });
            }
          }
        };

        self.addOrEditModelSave = function() {
          const modalId = '#' + self.componentId + '_addOrEditDialog';
          const trackerId = '#' + self.componentId + '_addOrEditFormTracker';
          
          const successFn = function(data) {
            self.messages(self.buildMessage('confirmation', 'Data saved', 'Your changes have been saved', 3000));
            self.refreshDatasource();
            $(modalId)[0].close();
          };

          const errorFn = function(err) {
            self.messages(self.buildMessage('error', 'Operation error', err.responseJSON.error, 3000));
          };

          const currentModel = new self.model();
          const collection = self.getCollection();
          const data = self.currentRow();

          const saveAction = function() {
            if (self.currentAction() === 'addHandler') {
              collection.create(data, {
                beforeSend: restutils.beforeSend,
                success: successFn,
                error: errorFn
              });
            } else if (self.currentAction() === 'editHandler') {
              currentModel.save(data, {
                beforeSend: restutils.beforeSend,
                patch: 'patch',
                success: successFn,
                error: errorFn
              });
            }
          };

          if (self.isFormValid(trackerId)) {
            const preSaveValidation = self.preSave(data);
            if (typeof preSaveValidation === 'boolean') {
              if (preSaveValidation) {
                saveAction();
              } else {
                self.messages(self.buildMessage('error', 'Validation error', 'There are validation errors on the form', 3000));
              }
            } else if (preSaveValidation instanceof Promise) {
              preSaveValidation.then(function() {
                saveAction();
              }).catch(function(error) {
                self.messages(self.buildMessage('error', 'Validation error', error, 3000));
              });
            }
          } else {
            self.messages(self.buildMessage('error', 'Validation error', 'There are validation errors on the form', 3000));
          }
        }

        self.addOrEditModelCancel = function() {
          const modalId = '#' + self.componentId + '_addOrEditDialog';
          $(modalId)[0].close();
        }

        self.currentRowIndex = ko.observable(-1);
        self.currentRowKey = ko.observable(null);
        self.currentRow = ko.observable({});
        self.currentRowEventData = ko.observable({});
        self.currentModel = ko.observable(null);

        self.onBeforeRowSelection = function(event) {
          self.currentRowEventData(event.detail.currentRow);
        };

        self.onSelectionChange = function(event, data) {
          let keys = [];
          if (event.detail.value.row.values().size > 0) {
            event.detail.value.row.values().forEach(function (key) {
              keys.push(key);
            });
          }

          if (keys.length === 0) {
            self.currentRowIndex(-1);
            self.currentRowKey(null);
            self.currentRow({});
          } else {
            self.currentRowIndex(self.currentRowEventData().rowIndex);
            self.currentRowKey(self.currentRowEventData().rowKey);
            const eventDetails = {
              rowIndex: self.currentRowIndex(),
              rowKey: self.currentRowKey()
            };
            self.composite.dispatchEvent(new CustomEvent('rowSelectionChange', { bubbles: true, cancelable: false, detail: eventDetails }));
          }

        };
    };

    HrTableModel.prototype.getDataProvider = function() {
      return this.dataProvider();
    }

    HrTableModel.prototype.validateHandler = function(handler) {
      const self = this;
      if (handler === 'deleteHandler') {
        if (!authconfig.hasWritePrivilege()) {
          self.messages(self.buildMessage('error', 'Unauthorized action', 'Delete operation is not allowed', 3000));
          return false;
        }
        if (self.currentRowIndex() < 0) {
          self.messages(self.buildMessage('error', 'Invalid operation', 'You must select a row to delete', 3000));
          return false;
        }
      } else if (handler === 'editHandler') {
        if (!authconfig.hasWritePrivilege()) {
          self.messages(self.buildMessage('error', 'Unauthorized action', 'Edit operation is not allowed', 3000));
          return false;
        }
        if (self.currentRowIndex() < 0) {
          self.messages(self.buildMessage('error', 'Invalid operation', 'You must select a row to edit', 3000));
          return false;
        }
      } else if (handler === 'addHandler') {
        if (!authconfig.hasWritePrivilege()) {
          self.messages(self.buildMessage('error', 'Unauthorized action', 'Create operation is not allowed', 3000));
          return false;
        }
      }
      return true;
    };

    HrTableModel.prototype.isFormValid = function(trackerId) {
      const tracker = $(trackerId)[0];
      if (tracker && tracker.valid === 'valid') {
        return true;
      } else {
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
        return false;
      }
    };

    HrTableModel.prototype.buildMessage = function(code, message, detail, timeout) {
      return messageutils.buildMessage(code, {
        msgSummary: message,
        msgDetail: detail
      }, timeout);
    };

    HrTableModel.prototype.refreshDatasource = function() {
      const self = this;
      if (self.enablePaging) {
        self.dataProvider(new PagingDataProviderView(new CollectionDataProvider(self.getCollection())));
      } else {
        self.dataProvider(new CollectionDataProvider(self.getCollection()));
      }
    };

    HrTableModel.prototype.activated = function(context) {
      const self = this;
      self.refreshDatasource();
    };

    //HrTableModel.prototype.connected = function(context){
    //};

    //HrTableModel.prototype.bindingsApplied = function(context){
    //};

    //HrTableModel.prototype.disconnect = function(context){
    //};

    //HrTableModel.prototype.propertyChanged = function(context){
    //};

    return HrTableModel;
});