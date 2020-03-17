define(['knockout', './../helper/storage-config'], function(ko, storageconfig) {

    'use strict'

    const AuthStateConfig = function() {
        const auth = this;

        auth.token = ko.observable(null);
        auth.email = ko.observable(null);
        auth.role = ko.observable(null);

    };

    AuthStateConfig.prototype.isAuthenticated = function() {
        const hasToken = (!!storageconfig.getFromBrowserSession('token') || !!this.token());
        const hasEmail = (!!storageconfig.getFromBrowserSession('email') || !!this.email());
        const hasRole = (!!storageconfig.getFromBrowserSession('role') || !!this.role());
        return (hasToken && hasEmail && hasRole);
    };

    AuthStateConfig.prototype.hasWritePrivilege = function() {
        const isAuthenticated = this.isAuthenticated();
        if (isAuthenticated) {
            const role = this.role();
            return (role === 'HR_MANAGER');
        }
        return false;
    };

    AuthStateConfig.prototype.setAuthState = function(data) {
        storageconfig.storeOnBrowserSession('token', data.token);
        storageconfig.storeOnBrowserSession('email', data.email);
        storageconfig.storeOnBrowserSession('role', data.role);
        this.token(data.token);
        this.email(data.email);
        this.role(data.role);
    };

    AuthStateConfig.prototype.getAuthState = function() {
        
        this.token(storageconfig.getFromBrowserSession('token'));
        this.email(storageconfig.getFromBrowserSession('email'));
        this.role(storageconfig.getFromBrowserSession('role'));

        const authState = {
            token: this.token,
            email: this.email,
            role: this.role
        };
        return authState
    };

    AuthStateConfig.prototype.signout = function() {
        const successFn = function(data) {
            this.setAuthState({});
            storageconfig.clearAllApplicationsKeys();
            routerconfig.navigate('login');
        }.bind(this);
        const errorFn = function(error) {
            this.setAuthState({});
            storageconfig.clearAllApplicationsKeys();
            routerconfig.navigate('login');
        }.bind(this);
        restutils.saveRestData('users/logout', null, successFn, errorFn, 'POST');
    };

    return new AuthStateConfig();
});