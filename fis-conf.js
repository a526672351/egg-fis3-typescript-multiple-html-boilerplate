// typescript register
require('ts-node/register');
const config = require('./config/config.default').default({nane:'eggjs'});
var prefix = `${config.static.prefix}`;
var public = './app/public';
var view = './app/view';
/* global fis */
// set the project root directory
fis.project.setProjectRoot(__dirname + '/app/web'); 

// project ignores
var ignores = fis.get('project.ignore');
ignores = ignores.concat([
  '.git/**',
  '.svn/**',
  '**.md',
  '**.log',
  '**.*.lock',
  '**.project',
  'fis-conf.js',
  'package.json',
  'MIT-LICENSE'
]);

fis.set('project.ignore', ignores);
// settings js module
fis.hook('commonjs', {
  extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
})

fis.match('/{node_modules}/**.js', {
  isMod: true,
  useSameNameRequire: true,
  url: `${prefix}$1`,
  deploy: fis.plugin('local-deliver', {
    to: public
  })
});

fis.unhook('components')
fis.hook('node_modules')

// settings static resources
fis.match('(**).ts', {
	parser: fis.plugin('typescript', {
    // options
  }),
  id: `$1`,
  rExt: '.js',
  url: `${prefix}$0`,
  isMod: true,
  deploy: fis.plugin('local-deliver', {
    to: public
  })
});

fis.match('**.d.ts', {
  release: false
}, true);

fis.match('**.js', {
  useHash: false,
  url: `${prefix}$0`,
  isMod: true,
  deploy: fis.plugin('local-deliver', {
      to: public
  })
});

fis.match("/widget/global/**.js", {
  isMod: false
});

// scss compilation
fis.match('**.scss', {
  // from .scss to .css
  rExt: '.css',
  parser: fis.plugin('node-sass'),
  url: `${prefix}$0`,
  deploy: fis.plugin('local-deliver', {
    to: public
  })
});

fis.match('**.{png,gif,svg,jpg,ico,swf}', {
  useHash: false,
  url: `${prefix}$0`,
  deploy: fis.plugin('local-deliver', {
    to: public
  })
})

fis.match('**.html', {
  useHash: false,
  useMap: true,
  deploy: fis.plugin('local-deliver', {
    to: view
  }),
})

// settings packager file
fis.match('/pkg/**.js', {
  useHash: false,
  url: `${prefix}$0`,
  deploy: fis.plugin('local-deliver', {
      to: public
  })
})

fis.match('::packager', {
  // analyze __RESOURCE_MAP__ structure to solve resource loading problem
  postpackager: fis.plugin('loader', {
      resourceType: 'commonjs',
      // resource map embedded
      useInlineMap: false
  }),
  packager: fis.plugin('map', {
      // whether to write the file path before the merge into the comment
      useTrack: false,
  }),
  spriter: fis.plugin('csssprites', {
      layout: 'matrix',
      margin: '15'
  })
})

//--- prod ---

fis.media('prod')
  .match('**.js', {
    optimizer: fis.plugin('uglify-js', {
      mangle: {
        // variables that do not want to be uglify
        expect: 'require,define,exports,module'
      },
      compress: {
        // remove debugging information
        drop_console: true
      }
    })
  })
  // compressed files are not processed
  .match('**.min.js', {
    optimizer: null
  })
  // html compression
  .match('**.html', {
    optimizer: fis.plugin('html-minifier')
  })
  // style compression
  .match('*.{css,scss}', {
    optimizer: fis.plugin('clean-css', {
      compatibility: 'ie8',
      // keep a rule for a newline
      keepBreaks: false
    })
  })
  // image compression
  .match('*.png', {
      optimizer: fis.plugin('png-compressor', {
        removeComments: true,
        removeEmptyElements: false,
      })
  });

// set pack
fis.media('prod').match('::packager', {
  postpackager: fis.plugin('loader', {
      allInOne: true
  })
})