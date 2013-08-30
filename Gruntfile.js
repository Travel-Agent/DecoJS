module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      //https://github.com/yatskevich/grunt-bower-task
      install: {
        options: {
          copy: false
        }
      }
    },
    requirejs: {
      //https://github.com/gruntjs/grunt-contrib-requirejs
      compile: {
        options: {
          baseUrl: ".",
          out: "Dist/ordnung.js",
          paths: {
            "knockout": "empty:",
            "ordnung": "Source"
          },
          packages: [
              { name: 'when', location: 'node_modules/when', main: 'when' }
          ],
          include: [
            "ordnung/qvc",
            "ordnung/spa",
            "ordnung/proclaimWhen",
            "ordnung/utils",
            "ordnung/ajax",
            "ordnung/qvc/constraints/NotEmpty",
            "ordnung/qvc/constraints/Pattern"
          ],
          
          
          optimize: "none",
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },
    uglify: {
      //https://github.com/gruntjs/grunt-contrib-uglify
      my_target: {
        options: {
          sourceMap: 'Dist/ordnung.min.js.map',
          sourceMapIn: 'Dist/ordnung.js.map', // input sourcemap from a previous compilation
        },
        files: {
          'Dist/ordnung.min.js': ['Dist/ordnung.js']
        }
      }
    },
    karma: {
      //https://github.com/karma-runner/grunt-karma
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['Firefox', 'IE']
      },
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('install', ['bower']);
  grunt.registerTask('build', ['requirejs', 'uglify']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['bower', 'requirejs', 'uglify', 'karma:continuous']);

};