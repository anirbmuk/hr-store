define(['knockout', 'hr-table/loader'],
function(ko) {

    function DepartmentViewModel() {

        const self = this;

        self.hasWritePrivilege = ko.observable(authconfig.hasWritePrivilege());

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
            { headerText: 'Manager Id', field: 'ManagerId' },
            { headerText: 'Location Id', field: 'LocationId' }
        ];

        self.departmentTableProperties = {
            columns: self.departmentColumns,
            toolbar: [
                {
                    name: 'create',
                    label: 'Create',
                    iconOnly: false,
                    handler: 'addHandler',
                    disabled: !authconfig.hasWritePrivilege()
                },
                {
                    name: 'edit',
                    label: 'Edit',
                    iconOnly: false,
                    handler: 'editHandler',
                    disabled: !authconfig.hasWritePrivilege()
                },
                {
                    name: 'delete',
                    label: 'Delete',
                    iconOnly: false,
                    handler: 'deleteHandler',
                    disabled: !authconfig.hasWritePrivilege()
                }
            ],
            selection: {
                row: 'single',
                column: 'none'
            },
            edit: {
                attributes: [
                    { componentId: 'department_di', field: 'DepartmentId', component: 'ojInputNumber', label: 'Department Id', required: true, editable: 'while-new' },
                    { componentId: 'department_dn', field: 'DepartmentName', component: 'ojInputText', label: 'Department Name', required: true, editable: 'always' },
                    { componentId: 'department_mi', field: 'ManagerId', component: 'ojInputNumber', label: 'Manager Id', editable: 'always' },
                    { componentId: 'department_li', field: 'LocationId', component: 'ojInputNumber', label: 'Location Id', editable: 'always' }
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

    }

    return DepartmentViewModel;

});