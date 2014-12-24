'use strict';

module.exports = {
  bower: {
    files: {
      'public/build/stylesheets/vendor.min.css': ['public/build/stylesheets/vendor.css']
    }
  },

  app: {
    files: {
      'public/build/stylesheets/app.min.css': [
        'public/stylesheets/ng-animation.css',
        'public/stylesheets/angular-ui-select/selectize.default.css',
        'public/stylesheets/angular-ui-select/selectize.customized.css',
        'public/stylesheets/style.css'
      ]
    }
  }
};