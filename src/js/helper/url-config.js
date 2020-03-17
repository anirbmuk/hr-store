define([], function() {

    'use strict'

    const URLConfigUtils = function() {};

    URLConfigUtils._REST_BASE = 'http://localhost:3000/api/v1/';

    URLConfigUtils.prototype.getPath = function(path) {
        if (path.startsWith('/')) {
            path = path.substr(1);
        }
        return URLConfigUtils._REST_BASE + path;
    };

    return new URLConfigUtils();
});