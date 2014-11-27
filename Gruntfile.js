module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'head-script-disabled': true,
		            'style-disabled': true
		        },
		        src: ['index.html']
		    }
		},
		uglify: {
		    build: {
		        files: {
		            'dist/js/base.min.js': ['src/js/vendor/jquery-2.1.1.min.js', 'src/js/vendor/randomColor.js', 'src/js/base.js']
		        }
		    }
		},
		cssc: {
		    build: {
		        options: {
		            consolidateViaDeclarations: true,
		            consolidateViaSelectors:    true,
		            consolidateMediaQueries:    true
		        },
		        files: {
		            'dist/css/main.css': 'dist/css/main.css'
		        }
		    }
		},
		cssmin: {
		    build: {
		        src: 'dist/css/main.css',
		        dest: 'dist/css/main.css'
		    }
		},
		sass: {
		    build: {
		        files: {
		            'dist/css/main.css': 'src/scss/main.scss'
		        }
		    }
		},
		autoprefixer: {
			no_dest: {
      			src: 'dist/css/main.css'
    		}
  		},
		watch: {
			options: {
		      livereload: true,
		    },
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    },
		    js: {
		        files: ['src/js/**/*.js'],
		        tasks: ['uglify']
		    },
		    css: {
		        files: ['src/scss/**/*.scss'],
		        tasks: ['buildcss']
		    }
		}
    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin', 'autoprefixer']);

};