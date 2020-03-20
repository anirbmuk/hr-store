define(
['jquery',
'knockout',
'hr-table/loader'],
function($, ko) {

    function MasterDetailViewModel() {

        const self = this;

        self.departmentDataObject = ko.observable({
            data: [],
            idAttribute: 'DepartmentId'
        });

        self.parseLocation = function(response) {
            return {
                LocationId: response.LocationId,
                StreetAddress: response.StreetAddress,
                PostalCode: response.PostalCode,
                City: response.City,
                StateProvince: response.StateProvince,
                CountryId: response.CountryId
            };
        };
        self.idAttribute = 'LocationId';
        self.urlPath = 'locations';

        self.locationColumns = [
            { headerText: 'LocationId Id', field: 'LocationId' },
            { headerText: 'Postal Code', field: 'PostalCode', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'City', field: 'City' },
            { headerText: 'Country', field: 'CountryId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' }
        ];

        self.locationTableProperties = {
            columns: self.locationColumns,
            selection: {
                row: 'single',
                column: 'none'
            }
        };

        self.locationModelProperties = {
            modelparams: {
                urlPath: self.urlPath,
                idAttribute: self.idAttribute,
                parse: self.parseLocation
            }
        };

        self.locationPagingProperties = {
            pagingEnabled: true,
            pageSize: 4
        };

        self.onRowSelectionChange = function(event) {
            const rowKey = event.detail.rowKey;
            const successFn = function(data) {
                self.departmentDataObject({
                    data: data.departments,
                    idAttribute: 'DepartmentId'
                });
                $('#md_departments')[0].refreshDatasource();
            };
            const errorFn = function(error) {
                console.error(error);
            }
            restutils.getRestData('locations/' + rowKey, { children: 'departments' }, successFn, errorFn);
        };

        self.parseDepartment = function(response) {
            return {
                DepartmentId: response.DepartmentId,
                DepartmentName: response.DepartmentName,
                ManagerId: response.ManagerId,
                LocationId: response.LocationId
            };
        };

        self.departmentColumns = [
            { headerText: 'Department Id', field: 'DepartmentId' },
            { headerText: 'Department Name', field: 'DepartmentName' },
            { headerText: 'Manager Id', field: 'ManagerId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Location Id', field: 'LocationId', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' }
        ];

        self.departmentTableProperties = {
            columns: self.departmentColumns,
            selection: {
                row: 'single',
                column: 'none'
            }
        };

        self.departmentPagingProperties = {
            pagingEnabled: true,
            pageSize: 4
        };
    }

    return MasterDetailViewModel;

});