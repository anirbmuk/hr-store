define([
'ojs/ojcore',
'knockout',
'ojs/ojbutton',
'ojs/ojinputtext',
'ojs/ojlabel',        
'ojs/ojlabelvalue',
'ojs/ojformlayout',
'ojs/ojvalidationgroup'
], function(oj, ko) {

    function LoginModule() {

        var self = this;

        self.username = ko.observable('');
        self.password = ko.observable('');

        self.errorMessage = ko.observable('');

        self.emailValidator = {
            type: 'regExp',
            options: {
                pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
                messageDetail: 'Email is not correctly formatted'
            }
        };

        self.userLogin = function() {
            self.errorMessage('');
            const data = JSON.stringify({
                email: self.username(),
                password: self.password()
            });
            const successFn = function(data) {
                const state = { token: data.token, email: data.user.email, role: data.user.role, locale: data.user.locale };
                authconfig.setAuthState(state);
                i18nutils.setLocale(data.user.locale);
                self.username('');
                self.password('');
                routerconfig.redirect('locations');
                app.endProcessing();
            };
            const errorFn = function(error) {
                self.errorMessage(i18nutils.translate('login.autherror'));
                app.endProcessing();
            }
            const tracker = $('#loginFormTracker')[0];
            if (tracker && tracker.valid === 'valid') {
                app.startProcessing();
                restutils.saveRestData('users/login', data, successFn, errorFn, 'POST');
            } else {
                tracker.showMessages();
                tracker.focusOn("@firstInvalidShown");
                app.endProcessing();
            }
        };
    }

    return new LoginModule();

});