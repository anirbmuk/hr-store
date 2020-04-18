define(['knockout', 'hr-table/loader'],
function(ko) {

    function DepartmentViewModel() {

        const self = this;

        self.hasCreatePrivilege = ko.observable(authconfig.hasCreatePrivilege());
        self.hasEditPrivilege = ko.observable(authconfig.hasEditPrivilege());
        self.hasDeletePrivilege = ko.observable(authconfig.hasDeletePrivilege());

        self.validateUniqueDepartment = {
            validate: function(value) {
                return new Promise(function(resolve, reject) {
                    if (!value) {
                        resolve();
                    } else {
                        restutils.getRestData('departments/' + value, null,
                        function() { reject({ detail: i18nutils.translate('messages.departments.duplicate_department')}); },
                        function() { resolve(); })
                    }
                });
            }
        };

        self.validateExistingEmployee = {
            validate: function(value) {
                return new Promise(function(resolve, reject) {
                    if (!value) {
                        resolve();
                    } else {
                        restutils.getRestData('employees/' + value, null,
                        function() { resolve(); },
                        function() { reject({ detail: i18nutils.translate('messages.employees.not_exist_employee')}); })
                    }
                });
            }
        };

        self.validateExistingLocation = {
            validate: function(value) {
                return new Promise(function(resolve, reject) {
                    if (!value) {
                        resolve();
                    } else {
                        restutils.getRestData('locations/' + value, null,
                        function() { resolve(); },
                        function() { reject({ detail: i18nutils.translate('messages.locations.not_exist_location')}); })
                    }
                });
            }
        };

        self.asyncvalidators = [
            self.validateUniqueDepartment,
            self.validateExistingEmployee,
            self.validateExistingLocation
        ];

        self.parseDepartment = function(response) {
            return {
                DepartmentId: response.DepartmentId,
                DepartmentName: response.DepartmentName,
                ManagerId: response.ManagerId,
                LocationId: response.LocationId
            };
        };
        self.idAttribute = 'DepartmentId';
        self.urlPath = 'departments';

        self.departmentColumns = [
            { headerText: i18nutils.translate('attributes.departments.DepartmentId'), field: 'DepartmentId' },
            { headerText: i18nutils.translate('attributes.departments.DepartmentName'), field: 'DepartmentName' },
            { headerText: i18nutils.translate('attributes.departments.ManagerId'), field: 'ManagerId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: i18nutils.translate('attributes.departments.LocationId'), field: 'LocationId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' }
        ];

        self.departmentTableProperties = {
            columns: self.departmentColumns,
            sortOptions: 'DepartmentId:asc',
            toolbar: [
                {
                    name: 'create',
                    label: i18nutils.translate('actions.create'),
                    iconOnly: false,
                    handler: 'addHandler',
                    disabled: !authconfig.hasCreatePrivilege()
                },
                {
                    name: 'edit',
                    label: i18nutils.translate('actions.edit'),
                    iconOnly: false,
                    handler: 'editHandler',
                    disabled: !authconfig.hasEditPrivilege()
                },
                {
                    name: 'delete',
                    label: i18nutils.translate('actions.delete'),
                    iconOnly: false,
                    handler: 'deleteHandler',
                    disabled: !authconfig.hasDeletePrivilege()
                }
            ],
            selection: {
                row: 'single',
                column: 'none'
            },
            edit: {
                attributes: [
                    { componentId: 'department_di', field: 'DepartmentId', component: 'ojInputNumber',
                      label: i18nutils.translate('attributes.departments.DepartmentId'), required: true, editable: 'while-new',
                      asyncvalidators: [ self.asyncvalidators[0] ] },
                    { componentId: 'department_dn', field: 'DepartmentName', component: 'ojInputText',
                      label: i18nutils.translate('attributes.departments.DepartmentName'), required: true, editable: 'always' },
                    { componentId: 'department_mi', field: 'ManagerId', component: 'ojInputNumber',
                      label: i18nutils.translate('attributes.departments.ManagerId'), editable: 'always',
                      asyncvalidators: [ self.asyncvalidators[1] ] },
                    { componentId: 'department_li', field: 'LocationId', component: 'ojInputNumber',
                      label: i18nutils.translate('attributes.departments.LocationId'), editable: 'always',
                      asyncvalidators: [ self.asyncvalidators[2] ] }
                ]
            }
        };

        self.departmentModelProperties = {
            modelparams: {
                urlPath: self.urlPath,
                idAttribute: self.idAttribute,
                parse: self.parseDepartment
            }
        };

        self.departmentPagingProperties = {
            pagingEnabled: true,
            pageSize: 8
        };

        self.departmentSearchProperties = {
            showSearch: true,
            searchPlaceholder: i18nutils.translate('labels.search')
        }

    }

    return DepartmentViewModel;

});