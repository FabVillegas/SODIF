module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      files: {
        src: 'app/js/**/*.js',  // source files mask
        dest: 'build/',    // destination folder
        expand: true,    // allow dynamic building
        flatten: true,   // remove all unnecessary nesting
        ext: '.min.js'   // replace .js to .min.js
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      files: {
        src: 'app/css/*.css',  // source files mask
        dest: 'build/',    // destination folder
        expand: true,    // allow dynamic building
        flatten: true,   // remove all unnecessary nesting
        ext: '.min.css'   // replace .css to .min.css
      }
    },
    obfuscator: {
      files: [
        'app/js/**/*.js'
      ],
      entry: 'app.js',
      out: 'build/*.js',
      strings: true,
      root: __dirname
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-obfuscator');

  // Default task(s).
  grunt.registerTask('minjs', ['uglify']);
  grunt.registerTask('mincss', ['cssmin']);
  grunt.registerTask('obfuscatejs', ['obfuscator']);

};
