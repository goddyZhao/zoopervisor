if (app) {
  // EditorController - controller of file content editor
  // Firstly, calculate editor's height according to window's height
  // and we make it be responsive
  app.controller('EditorController', ['$scope', '$document', function ($scope, $document) {

    // To get the correct height of editor, we should get the height of the doms related
    // including window, navbar and editor container
    var getPanelHeight = function () {
      var windowHeight = window.innerHeight;
      var navbarHeight = $document[0].querySelector('.navbar').clientHeight;
      return windowHeight - navbarHeight;
    };
    var editor;

    $scope.aceLoaded = function(_editor){
      editor = _editor;
    };

    $scope.syntax = {};
    $scope.syntaxes = [
      { title: 'Plain Text', name: 'plain_text' },
      { title: 'XML', name: 'xml' },
      { title: 'JSON', name: 'json' }
    ];

    $scope.mode = {};
    $scope.modes = [
      { title: 'Normal', name: '' },
      { title: 'VIM', name: 'vim' },
      { title: 'Emacs', name: 'emacs' }
    ];

    // Start calculating until user selects a node
    $scope.$on('node.selected', function () {
      $scope.panelHeight = getPanelHeight();
    });

    // Makes editor be responsive
    window.onresize = function () {
      $scope.$apply();
    };

    $scope.$watch(function () {
      return angular.element(window)[0].innerHeight;
    }, function () {
      if ($scope.panelHeight) {
        $scope.panelHeight = getPanelHeight();
      }
    });

    $scope.$watch('mode.selected', function(newVal, oldVal){
      var mode = (newVal && newVal.name) || '';
      if (mode) {
        editor.setKeyboardHandler('ace/keyboard/' + mode);
      }
      else {
        editor.setKeyboardHandler();
      }
    });
    
    $scope.$watch('syntax.selected', function(newVal, oldVal){
      var lang = (newVal && newVal.name) || 'plain_text';
      editor.getSession().setMode('ace/mode/' + lang);
    });

  }]);
}