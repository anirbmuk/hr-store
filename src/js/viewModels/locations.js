define(
['knockout',
'ojs/ojvalidation-base',
'hr-table/loader'],
function(ko, ValidationBase) {

    function LocationViewModel() {

        const self = this;

        self.hasCreatePrivilege = ko.observable(authconfig.hasCreatePrivilege());
        self.hasEditPrivilege = ko.observable(authconfig.hasEditPrivilege());
        self.hasDeletePrivilege = ko.observable(authconfig.hasDeletePrivilege());

        self.validateUniqueLocation = {
            validate: function(value) {
                return new Promise(function(resolve, reject) {
                    if (!value) {
                        resolve();
                    } else {
                        restutils.getRestData('locations/' + value, null, function() { reject({ detail: 'Duplicate location id'}); }, function() { resolve(); })
                    }
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
            { headerText: 'Location Id', field: 'LocationId' },
            { headerText: 'Address', field: 'StreetAddress', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Postal Code', field: 'PostalCode', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'City', field: 'City' },
            { headerText: 'State', field: 'StateProvince', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: 'Country', field: 'CountryId' }
        ];

        self.locationTableProperties = {
            columns: self.locationColumns,
            sortOptions: 'LocationId:asc',
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
                    { componentId: 'location_li', field: 'LocationId', component: 'ojInputNumber', label: 'Id', required: true, editable: 'while-new',
                      asyncvalidators: [ self.asyncvalidators[0] ] },
                    { componentId: 'location_sa', field: 'StreetAddress', component: 'ojInputText', label: 'Address', editable: 'always' },
                    { componentId: 'location_pc', field: 'PostalCode', component: 'ojInputText', label: 'Postal Code', editable: 'always',
                      validators: [ self.validators[0] ] },
                    { componentId: 'location_ct', field: 'City', component: 'ojInputText', label: 'City', required: true, editable: 'always' },
                    { componentId: 'location_sp', field: 'StateProvince', component: 'ojInputText', label: 'State', editable: 'always' },
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

        self.locationSearchProperties = {
            showSearch: true,
            searchPlaceholder: 'Search...'
        }

    }

    return LocationViewModel;

})