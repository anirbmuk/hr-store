define(['knockout', './../helper/storage-config'], function(ko, storageconfig) {

    'use strict'

    const AuthStateConfig = function() {
        const auth = this;

        auth.token = ko.observable(null);
        auth.email = ko.observable(null);
        auth.role = ko.observable(null);
        auth.locale = ko.observable('en-US');
    };

    AuthStateConfig.prototype.isAuthenticated = function() {
        const hasToken = (!!storageconfig.getFromBrowserSession('token') || !!this.token());
        const hasEmail = (!!storageconfig.getFromBrowserSession('email') || !!this.email());
        const hasRole = (!!storageconfig.getFromBrowserSession('role') || !!this.role());
        return (hasToken && hasEmail && hasRole);
    };

    AuthStateConfig.prototype.hasCreatePrivilege = function() {
        const isAuthenticated = this.isAuthenticated();
        if (isAuthenticated) {
            const role = this.role();
            return (role === 'HR_MANAGER' || role === 'HR_ADMIN');
        }
        return false;
    };

    AuthStateConfig.prototype.hasEditPrivilege = function() {
        const isAuthenticated = this.isAuthenticated();
        if (isAuthenticated) {
            const role = this.role();
            return (role === 'HR_MANAGER' || role === 'HR_ADMIN');
        }
        return false;
    };

    AuthStateConfig.prototype.hasDeletePrivilege = function() {
        const isAuthenticated = this.isAuthenticated();
        if (isAuthenticated) {
            const role = this.role();
            return (role === 'HR_ADMIN');
        }
        return false;
    };

    AuthStateConfig.prototype.setAuthState = function(data) {
        storageconfig.storeOnBrowserSession('token', data.token);
        storageconfig.storeOnBrowserSession('email', data.email);
        storageconfig.storeOnBrowserSession('role', data.role);
        storageconfig.storeOnBrowserSession('locale', data.locale);
        this.token(data.token);
        this.email(data.email);
        this.role(data.role);
        this.locale(data.locale);
    };

    AuthStateConfig.prototype.getAuthState = function() {
        
        this.token(storageconfig.getFromBrowserSession('token'));
        this.email(storageconfig.getFromBrowserSession('email'));
        this.role(storageconfig.getFromBrowserSession('role'));
        this.locale(storageconfig.getFromBrowserSession('locale'));

        const authState = {
            token: this.token,
            email: this.email,
            role: this.role,
            locale: this.locale
        };
        return authState
    };

    AuthStateConfig.prototype.getLocale = function() {
        return this.locale() || 'en-US';
    };

    AuthStateConfig.prototype.signout = function() {
        app.startProcessing();
        const successFn = function(data) {
            this.setAuthState({});
            storageconfig.clearAllApplicationsKeys();
            routerconfig.redirect('login');
            app.endProcessing();
        }.bind(this);
        const errorFn = function(error) {
            this.setAuthState({});
            storageconfig.clearAllApplicationsKeys();
            routerconfig.navigate('login');
            app.endProcessing();
        }.bind(this);
        restutils.saveRestData('users/logout', null, successFn, errorFn, 'POST');
    };

    return new AuthStateConfig();
});