module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

    ngAnnotate: {
        options: {
            singleQuotes: true
        },
        app: {
            files: {
                'public/release/min-safe/app.js': ['public/js/app.js'],
                'public/release/min-safe/routes.js': ['public/js/routes.js'],
                'public/release/min-safe/PocketReadsService.js': ['public/js/services/PocketReadsService.js'],
                'public/release/min-safe/ReadsCtrl.js': ['public/js/controllers/ReadsCtrl.js'],
                'public/release/min-safe/templates.js': ['public/templates.js']
            }
        }
    },

    concat: {
        js: {
            src: ['public/release/min-safe/app.js', 'public/release/min-safe/routes.js', 'public/release/min-safe/templates.js', 'public/release/min-safe/PocketReadsService.js', 'public/release/min-safe/ReadsCtrl.js'],
            dest: 'public/release/app.js'
        }
    },

    uglify: {
        my_target: {
          files: {
            'public/release/app.min.js': ['public/release/app.js']
          }
        }
      },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/release/app.min.css': ['public/libs/pace/themes/blue/pace-theme-corner-indicator.css',
            'public/libs/skeleton/css/normalize.css',
            'public/libs/skeleton/css/skeleton.css',
            'public/css/style.css']
        }
      }
    },

    clean: ['public/release/app.js', 'public/release/min-safe', 'public/templates.js'],

    watch: {
        files: ['public/css/**', 'public/js/**', 'public/**/*.html'],
        tasks: ['default']
    },


    ngtemplates: {
        app: {
            cwd: 'public',
            src: ['views/about.html', 'views/home.html', 'views/reads.html'],
            dest: 'public/templates.js',
            options: {
                htmlmin: {
                  collapseBooleanAttributes:      true,
                  collapseWhitespace:             true,
                  removeAttributeQuotes:          true,
                  removeEmptyAttributes:          true,
                  removeRedundantAttributes:      true,
                  removeScriptTypeAttributes:     true,
                  removeStyleLinkTypeAttributes:  true
                },
                module: 'website-app'
            }
        }
    }


    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Default task(s).
    grunt.registerTask('default', ['ngtemplates', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'clean']);
    grunt.registerTask('fresh', ['default', 'watch']);
};