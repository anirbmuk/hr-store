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
                        restutils.getRestData('locations/' + value, null,
                        function() { reject({ detail: i18nutils.translate('messages.locations.duplicate_location')}); },
                        function() { resolve(); })
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
            { headerText: i18nutils.translate('attributes.locations.LocationId'), field: 'LocationId' },
            { headerText: i18nutils.translate('attributes.locations.Address'), field: 'StreetAddress', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: i18nutils.translate('attributes.locations.PostalCode'), field: 'PostalCode', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: i18nutils.translate('attributes.locations.City'), field: 'City' },
            { headerText: i18nutils.translate('attributes.locations.State'), field: 'StateProvince', headerClassName: 'oj-sm-only-hide', className: 'oj-sm-only-hide' },
            { headerText: i18nutils.translate('attributes.locations.Country'), field: 'CountryId' }
        ];

        self.locationTableProperties = {
            columns: self.locationColumns,
            sortOptions: 'LocationId:asc',
            toolbar: [
                {
                    name: 'create',
                    label: i18nutils.translate('actions.create'),
                    iconOnly: false,
                    handler: 'addHandler',
                    disabled: !authconfig.hasCreatePrivilege()
                },
                {
                    name: 'edit',
                    label: i18nutils.translate('actions.edit'),
                    iconOnly: false,
                    handler: 'editHandler',
                    disabled: !authconfig.hasEditPrivilege()
                },
                {
                    name: 'delete',
                    label: i18nutils.translate('actions.delete'),
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
                    { componentId: 'location_li', field: 'LocationId', component: 'ojInputNumber',
                      label: 'Id', required: true, editable: 'while-new',
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
            searchPlaceholder: i18nutils.translate('labels.search')
        }

    }

    return LocationViewModel;

})