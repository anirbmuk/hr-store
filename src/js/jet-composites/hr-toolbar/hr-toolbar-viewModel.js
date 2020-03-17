define(
    ['knockout', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, Context) {
    
    function HrToolbarModel(context) {
        var self = this;

        self.composite = context.element;
        self.properties = context.properties;
        self.componentId = self.properties.componentId;

        self.toolbar = self.properties.toolbar;

        self.toolbarAction = function(action) {
          self.composite.dispatchEvent(new CustomEvent('toolbarAction', { detail: action }));
        };
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //HrToolbarModel.prototype.activated = function(context){
    //};

    //HrToolbarModel.prototype.connected = function(context){
    //};

    //HrToolbarModel.prototype.bindingsApplied = function(context){
    //};

    //HrToolbarModel.prototype.disconnect = function(context){
    //};

    //HrToolbarModel.prototype.propertyChanged = function(context){
    //};

    return HrToolbarModel;
});