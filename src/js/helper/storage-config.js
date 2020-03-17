define([], function () {

    'use strict'

    const StorageConfigUtils = function () { };

    StorageConfigUtils._ROOT = 'hrstore_';

    StorageConfigUtils.prototype.storeOnBrowserSession = function (key, value) {
        if (key) {
            key = StorageConfigUtils._ROOT + key.toLowerCase();
        }
        if (window.sessionStorage) {
            if (value) {
                window.sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                window.sessionStorage.removeItem(key);
            }
        }
    }

    StorageConfigUtils.prototype.getFromBrowserSession = function (key) {
        if (key) {
            key = StorageConfigUtils._ROOT + key.toLowerCase();
        }
        if (window.sessionStorage) {
            const value = JSON.parse(window.sessionStorage.getItem(key));
            if (value) {
                return value;
            }
        }
        return null;
    }

    StorageConfigUtils.prototype.clearAllApplicationsKeys = function () {
        if (window.sessionStorage) {
            window.sessionStorage.clear();
        }
    }

    return new StorageConfigUtils();
});