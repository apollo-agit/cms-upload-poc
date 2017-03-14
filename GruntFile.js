    module.exports = function(grunt) {
    var path = require("path");

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    var config = {
                app: 'src',
                dist: 'dist/public',
                root: 'dist/',
                server: 'server',
                distserver: 'dist/server'
            };


    console.log(config);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: config,

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: '<%= config.dist %>/js/<%= pkg.name %>.js',
                dest: '<%= config.dist %>/js/<%= pkg.name %>.min.js'
            }
        },

        sass: {
            options: {
                style: 'expanded',
                loadPath: ['.']
            },
            dist: {
                files: [{
                    src: '<%= config.app %>/style/style.scss',
                    dest: '<%= config.dist %>/style/registration-wc-poc.css'
                }]
            }
        },

        concat_in_order: {
            dist: {
                files: [{
                    src: ['<%= config.app %>/js/app.js'                        
                    ],
                    dest: '<%= config.dist %>/js/<%= pkg.name %>.js'
                }]
            }
        },

        bowercopy: {
            options: {
                clean: false,
                destPrefix: '<%= config.dist %>/bower_components'
            },
            js: {
                src: '**/*.js'
            },
            css: {
                src: '**/*.css'
            },
            html: {
                src: '**/*.html'
            },
            ttf: {
                src: '**/*.ttf'
            },
            woff: {
                src: '**/*.woff'
            },
            woff2: {
                src: '**/*.woff2'
            },
            svg: {
                src: '**/*.svg'
            },
            eot: {
                src: '**/*.eot'
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images/',
                    src: ['**/*.*'],
                    dest: '<%= config.dist %>/images/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/fonts/',
                    src: ['**/*.*'],
                    dest: '<%= config.dist %>/fonts/'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/',
                    src: ['**/*.html'],
                    dest: '<%= config.dist %>'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.server %>',
                    src: ['**/*.*'],
                    dest: '<%= config.distserver %>'
                }]
            }
        },
        clean: {
            build: ['<%= config.root %>']
        },
        watch: {
            options: {
                spawn: false,
                debounceDelay: 1000,
                livereload: 8080
            },
            scripts: {
                files: ['<%= config.app %>/js/**/*.js'],
                tasks: ['buildjs'],
                options: {
                    event: ['added', 'changed']
                }
            },
            css: {
                files: ['<%= config.app %>/css/**/*.css', '<%= config.app %>/css/**/*.scss'],
                tasks: ['buildcss'],
                options: {
                    event: ['added', 'changed'],
                }
            },
            html: {
                files: ['<%= config.app %>/html/**/*.html', '<%= config.app %>/html/**/*.html'],
                tasks: ['copyassets'],
                options: {
                    event: ['added', 'changed'],
                }
            }
        },
        express: {
            server: {
                options: {
                    server: path.resolve('./dist/server/server.js'),
                    serverreload: false,
                    livereload: 8080,
                    port: 9000,
                    bases: ['./dist/public/**/*']
                }
            }
        }

    });

    grunt.registerTask('buildjs', ['concat_in_order','bowercopy:js']);
    grunt.registerTask('copyassets', ['sass:dist', 'copy:html',  'bowercopy:css', 
        'bowercopy:eot', 'bowercopy:woff', 'bowercopy:woff2', 'bowercopy:svg', 'bowercopy:ttf']);
    grunt.registerTask('copyserver', ['copy:server']);

    grunt.registerTask('serverwatch', ['express:server', 'watch']);

    grunt.registerTask('dist', ['clean', 'buildjs', 'copyassets', 'copyserver']);

 

};
