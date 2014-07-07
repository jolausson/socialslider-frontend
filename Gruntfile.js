/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // These plugins provide necessary tasks.
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: [
          'js/**/*.js',
          '!js/bootstrap/*',
          '!js/plugins/*',
          '!js/vendor/*',
          '!<%= concat.bootstrap.dest %>',
          '!<%= concat.plugins.dest %>',
          '!<%= concat.main.dest %>',
          '!<%= uglify.bootstrap.dest %>',
          '!<%= uglify.plugins.dest %>',
          '!<%= uglify.main.dest %>'
        ]
      }
    },

    jscs: {
      options: {
        config: 'js/bootstrap/.jscs.json',
      },
      src: {
        src: 'js/bootstrap/*.js'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/bootstrap/.csslintrc'
      },
      src: [
        'css/bootstrap.css'
      ]
    },

    csscomb: {
      sort: {
        options: {
          config: 'less/bootstrap/.csscomb.json'
        },
        files: {
          'css/bootstrap.css': 'css/bootstrap.css'
        }
      }
    },

    concat: {
      bootstrap: {
        src: [
          '!js/bootstrap/affix.js',
          '!js/bootstrap/alert.js',
          '!js/bootstrap/button.js',
          '!js/bootstrap/carousel.js',
          '!js/bootstrap/collapse.js',
          '!js/bootstrap/dropdown.js',
          '!js/bootstrap/modal.js',
          '!js/bootstrap/popover.js',
          '!js/bootstrap/scrollspy.js',
          '!js/bootstrap/tab.js',
          '!js/bootstrap/tooltip.js',
          '!js/bootstrap/transition.js'
        ],
        dest: 'js/bootstrap.js'
      },
      plugins: {
        src: ['js/plugins/*.js'],
        dest: 'js/plugins.js'
      },
      main: {
        src: [
          'js/utilities.js',
          'js/global.js',
          'js/modules/*.js'
        ],
        dest: 'js/<%= pkg.name.toLowerCase() %>.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'js/bootstrap.min.js'
      },
      plugins: {
        src: ['<%= concat.plugins.dest %>'],
        dest: 'js/plugins.min.js'
      },
      main: {
        src: ['<%= concat.main.dest %>'],
        dest: 'js/<%= pkg.name.toLowerCase() %>.min.js'
      },
      jquery: {
        src: ['js/vendor/jquery.js'],
        dest: 'js/vendor/jquery.min.js'
      },
      modernizr: {
        src: ['js/vendor/modernizr.js'],
        dest: 'js/vendor/modernizr.min.js'
      },
      respond: {
        src: ['js/vendor/respond.js'],
        dest: 'js/vendor/respond.min.js'
      }
    },

    less: {
      bootstrap: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'bootstrap.css.map',
          sourceMapFilename: 'css/bootstrap.css.map'
        },
        src: ['less/bootstrap/bootstrap.less'],
        dest: 'css/bootstrap.css'
      },
      bootstrap_min: {
        options: {
          cleancss: true,
          report: 'min'
        },
        src: ['less/bootstrap/bootstrap.less'],
        dest: 'css/bootstrap.min.css'
      },
      main: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name.toLowerCase() %>.css.map',
          sourceMapFilename: 'css/<%= pkg.name.toLowerCase() %>.css.map'
        },
        src: ['less/main.less'],
        dest: 'css/<%= pkg.name.toLowerCase() %>.css'
      },
      main_min: {
        options: {
          cleancss: true,
          report: 'min'
        },
        src: ['<%= less.main.src %>'],
        dest: 'css/<%= pkg.name.toLowerCase() %>.min.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          livereload: 35729,
          // change this to '0.0.0.0' to access the server from outside
          hostname: '0.0.0.0'
        }
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: '*.html'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: 'dist'
      },
      js: {
        files: [
          'js/**/*.js',
          '!<%= concat.bootstrap.dest %>',
          '!<%= concat.plugins.dest %>',
          '!<%= concat.main.dest %>',
          '!<%= uglify.bootstrap.dest %>',
          '!<%= uglify.plugins.dest %>',
          '!<%= uglify.main.dest %>',
          '!<%= uglify.jquery.dest %>',
          '!<%= uglify.modernizr.dest %>',
          '!<%= uglify.respond.dest %>'
        ],
        tasks: ['dist-js']
      },
      less_bootstrap: {
        files: 'less/bootstrap/*.less',
        tasks: ['less:bootstrap', 'less:bootstrap_min', 'csslint']
      },
      less_main: {
        files: ['less/**/*.less', '!<%= watch.less_bootstrap.files %>'],
        tasks: ['less:main', 'less:main_min']
      }
    }

  });

  // Start a http server with connect and watch task.
  grunt.registerTask('server', ['connect', 'watch']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['jshint:js', 'jscs', 'concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['less', 'csscomb']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['dist']);

};
