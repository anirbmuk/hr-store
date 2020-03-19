define(['ojs/ojmodel', 'knockout', 'jquery'], function(oj, ko, $) {

    'use strict';

    const RestUtils = function() {
        const self = this;

        self.host = '';
     };
    
    RestUtils.REST_BASE = '/api/v1/';

    RestUtils.prototype.asyncRequest = function(ajaxObject) {
        if (ajaxObject) {
            return $.ajax(ajaxObject);
        }
    };

    RestUtils.prototype.beforeSend = function(xhr) {
        if (authconfig.isAuthenticated()) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + storageconfig.getFromBrowserSession('token'));
        }
    };

    RestUtils.prototype.buildURLPath = function(path, options) {
        if (!options) {
            options = {};
        }
        const keys = Object.keys(options);
        let url = this.host + RestUtils.REST_BASE + path;
        if (keys.length > 0) {
            url += '?';
            const lastIndex = keys.length - 1;
            keys.forEach(function(key, index) {
                if (index === lastIndex) {
                    url += key + '=' + options[key];
                } else {
                    url += key + '=' + options[key] + '&';
                }
            });
        }
        return url;
    };

    RestUtils.prototype.getRestData = function(url, options, successCallback, errorCallback) {
        const ajaxObject = {
            async: true,
            contentType: 'application/json',
            error: errorCallback,
            success: successCallback,
            type: 'GET',
            url: this.buildURLPath(url, options),
            beforeSend: this.beforeSend
        };
        return this.asyncRequest(ajaxObject);
    };

    RestUtils.prototype.saveRestData = function(url, data, successCallback, errorCallback, type) {
        if (type && type === 'GET') {
            return this.getRestData(url, null, successCallback, errorCallback);
        }
        const ajaxObject = {
            async: true,
            contentType: 'application/json',
            data,
            error: errorCallback,
            success: successCallback,
            type,
            url: this.buildURLPath(url),
            beforeSend: this.beforeSend
        };
        return this.asyncRequest(ajaxObject);
    }

    RestUtils.prototype.setHost = function(host) {
        this.host = host;
    }

    return new RestUtils();

});