define(
['knockout',
'ojs/ojvalidation-base',
'hr-table/loader'],
function(ko, ValidationBase) {

    function LocationViewModel() {

        const self = this;

        self.hasWritePrivilege = ko.observable(authconfig.hasWritePrivilege());

        self.validateUniqueLocation = {
            validate: function(value) {
                return new Promise(function(resolve, reject) {
                    restutils.getRestData('locations/' + value, null, function() { reject({ detail: 'Duplicate location id'}); }, function() { resolve(); })
                });
            }
        };

        self.postalCodeValidator = ValidationBase.Validation.validatorFactory('length').createValidator({ max: 12 });
        self.countryIdValidator = ValidationBase.Validation.validatorFactory('length').createValidator({ max: 2 });

        self.validators = [
            self.postalCodeValidator,
            self.countryIdValidator
        ];

        self.asyncvalidators = [
            self.validateUniqueLocation
        ];

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
            { headerText: 'Street Address', field: 'StreetAddress', headerClassName: 'oj-sm-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Postal Code', field: 'PostalCode', headerClassName: 'oj-sm-hide', className: 'oj-sm-only-hide' },
            { headerText: 'City', field: 'City' },
            { headerText: 'State / Province', field: 'StateProvince', headerClassName: 'oj-sm-hide', className: 'oj-sm-only-hide' },
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
                    { componentId: 'location_li', field: 'LocationId', component: 'ojInputNumber', label: 'Location Id', required: true, editable: 'while-new',
                      asyncvalidators: [ self.asyncvalidators[0] ] },
                    { componentId: 'location_sa', field: 'StreetAddress', component: 'ojInputText', label: 'Street Address', editable: 'always' },
                    { componentId: 'location_pc', field: 'PostalCode', component: 'ojInputText', label: 'Postal Code', editable: 'always',
                      validators: [ self.validators[0] ] },
                    { componentId: 'location_ct', field: 'City', component: 'ojInputText', label: 'City', required: true, editable: 'always' },
                    { componentId: 'location_sp', field: 'StateProvince', component: 'ojInputText', label: 'State / Province', editable: 'always' },
                    { componentId: 'location_ci', field: 'CountryId', component: 'ojInputText', label: 'Country', editable: 'always',
                      validators: [ self.validators[1] ] },
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