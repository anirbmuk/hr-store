define([
    'ojs/ojtranslation',
    'ojs/ojconfig'
], function(Translations, Config) {

    'use strict';

    const I18nUtils = function() {
        const self = this;
    }

    I18nUtils.prototype.setLocale = function(locale) {
        const rootElement = document.getElementsByTagName('html')[0];
        Config.setLocale(locale, function() {
            rootElement.setAttribute('lang', locale);
            app.configureActiveRoutes();
            app.refreshMenu();
        });
    };

    I18nUtils.prototype.translate = function(key, replace) {
        return Translations.getTranslatedString(key, replace);
    };

    return new I18nUtils();

});