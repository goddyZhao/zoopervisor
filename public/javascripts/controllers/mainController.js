if (app) {

  // MainController - outermost scope controller
  // In this controller, it manages transition animation
  // and common features
  app.controller('MainController', ['$scope', '$timeout', '$cookieStore', function ($scope, $timeout, $cookieStore) {

    // Animation flags manager
    $scope.animations = {

      // Control animation when page or request is loading
      load: false,

      // Control animation when users login successfully
      login: false,

      // Control animation when popup dialogue is shown
      popup: false,

      // Control animation when notification need to popup
      notification: false
    };

    // Zookeeper object, store ip address and port
    $scope.zookeeper = {
      ip: '',
      port: ''
    };

    // Submit the login form
    $scope.submit = function () {

      // Display loading icon
      $scope.animations.load = true;

      // todo: Start connecting zookeeper
      $timeout(function () {

        // Store current connected zookeeper in cookie
        $cookieStore.put('connected', $scope.zookeeper);

        // Connect successfully
        $scope.animations.load = false;
        $scope.animations.login = true;
      }, 1000);
    };

    // Check connected zookeeper in cookie
    var connected = $cookieStore.get('connected');

    // User first open app or has disconnected all zookeeper
    // Skip connect form
    if (connected) {
      $scope.animations.login = true;
      $scope.zookeeper = connected;
    }

    // Currently, we only support one connection
    $scope.zookeepers[0] = $scope.zookeeper;

    $scope.$on('disconnect', function () {
        $cookieStore.remove('connected');
        window.location = '/';
    });
  }]);
}