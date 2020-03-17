define(['ojs/ojmodel',], function(ojModel) {

    'use strict'

    const ModelConfig = function() {
        const self = this;

        self.getModel = function(params) {
            return ojModel.Model.extend(params);
        };

        self.getCollection = function(params) {
            return ojModel.Collection.extend(params);
        };

    };

    return new ModelConfig();
});