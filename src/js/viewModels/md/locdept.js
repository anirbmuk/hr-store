define(
['jquery',
'knockout',
'hr-table/loader'],
function($, ko) {

    function LocationDepartmentMasterDetailViewModel() {

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
            { headerText: i18nutils.translate('attributes.locations.LocationId'), field: 'LocationId' },
            { headerText: i18nutils.translate('attributes.locations.PostalCode'), field: 'PostalCode',
              headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: i18nutils.translate('attributes.locations.City'), field: 'City' },
            { headerText: i18nutils.translate('attributes.locations.Country'), field: 'CountryId',
              headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' }
        ];

        self.locationTableProperties = {
            columns: self.locationColumns,
            sortOptions: 'LocationId:asc',
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
            pageSize: 6
        };

        self.onRowSelectionChange = function(event) {
            app.startProcessing();
            const rowKey = event.detail.rowKey;
            const successFn = function(data) {
                self.departmentDataObject({
                    data: !!data.departments ? data.departments.sort((a, b) => a.DepartmentId - b.DepartmentId) : [],
                    idAttribute: 'DepartmentId'
                });
                $('#md_departments')[0].refreshDatasource();
                app.endProcessing();
            };
            const errorFn = function(error) {
                app.endProcessing();
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
            { headerText: i18nutils.translate('attributes.departments.DepartmentId'), field: 'DepartmentId' },
            { headerText: i18nutils.translate('attributes.departments.DepartmentName'), field: 'DepartmentName' },
            { headerText: i18nutils.translate('attributes.departments.ManagerId'), field: 'ManagerId',
              headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: i18nutils.translate('attributes.departments.LocationId'), field: 'LocationId',
              headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' }
        ];

        self.departmentTableProperties = {
            columns: self.departmentColumns,
            sortOptions: 'DepartmentId:asc',
            selection: {
                row: 'single',
                column: 'none'
            }
        };

        self.departmentPagingProperties = {
            pagingEnabled: true,
            pageSize: 6
        };
    }

    return LocationDepartmentMasterDetailViewModel;

});