define(
['jquery',
'knockout',
'ojs/ojknockouttemplateutils',
'hr-table/loader'],
function($, ko, KnockoutTemplateUtils) {

    function ManagerDirectMasterDetailViewModel() {

        const self = this;

        self.directDataObject = ko.observable({
            data: [],
            idAttribute: 'EmployeeId'
        });

        self.parseEmployee = function(response) {
            return {
                EmployeeId: response.EmployeeId,
                FirstName: (response.FirstName === undefined ? '' : response.FirstName),
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
            { headerText: 'Employee Id', field: 'EmployeeId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Employee', renderer: KnockoutTemplateUtils.getRenderer('employee_fn_ln_template', true) },
            { headerText: 'Email', field: 'Email' }
        ];

        self.employeeTableProperties = {
            columns: self.employeeColumns,
            sortOptions: 'EmployeeId:asc',
            selection: {
                row: 'single',
                column: 'none'
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
            pageSize: 5
        };

        self.onRowSelectionChange = function(event) {
            app.startProcessing();
            const rowKey = event.detail.rowKey;
            const successFn = function(data) {
                self.directDataObject({
                    data: !!data.directs ? data.directs.sort((a, b) => a.EmployeeId - b.EmployeeId) : [],
                    idAttribute: 'EmployeeId'
                });
                $('#md_directs')[0].refreshDatasource();
                app.endProcessing();
            };
            const errorFn = function(error) {
                console.error(error);
                app.endProcessing();
            }
            restutils.getRestData('employees/' + rowKey, { children: 'directs' }, successFn, errorFn);
        };

        self.directColumns = [
            { headerText: 'Employee Id', field: 'EmployeeId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Employee', renderer: KnockoutTemplateUtils.getRenderer('employee_fn_ln_template', true) },
            { headerText: 'Email', field: 'Email' }
        ];

        self.directTableProperties = {
            columns: self.directColumns,
            sortOptions: 'EmployeeId:asc',
            selection: {
                row: 'single',
                column: 'none'
            }
        };

        self.directPagingProperties = {
            pagingEnabled: true,
            pageSize: 5
        };
    }

    return ManagerDirectMasterDetailViewModel;

});