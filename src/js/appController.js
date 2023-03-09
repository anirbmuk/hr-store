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

    self.navigationMenuLabel = ko.observable(router.getHeaderLabels().navigationMenuLabel);
    self.activeRoutes = ko.observableArray([]);

    self.processing = ko.observable(false);

    restconfig.setHost('http://localhost:3000'); // Development server
    // restconfig.setHost('https://menj-server.herokuapp.com'); // Production server

    var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

    self.configureRoutes = function() {
      self.router = router.configureRoutes();
    };

    self.configureActiveRoutes = function() {
      self.activeRoutes(router.getActiveRoutes());
    }

    self.configureRoutes();
    self.configureActiveRoutes();
    self.userMenuOptions = ko.observableArray([]);

    self.refreshMenu = function() {
      self.configureActiveRoutes();
      self.navigationMenuLabel(router.getHeaderLabels().navigationMenuLabel);

      const navigationMenu = document.getElementById('navigationMenu');
      if (!!navigationMenu) {
        navigationMenu.refresh();
      }

      self.userMenuOptions([{ id: 'signoff', value: 'signoff', label: router.getHeaderLabels().logoutLabel }]);
      const userMenu = document.getElementById('userMenu');
      if (!!userMenu) {
        userMenu.refresh();
      }
    };

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

    self.startProcessing = function() {
      self.processing(true);
    };

    self.endProcessing = function() {
      self.processing(false);
    };

  }

  return new ControllerViewModel();
});
