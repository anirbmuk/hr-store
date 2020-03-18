define(
['knockout',
'ojs/ojknockouttemplateutils',
'hr-table/loader'],
function(ko, KnockoutTemplateUtils) {

    function EmployeeViewModel() {

        const self = this;

        self.hasWritePrivilege = ko.observable(authconfig.hasWritePrivilege());

        self.getDateFormatter = function(date) {
            return formatterutils.getStringFromDate(date, 'medium');
        };

        self.getCurrencyFormatter = function(value) {
            return formatterutils.getCurrencyString(value, 'INR');
        };

        self.getPhoneNumberFormatter = function(value) {
            return formatterutils.getPhoneNumberString(value);
        };

        self.parseEmployee = function(response) {
            return {
                EmployeeId: response.EmployeeId,
                FirstName: response.FirstName,
                LastName: response.LastName,
                Email: response.Email,
                PhoneNumber: response.PhoneNumber,
                HireDate: response.HireDate,
                JobId: response.JobId,
                Salary: response.Salary,
                CommissionPct: response.CommissionPct,
                ManagerId: response.ManagerId,
                DepartmentId: response.DepartmentId,
            };
        };
        self.idAttribute = 'EmployeeId';
        self.urlPath = 'employees';

        self.employeeColumns = [
            { headerText: 'Employee Id', field: 'EmployeeId' },
            { headerText: 'Employee', renderer: KnockoutTemplateUtils.getRenderer('employee_fn_ln_template', true) },
            { headerText: 'Phone', renderer: KnockoutTemplateUtils.getRenderer('employee_pn_template', true) },
            { headerText: 'Hire Date', renderer: KnockoutTemplateUtils.getRenderer('employee_hd_template', true) },
            { headerText: 'Email', field: 'Email' },
            { headerText: 'Job Id', field: 'JobId' },
            { headerText: 'Salary', renderer: KnockoutTemplateUtils.getRenderer('employee_sa_template', true) },
            { headerText: 'Commission', field: 'CommissionPct' },
            { headerText: 'Manager Id', field: 'ManagerId' },
            { headerText: 'Department Id', field: 'DepartmentId' }
        ];

        self.employeeTableProperties = {
            columns: self.employeeColumns,
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
                    { componentId: 'employee_ei', field: 'EmployeeId', component: 'ojInputNumber', label: 'Employee Id', required: true, editable: 'while-new' },
                    { componentId: 'employee_fn', field: 'FirstName', component: 'ojInputText', label: 'First Name', editable: 'always' },
                    { componentId: 'employee_ln', field: 'LastName', component: 'ojInputText', label: 'Last Name', required: true, editable: 'always' },
                    { componentId: 'employee_em', field: 'Email', component: 'ojInputText', label: 'Email', required: true, editable: 'always' },
                    { componentId: 'employee_pn', field: 'PhoneNumber', component: 'ojInputText', label: 'Phone', editable: 'always' },
                    { componentId: 'employee_hd', field: 'HireDate', component: 'ojInputDate', label: 'Hire Date', required: true, editable: 'always' },
                    { componentId: 'employee_ji', field: 'JobId', component: 'ojInputText', label: 'Job Id', required: true, editable: 'always' },
                    { componentId: 'employee_sa', field: 'Salary', component: 'ojInputNumber', label: 'Salary', editable: 'always' },
                    { componentId: 'employee_cp', field: 'CommissionPct', component: 'ojInputNumber', label: 'Commission', editable: 'always' },
                    { componentId: 'employee_mi', field: 'ManagerId', component: 'ojInputNumber', label: 'Manager Id', editable: 'always' },
                    { componentId: 'employee_di', field: 'DepartmentId', component: 'ojInputNumber', label: 'Department Id', editable: 'always' }
                ]
            }
        };

        self.employeeModelProperties = {
            modelparams: {
                urlPath: self.urlPath,
                idAttribute: self.idAttribute,
                parse: self.parseEmployee
            }
        };

        self.employeePagingProperties = {
            pagingEnabled: true,
            pageSize: 8
        };

        self.employeeTemplateProperties = {
            employeeHireDate: self.getDateFormatter,
            employeeSalary: self.getCurrencyFormatter,
            employeePhoneNumber: self.getPhoneNumberFormatter
        }

    }

    return EmployeeViewModel;

});