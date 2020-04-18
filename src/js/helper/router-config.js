define(['knockout', './i18n-helper', 'ojs/ojrouter'], function(ko, i18nutils) {

    'use strict';

    const RouterConfigUtils = function() {
        const routerConfig = this;

        routerConfig.router = ko.observable();
    };

    const canEnter = function() {
        if (app.authenticated()) {
            return true;
        }
        return false;
    };

    RouterConfigUtils.prototype.getAppRoutes = function() {
        return {
            login: { id: 'login', label: i18nutils.translate('login.header'), isDefault: true },
            locations: { id: 'locations', label: i18nutils.translate('locations.header'), canEnter },
            departments: { id: 'departments', label: i18nutils.translate('departments.header'), canEnter },
            employees: { id: 'employees', label: i18nutils.translate('employees.header'), canEnter },
            masterdetail: { id: 'masterdetail', label: i18nutils.translate('masterdetail.header'), canEnter },
            visualization: { id: 'visualization', label: i18nutils.translate('visualization.header'), canEnter }
        };
    }

    RouterConfigUtils.prototype.configureRoutes = function() {
        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
        this.router(oj.Router.rootInstance);
        this.router().configure(this.getAppRoutes());
        return this.router();
    };

    RouterConfigUtils.prototype.getActiveRoutes = function() {
        return [
            { id: 'locations', name: i18nutils.translate('locations.header') },
            { id: 'departments', name: i18nutils.translate('departments.header') },
            { id: 'employees', name: i18nutils.translate('employees.header') },
            { id: 'masterdetail', name: i18nutils.translate('masterdetail.header') },
            { id: 'visualization', name: i18nutils.translate('visualization.header') }
        ];
    };

    RouterConfigUtils.prototype.getHeaderLabels = function() {
        return {
            navigationMenuLabel: i18nutils.translate('labels.menu'),
            logoutLabel: i18nutils.translate('labels.logout')
        }
    };

    RouterConfigUtils.prototype.navigate = function(path) {
        this.router().go(path);
    };

    RouterConfigUtils.prototype.redirect = function(path) {
        if (!!path) {
            return window.location = '?root=' + path;
        }
        return window.location = '/';
    };

    return new RouterConfigUtils();

});