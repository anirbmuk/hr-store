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
                const state = { token: data.token, email: data.user.email, role: data.user.role };
                authconfig.setAuthState(state);
                self.username('');
                self.password('');
                routerconfig.navigate('locations');
            };
            const errorFn = function(error) {
                self.errorMessage('Failed to authenticate to HR system');
            }
            const tracker = $('#loginFormTracker')[0];
            if (tracker && tracker.valid === 'valid') {
                restutils.saveRestData('users/login', data, successFn, errorFn, 'POST');
            } else {
                tracker.showMessages();
                tracker.focusOn("@firstInvalidShown");
            }
        };
    }

    return new LoginModule();

});