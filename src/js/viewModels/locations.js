define(['knockout', 'hr-table/loader'],
function(ko) {

    function LocationViewModel() {

        const self = this;

        self.hasWritePrivilege = ko.observable(authconfig.hasWritePrivilege());

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
            { headerText: 'Street Address', field: 'StreetAddress' },
            { headerText: 'Postal Code', field: 'PostalCode' },
            { headerText: 'City', field: 'City' },
            { headerText: 'State / Province', field: 'StateProvince' },
            { headerText: 'Country', field: 'CountryId' }
        ];

        self.locationTableProperties = {
            columns: self.locationColumns,
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
                    { componentId: 'location_li', field: 'LocationId', component: 'ojInputNumber', label: 'Location Id', required: true, editable: 'while-new' },
                    { componentId: 'location_sa', field: 'StreetAddress', component: 'ojInputText', label: 'Street Address', editable: 'always' },
                    { componentId: 'location_pc', field: 'PostalCode', component: 'ojInputText', label: 'Postal Code', editable: 'always' },
                    { componentId: 'location_ct', field: 'City', component: 'ojInputText', label: 'City', required: true, editable: 'always' },
                    { componentId: 'location_sp', field: 'StateProvince', component: 'ojInputText', label: 'State / Province', editable: 'always' },
                    { componentId: 'location_ci', field: 'CountryId', component: 'ojInputText', label: 'Country', editable: 'always' },
                ]
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
            pageSize: 8
        };

    }

    return LocationViewModel;

})