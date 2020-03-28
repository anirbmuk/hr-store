define([
'knockout',
'ojs/ojarraydataprovider',
'ojs/ojknockouttemplateutils',
'ojs/ojchart',
'hr-table/loader'
],
function(ko, ArrayDataProvider, KnockoutTemplateUtils) {

    function VisualizationViewModel() {

        const self = this;

        self.allEmployees = ko.observable();
        self.tableTitle = ko.observable('Employees');

        self.chartDataProvider = ko.observable(new ArrayDataProvider([], { idAttributes: 'id' }));
        self.selectedJobId = ko.observableArray([]);

        self.employeeDataObject = ko.observable({
            data: [],
            idAttribute: 'EmployeeId'
        });

        self.selectedJobIdSubscription = self.selectedJobId.subscribe(function(selection) {
            const selectedPieIndex = selection[0];
            const chartData = self.chartDataProvider().data;
            const employeeData = self.allEmployees();

            if (selectedPieIndex !== undefined) {
                const selectedJobId = chartData[selectedPieIndex].series;
                self.tableTitle(`Employees with JobId ${selectedJobId}`);
                const employeesWithThisJobId = employeeData.filter(employee => employee.JobId === selectedJobId)
                                                           .sort((a, b) => a.EmployeeId - b.EmployeeId);
                self.employeeDataObject({
                    data: employeesWithThisJobId,
                    idAttribute: 'EmployeeId'
                });
            } else {
                self.tableTitle('Employees');
                self.employeeDataObject({
                    data: [],
                    idAttribute: 'EmployeeId'
                });
            }
            $('#employees_with_jobs')[0].refreshDatasource();
        });

        self.buildChartData = function(index, jobId, employees) {
            const employeesWithThisJob = employees.filter(employee => employee.JobId === jobId);
            const countOfEmployeesWithThisJob = employeesWithThisJob.length;
            const data = {
                id: index,
                series: jobId,
                group: 'Group A',
                value: countOfEmployeesWithThisJob
            };
            return data;
        };

        (function() {
            app.startProcessing();
            const successFn = function(data) {
                const employees = [];
                const jobs = [];
                const chartData = [];

                if (!!data && !!data.items && Array.isArray(data.items)) {
                    data.items.forEach(employee => employees.push(employee));
                }
                self.allEmployees(employees);

                employees.forEach(employee => {
                    if(!!employee.JobId && jobs.indexOf(employee.JobId) < 0) {
                        jobs.push(employee.JobId);
                    }
                });

                jobs.forEach((jobId, index) => chartData.push(self.buildChartData(index, jobId, employees)));

                self.chartDataProvider(new ArrayDataProvider(chartData, { keyAttributes: 'id' }));

                app.endProcessing();
            };

            const errorFn = function(error) {
                app.endProcessing();
            }
            restutils.getRestData('employees?sortBy=EmployeeId:desc', null, successFn, errorFn);
        })();

        self.employeeColumns = [
            { headerText: 'Employee Id', field: 'EmployeeId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Employee', renderer: KnockoutTemplateUtils.getRenderer('employee_fn_ln_template', true) },
            { headerText: 'Email', field: 'Email' },
            { headerText: 'Job Id', field: 'JobId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
        ];

        self.employeeTableProperties = {
            columns: self.employeeColumns,
            sortOptions: 'EmployeeId:asc',
            selection: {
                row: 'none',
                column: 'none'
            }
        };

        self.employeePagingProperties = {
            pagingEnabled: true,
            pageSize: 5
        };

    }

    VisualizationViewModel.prototype.dispose = function() {
        if (!!this.selectedJobIdSubscription) {
            this.selectedJobIdSubscription.dispose();
        }
    };

    return VisualizationViewModel;

});