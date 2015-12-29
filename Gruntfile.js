module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig ({
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['build', 'build/js']
        },

        concat: {
            'css': {
                src: ['third-party/*css', 'css/*.css'],
                dest: 'build/css/styles.css'
            },
            'js': {
                src: ['js/*.js', 'third-party/*js'],
                dest: 'build/js/scripts.js'
            },
            'html': {
                src: 'index.html',
                dest: 'build/index.html'
            }

        },

        uglify: {
            dist: {
                options: {
                    compress: {},
                    mangle: {}
                },
                files: {
                    'build/js/scripts.js': 'build/js/scripts.js'
                }
            }
        },
        fileReplace: {
            patterns: {
                'build/index.html': 'build/buildIndex.html'
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'fonts',
                    dest: 'build/fonts/',
                    src: ['**/*.{eot,svg,ttf,woff,woff2}']
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'img',
                    dest: 'build/img/',
                    src: ['**/*.{png,jpg}']
                }, {
                    expand: false,
                    dot: true,
                    cwd: '',
                    dest: 'build/',
                    src: ['**.{htaccess,md,txt,xml,html}']
                }]
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-contrib-copy');
    grunt.loadNpmTasks ('grunt-contrib-cssmin');
    grunt.loadNpmTasks ('grunt-contrib-concat');
    grunt.loadNpmTasks ('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-file-replace');

    // Test tasks below can also be executed with the command line option `--build debug` to generate debug builds.

    grunt.registerTask ('debug', ['clean', 'concat', 'copy', 'fileReplace', 'uglify']);

};