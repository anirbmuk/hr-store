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
                        restutils.getRestData('departments/' + value, null, function() { reject({ detail: 'Duplicate department id'}); }, function() { resolve(); })
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
                        restutils.getRestData('employees/' + value, null, function() { resolve(); }, function() { reject({ detail: 'Employee does not exist'}); })
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
                        restutils.getRestData('locations/' + value, null, function() { resolve(); }, function() { reject({ detail: 'Location does not exist'}); })
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
            { headerText: 'Department Id', field: 'DepartmentId' },
            { headerText: 'Department Name', field: 'DepartmentName' },
            { headerText: 'Manager Id', field: 'ManagerId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Location Id', field: 'LocationId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' }
        ];

        self.departmentTableProperties = {
            columns: self.departmentColumns,
            sortOptions: 'DepartmentId:asc',
            toolbar: [
                {
                    name: 'create',
                    label: 'Create',
                    iconOnly: false,
                    handler: 'addHandler',
                    disabled: !authconfig.hasCreatePrivilege()
                },
                {
                    name: 'edit',
                    label: 'Edit',
                    iconOnly: false,
                    handler: 'editHandler',
                    disabled: !authconfig.hasEditPrivilege()
                },
                {
                    name: 'delete',
                    label: 'Delete',
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
                    { componentId: 'department_di', field: 'DepartmentId', component: 'ojInputNumber', label: 'Department Id', required: true, editable: 'while-new',
                      asyncvalidators: [ self.asyncvalidators[0] ] },
                    { componentId: 'department_dn', field: 'DepartmentName', component: 'ojInputText', label: 'Department Name', required: true, editable: 'always' },
                    { componentId: 'department_mi', field: 'ManagerId', component: 'ojInputNumber', label: 'Manager Id', editable: 'always',
                      asyncvalidators: [ self.asyncvalidators[1] ] },
                    { componentId: 'department_li', field: 'LocationId', component: 'ojInputNumber', label: 'Location Id', editable: 'always',
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
            searchPlaceholder: 'Search...'
        }

    }

    return DepartmentViewModel;

});