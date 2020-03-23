define(
[
'knockout',
'ojs/ojmodule-element-utils',
'ojs/ojmodule-element',
'ojs/ojnavigationlist'
],
function(ko, ModuleElementUtils) {

    function MasterDetailViewModel() {

        const self = this;

        self.mdTabs = [
            { id: 'locdept', label: 'Locations & Departments' },
            { id: 'empdirect', label: 'Employees & Directs' },
        ];

        self.currentTab = ko.observable('locdept');

        self.currentModule = ko.computed(function() {
            return ModuleElementUtils.createConfig({
                name: 'md/' + self.currentTab()
            });
        });

    }

    return MasterDetailViewModel;

});