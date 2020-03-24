define(
['ojs/ojresponsiveutils',
'ojs/ojresponsiveknockoututils',
'knockout',
'./helper/router-config',
'./state/auth-state',
'./helper/rest-config',
'ojs/ojknockout',
'ojs/ojnavigationlist',
'ojs/ojmodule'],
function (ResponsiveUtils, ResponsiveKnockoutUtils, ko, router, authconfig, restconfig) {
  function ControllerViewModel() {
    var self = this;

    self.appName = ko.observable("MENJ stack");
    self.userLogin = ko.observable('');

    restconfig.setHost('http://localhost:3000');
    // restconfig.setHost('https://menj-server.herokuapp.com');

    var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

    self.router = router.configureRoutes();
    self.activeRoutes = router.getActiveRoutes();

    self.authenticated = ko.computed(function () {

    self.userLogin(authconfig.getAuthState().email());
      return authconfig.getAuthState().token() !== null;
    }, self);

    self.menuAction = function (event) {
      self.router.stateId(event.target.value);
    };

    self.signoutAction = function () {
      authconfig.signout();
    };

  }

  return new ControllerViewModel();
});
