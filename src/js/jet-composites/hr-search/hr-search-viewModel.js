define([
'knockout',
'ojs/ojcontext',
'jquery',
'ojs/ojarraydataprovider',
'ojs/ojselectcombobox'
],
function (ko, Context, $, ArrayDataProvider) {
    
    function HrSearchModel(context) {
        var self = this;

        self.composite = context.element;
        self.properties = context.properties;

        self.componentId = self.properties.componentId;
        self.placeholder = self.properties.placeholder;

        self.thisComponentId = self.componentId + '_search';

        self.searchedItems = ko.observableArray([]);
        self.searchTags = ko.observableArray([]);
        self.searchTerm = ko.observable('');

        self.search = function(event) {
          const trigger = event.type;
          if (!trigger) {
            return;
          }
          const previouslySearchedItems = self.searchedItems();
          let searchTerm;
          if (trigger === 'ojValueUpdated') {
            searchTerm = event.detail.value;
          } else if (trigger === 'click') {
            searchTerm = $('#' + self.thisComponentId)[0].value;
          }
          if (!searchTerm) {
            self.searchTerm('');
          } else {
            self.searchTerm(searchTerm.trim());
          }
          if (!!self.searchTerm() && !previouslySearchedItems.some(item => item.value === self.searchTerm())) {
            previouslySearchedItems.unshift({ value: self.searchTerm().trim(), label: self.searchTerm().trim() })
          }
          self.searchedItems(previouslySearchedItems);
          self.searchTags(new ArrayDataProvider(previouslySearchedItems), { keyAttributes: 'value' });

          let eventValue = '';
          if (!!self.searchTerm()) {
            eventValue = 'filter=' + self.searchTerm();
          }
          self.composite.dispatchEvent(new CustomEvent('search', { bubbles: true, cancelable: false, detail: eventValue }));
        };

    };

    //HrSearchModel.prototype.activated = function(context) {
    //};

    //HrSearchModel.prototype.connected = function(context){
    //};

    //HrSearchModel.prototype.bindingsApplied = function(context){
    //};

    //HrSearchModel.prototype.disconnect = function(context){
    //};

    //HrSearchModel.prototype.propertyChanged = function(context){
    //};

    return HrSearchModel;
});