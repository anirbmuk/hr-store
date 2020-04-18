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
            { id: 'locdept', label: i18nutils.translate('masterdetail.locdept_tab') },
            { id: 'empdirect', label: i18nutils.translate('masterdetail.empdirect_tab') },
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