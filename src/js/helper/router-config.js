define(['knockout', 'ojs/ojrouter'], function(ko) {

    'use strict';

    const RouterConfigUtils = function() {
        const routerConfig = this;

        routerConfig.router = ko.observable();
    };

    const canEnter = function() {
        if (app.authenticated()) {
            return true;
        }
    };

    const appRoutes = {
        login: { id: 'login', label: 'Login', isDefault: true },
        locations: { id: 'locations', label: 'Locations', canEnter },
        departments: { id: 'departments', label: 'Departments', canEnter },
        employees: { id: 'employees', label: 'Employees', canEnter },
        masterdetail: { id: 'masterdetail', label: 'Master-Detail', canEnter }
    };

    RouterConfigUtils.prototype.configureRoutes = function() {
        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
        this.router(oj.Router.rootInstance);
        this.router().configure(appRoutes);
        return this.router();
    };

    RouterConfigUtils.prototype.getActiveRoutes = function() {
        return [
            { id: 'locations', name: 'Locations' },
            { id: 'departments', name: 'Departments' },
            { id: 'employees', name: 'Employees' },
            { id: 'masterdetail', name: 'Master-Detail' }
        ];
    };

    RouterConfigUtils.prototype.navigate = function(path) {
        this.router().go(path)
    };

    return new RouterConfigUtils();

});