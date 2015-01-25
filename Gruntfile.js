/**
 * Created by GuNs on 11-11-2014.
 */
module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    'js/custom/script.js', // All JS in the libs folder
                    'js/bootstrap.min.js'  // This specific file
                ],
                dest: 'js/build/production.js'
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/build/'
                }]
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/build/style.css': 'css/style.css'
                }
            }
        },
        watch: {
            options: {
                livereload: false
            },
            scripts: {
                files: ['js/*.js','**/*.js'],
                tasks: ['concat', 'uglify','jshint'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['css/style.css'],
                tasks: ['autoprefixer']
            },
            images: {
                files: ['images/**/*.{png,jpg,gif,svg}'],
                tasks: ['imagemin']
            }
        },
        jshint: {
            options: {
                curly: true
            },
            all: ['Gruntfile.js', 'js/custom/*.js']
        },
        uncss: {
            dist: {
                files: {
                    'css/style-uncss.css': ['*.html']
                }
            }
        },
        plato: {
            my_task: {
                options : {
                    exclude: /\.min\.js$/    // excludes source files finishing with ".min.js"
                },
                files: {
                    'reports': ['js/custom/*.js']
                }
            }
        },
        "jsbeautifier" : {
            files : ["js/custom/*.js"]
        },
        rev: {
            options: {
                algorithm: 'sha1',
                length: 4
            },
            files: {
                src: ['images/**/*.{gif,png,jpg}','js/custom/*.js','css/style.css']
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* Minified css file */'
                },
                files: {
                    'css/min/style.css': ['css/style.css']
                }
            }
        },
        changelog: {
            options: {
                // Task-specific options go here.
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },
        phantomas: {
            gunsSite : {
                options : {
                    indexPath : './phantomas/',
                    options   : {},
                    url       : 'http://meetguns.com/',
                    buildUi   : true
                }
            }
        },
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: ['**/*.{png,svg}'],
                    dest: "images/grunticon-output"
                }],
                options: {
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-phantomas');
    grunt.loadNpmTasks('grunt-grunticon');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin','watch','jshint','autoprefixer','uncss','plato:my_task','jsbeautifier','rev','cssmin','bump','phantomas:gunsSite','grunticon:myIcons']);

};