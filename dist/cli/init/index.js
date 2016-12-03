'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Number$isInteger = require('babel-runtime/core-js/number/is-integer')['default'];

var _Number$parseInt = require('babel-runtime/core-js/number/parse-int')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;

var _templateObject = _taggedTemplateLiteral(['\n        |\n        | ', ': ', '\n        |\n        '], ['\n        |\n        | ', ': ', '\n        |\n        ']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _common = require('../common');

var _templates = require('./templates');

var _buildCheckHooks = require('../build/checkHooks');

function init(project) {
  var validName, defaultScopes, path, packagePath, packageJson, packageText, rootDirectory, envPath, env, baseUrl, redirectUrl, instructions, questions, answers, name, pathFragment, newPackageJson, newEnv, progress, eslintrcPath, gitignorePath, schemaPath, permissionsPath, mutationsPath, hooksPath;
  return _regeneratorRuntime.async(function init$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!project) {
          context$1$0.next = 5;
          break;
        }

        validName = validateName(project);

        if (validName) {
          context$1$0.next = 5;
          break;
        }

        console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), validName));
        return context$1$0.abrupt('return', false);

      case 5:

        (0, _common.logo)();

        defaultScopes = {
          facebook: ['public_profile', 'email'],
          github: ['user:email'],
          google: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
        };
        path = (0, _path.resolve)(project || '.');
        packagePath = (0, _path.join)(path, 'package.json');
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap((0, _common.mkdir)(packagePath));

      case 11:
        packageJson = undefined;
        context$1$0.prev = 12;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _common.readFile)(packagePath));

      case 15:
        packageText = context$1$0.sent;

        packageJson = JSON.parse(packageText);
        context$1$0.next = 22;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](12);

        packageJson = {};

      case 22:
        rootDirectory = packageJson.config && packageJson.config.meldio && packageJson.config.meldio.root ? packageJson.config.meldio.root : '';
        envPath = (0, _path.resolve)((0, _path.join)(rootDirectory || path, '.env'));
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap((0, _common.loadEnv)(envPath));

      case 26:
        env = context$1$0.sent;

        baseUrl = function baseUrl(ans) {
          return 'http://' + ans.host + ':' + ans.port;
        };

        redirectUrl = function redirectUrl(ans) {
          return {
            facebook: _chalk2['default'].underline(baseUrl(ans) + '/auth/facebook/callback'),
            google: _chalk2['default'].underline(baseUrl(ans) + '/auth/google/callback'),
            github: _chalk2['default'].underline(baseUrl(ans) + '/auth/github/callback')
          };
        };

        instructions = function instructions(ans) {
          return {
            facebook: '\nfacebook: use the following for "Valid OAuth redirect URIs":\n' + ('          "' + redirectUrl(ans).facebook + '"'),
            google: '\ngoogle: use the following for "Authorized Redirect URI":\n' + ('        "' + redirectUrl(ans).google + '"'),
            // twitter:
            //   `\ntwitter: use the following for "Callback URL":\n` +
            //     `         "${redirectUrl(ans).twitter}"`,
            github: '\ngithub: use the following for "Authorization callback URL":\n' + ('        "' + redirectUrl(ans).github + '"'),
            password: '\npassword'
          };
        };

        questions = [{
          type: 'input',
          name: 'project',
          message: 'Project name',
          'default': packageJson.name ? packageJson.name : undefined,
          validate: validateName,
          when: function when() {
            return !project || !project.length;
          }
        }, {
          type: 'input',
          name: 'version',
          message: 'Version',
          'default': packageJson.version ? packageJson.version : undefined,
          validate: validateVersion
        }, {
          type: 'input',
          name: 'dbConnectionUri',
          message: 'MongoDB connection URI',
          'default': function _default(answers) {
            return packageJson.config && packageJson.config.meldio && packageJson.config.meldio.dbConnectionUri ? packageJson.config.meldio.dbConnectionUri : 'mongodb://localhost:27017/' + (project || answers.project);
          }
        }, {
          type: 'input',
          name: 'host',
          message: 'Meldio server host',
          'default': packageJson.config && packageJson.config.meldio && packageJson.config.meldio.host ? packageJson.config.meldio.host : 'localhost'
        }, {
          type: 'input',
          name: 'port',
          message: 'Meldio server port',
          'default': packageJson.config && packageJson.config.meldio && packageJson.config.meldio.port ? packageJson.config.meldio.port : 9000,
          validate: function validate(value) {
            return !_Number$isInteger(_Number$parseInt(value, 10)) || _Number$parseInt(value, 10) < 1024 ? 'Port must be an integer value greater or equal to 1024' : true;
          }
        }, {
          type: 'checkbox',
          name: 'enabledAuth',
          message: 'Select authentication methods',
          choices: function choices(ans) {
            return [{
              name: 'facebook',
              short: instructions(ans).facebook,
              checked: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.enabledAuth && Array.isArray(packageJson.config.meldio.enabledAuth) && packageJson.config.meldio.enabledAuth.includes('facebook')
            }, {
              name: 'google',
              short: instructions(ans).google,
              checked: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.enabledAuth && Array.isArray(packageJson.config.meldio.enabledAuth) && packageJson.config.meldio.enabledAuth.includes('google')
            },
            // {
            //   name: 'twitter',
            //   short: instructions(ans).twitter,
            //   checked: packageJson.config && packageJson.config.meldio &&
            //     packageJson.config.meldio.enabledAuth &&
            //     Array.isArray(packageJson.config.meldio.enabledAuth) &&
            //     packageJson.config.meldio.enabledAuth.includes('twitter'),
            // },
            {
              name: 'github',
              short: instructions(ans).github,
              checked: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.enabledAuth && Array.isArray(packageJson.config.meldio.enabledAuth) && packageJson.config.meldio.enabledAuth.includes('github')
            }, {
              name: 'password',
              short: instructions(ans).password,
              checked: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.enabledAuth && Array.isArray(packageJson.config.meldio.enabledAuth) && packageJson.config.meldio.enabledAuth.includes('password')
            }];
          }
        }, {
          type: 'input',
          name: 'FACEBOOK_CLIENT_ID',
          message: 'Facebook App ID',
          validate: function validate(val) {
            return !val || !val.length ? 'Facebook App ID is required' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.includes('facebook');
          },
          'default': env && env.FACEBOOK_CLIENT_ID ? env.FACEBOOK_CLIENT_ID : undefined
        }, {
          type: 'password',
          name: 'FACEBOOK_CLIENT_SECRET',
          message: 'Facebook App Secret',
          validate: function validate(val) {
            return !val || !val.length ? 'Facebook App Secret is required' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.includes('facebook');
          },
          'default': env && env.FACEBOOK_CLIENT_SECRET ? env.FACEBOOK_CLIENT_SECRET : undefined
        }, {
          type: 'input',
          name: 'GOOGLE_CLIENT_ID',
          message: 'Google Client ID',
          validate: function validate(val) {
            return !val || !val.length ? 'Google Client ID is required' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.includes('google');
          },
          'default': env && env.GOOGLE_CLIENT_ID ? env.GOOGLE_CLIENT_ID : undefined
        }, {
          type: 'password',
          name: 'GOOGLE_CLIENT_SECRET',
          message: 'Google Client Secret',
          validate: function validate(val) {
            return !val || !val.length ? 'Google Client Secret is required' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.includes('google');
          },
          'default': env && env.GOOGLE_CLIENT_SECRET ? env.GOOGLE_CLIENT_SECRET : undefined
        },

        // {
        //   type: 'input',
        //   name: 'TWITTER_CLIENT_ID',
        //   message: 'Twitter API Key',
        //   validate: val => !val || !val.length ?
        //     'Twitter API Key is required' :
        //     true,
        //   when: answers => answers.enabledAuth.includes('twitter'),
        //   default:
        //     env && env.TWITTER_CLIENT_ID ?
        //       env.TWITTER_CLIENT_ID :
        //       undefined,
        // },
        // {
        //   type: 'password',
        //   name: 'TWITTER_CLIENT_SECRET',
        //   message: 'Twitter API Secret',
        //   validate: val => !val || !val.length ?
        //     'Twitter API Secret is required' :
        //     true,
        //   when: answers => answers.enabledAuth.includes('twitter'),
        //   default:
        //     env && env.TWITTER_CLIENT_SECRET ?
        //       env.TWITTER_CLIENT_SECRET :
        //       undefined,
        // },

        {
          type: 'input',
          name: 'GITHUB_CLIENT_ID',
          message: 'GitHub Client ID',
          validate: function validate(val) {
            return !val || !val.length ? 'Github Client ID is required' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.includes('github');
          },
          'default': env && env.GITHUB_CLIENT_ID ? env.GITHUB_CLIENT_ID : undefined
        }, {
          type: 'password',
          name: 'GITHUB_CLIENT_SECRET',
          message: 'GitHub Client Secret',
          validate: function validate(val) {
            return !val || !val.length ? 'GitHub Client Secret is required' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.includes('github');
          },
          'default': env && env.GITHUB_CLIENT_SECRET ? env.GITHUB_CLIENT_SECRET : undefined
        }, {
          type: 'list',
          name: 'passwordHashStrength',
          message: 'Select password hash strength',
          'default': packageJson.config && packageJson.config.meldio && packageJson.config.meldio.passwordHashStrength && [12, 13, 14, 15, 16].includes(packageJson.config.meldio.passwordHashStrength) ? packageJson.config.meldio.passwordHashStrength : 12,
          choices: [{ name: '12', value: 12 }, { name: '13', value: 13 }, { name: '14', value: 14 }, { name: '15', value: 15 }, { name: '16', value: 16 }],
          when: function when(answers) {
            return answers.enabledAuth.includes('password');
          }
        }, {
          type: 'list',
          name: 'sessionDurationUnit',
          message: 'Select authentication session duration unit',
          'default': packageJson.config && packageJson.config.meldio && packageJson.config.meldio.sessionDurationUnit && ['hours', 'days', 'weeks', 'months'].includes(packageJson.config.meldio.sessionDurationUnit) ? packageJson.config.meldio.sessionDurationUnit : 'days',
          choices: [{ name: 'hours' }, { name: 'days' }, { name: 'weeks' }, { name: 'months' }],
          when: function when(answers) {
            return answers.enabledAuth.length;
          }
        }, {
          type: 'input',
          name: 'sessionDuration',
          message: function message(answers) {
            return 'Session duration in ' + answers.sessionDurationUnit;
          },
          'default': function _default(answers) {
            return packageJson.config && packageJson.config.meldio && packageJson.config.meldio.sessionDuration && packageJson.config.meldio.sessionDurationUnit === answers.sessionDurationUnit ? packageJson.config.meldio.sessionDuration : answers.sessionDurationUnit === 'hours' ? 48 : answers.sessionDurationUnit === 'days' ? 2 : answers.sessionDurationUnit === 'weeks' ? 1 : answers.sessionDurationUnit === 'months' ? 1 : undefined;
          },
          validate: function validate(value) {
            return !_Number$isInteger(_Number$parseInt(value, 10)) || _Number$parseInt(value, 10) <= 0 ? 'Session duration must be a positive integer value' : true;
          },
          when: function when(answers) {
            return answers.enabledAuth.length;
          }
        }];
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(promiseInquiry(questions));

      case 33:
        answers = context$1$0.sent;
        name = project || answers.project;
        pathFragment = path.length > 75 ? '...' + path.substr(path.length - 72, 72) : path;

        console.log();
        console.log('  ' + _chalk2['default'].white.bold('setting up project ' + _chalk2['default'].cyan(name) + ' in:'));
        console.log('  ' + _chalk2['default'].cyan(pathFragment));
        console.log();

        newPackageJson = _extends({}, packageJson, {
          name: name,
          version: answers.version,
          config: _extends({}, packageJson.config || {}, {
            meldio: {
              dbConnectionUri: answers.dbConnectionUri,
              protocol: 'http',
              host: answers.host,
              port: answers.port,
              enabledAuth: answers.enabledAuth,
              sessionDurationUnit: answers.sessionDurationUnit,
              sessionDuration: answers.sessionDuration,
              passwordHashStrength: answers.passwordHashStrength,
              // default authentication scopes:
              scopes: _extends({}, packageJson.config && packageJson.config.meldio && packageJson.config.meldio.scopes ? packageJson.config.meldio.scopes : {}, answers.enabledAuth.includes('facebook') && !(packageJson.config && packageJson.config.meldio && packageJson.config.meldio.scopes && packageJson.config.meldio.scopes.facebook) ? { facebook: defaultScopes.facebook } : {}, answers.enabledAuth.includes('google') && !(packageJson.config && packageJson.config.meldio && packageJson.config.meldio.scopes && packageJson.config.meldio.scopes.google) ? { google: defaultScopes.google } : {}, answers.enabledAuth.includes('github') && !(packageJson.config && packageJson.config.meldio && packageJson.config.meldio.scopes && packageJson.config.meldio.scopes.github) ? { github: defaultScopes.github } : {}),

              // ...answers.enabledAuth.includes('twitter') &&
              //   !(packageJson.config && packageJson.config.meldio &&
              //     packageJson.config.meldio.scopes &&
              //     packageJson.config.meldio.scopes.twitter) ?
              //   { twitter: defaultScopes.twitter } : { },
              // paths and files that are not configurable through CLI:
              root: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.root ? packageJson.config.meldio.root : '',
              schema: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.schema ? packageJson.config.meldio.schema : 'schema.sdl',
              permissions: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.permissions ? packageJson.config.meldio.permissions : 'permissions.js',
              mutations: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.mutations ? packageJson.config.meldio.mutations : 'mutations',
              hooks: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.hooks ? packageJson.config.meldio.hooks : 'hooks',
              build: packageJson.config && packageJson.config.meldio && packageJson.config.meldio.build ? packageJson.config.meldio.build : '.build'
            }
          })
        });
        context$1$0.t1 = {};
        context$1$0.t2 = env;
        context$1$0.t3 = answers.FACEBOOK_CLIENT_ID ? { FACEBOOK_CLIENT_ID: answers.FACEBOOK_CLIENT_ID } : { FACEBOOK_CLIENT_ID: undefined };
        context$1$0.t4 = answers.FACEBOOK_CLIENT_SECRET ? { FACEBOOK_CLIENT_SECRET: answers.FACEBOOK_CLIENT_SECRET } : { FACEBOOK_CLIENT_SECRET: undefined };
        context$1$0.t5 = answers.GOOGLE_CLIENT_ID ? { GOOGLE_CLIENT_ID: answers.GOOGLE_CLIENT_ID } : { GOOGLE_CLIENT_ID: undefined };
        context$1$0.t6 = answers.GOOGLE_CLIENT_SECRET ? { GOOGLE_CLIENT_SECRET: answers.GOOGLE_CLIENT_SECRET } : { GOOGLE_CLIENT_SECRET: undefined };
        context$1$0.t7 = answers.GITHUB_CLIENT_ID ? { GITHUB_CLIENT_ID: answers.GITHUB_CLIENT_ID } : { GITHUB_CLIENT_ID: undefined };
        context$1$0.t8 = answers.GITHUB_CLIENT_SECRET ? { GITHUB_CLIENT_SECRET: answers.GITHUB_CLIENT_SECRET } : { GITHUB_CLIENT_SECRET: undefined };

        if (!env.MASTER_SECRET) {
          context$1$0.next = 53;
          break;
        }

        context$1$0.t9 = { MASTER_SECRET: env.MASTER_SECRET };
        context$1$0.next = 57;
        break;

      case 53:
        context$1$0.next = 55;
        return _regeneratorRuntime.awrap((0, _common.newMasterSecret)());

      case 55:
        context$1$0.t10 = context$1$0.sent;
        context$1$0.t9 = {
          MASTER_SECRET: context$1$0.t10
        };

      case 57:
        context$1$0.t11 = context$1$0.t9;
        newEnv = _extends(context$1$0.t1, context$1$0.t2, context$1$0.t3, context$1$0.t4, context$1$0.t5, context$1$0.t6, context$1$0.t7, context$1$0.t8, context$1$0.t11);
        progress = new _progress2['default']('  setting up [:bar] :percent :etas', {
          width: 20,
          total: 8 + _Object$keys(_buildCheckHooks.HOOKS).length * 2,
          clear: true
        });

        progress.tick(1);

        context$1$0.next = 63;
        return _regeneratorRuntime.awrap((0, _common.writeFile)(packagePath, JSON.stringify(newPackageJson, null, '  ')));

      case 63:
        progress.tick(1);

        context$1$0.next = 66;
        return _regeneratorRuntime.awrap((0, _common.writeEnv)(envPath, newEnv));

      case 66:
        progress.tick(1);

        eslintrcPath = (0, _path.join)(path, '.eslintrc');
        context$1$0.next = 70;
        return _regeneratorRuntime.awrap((0, _common.createFileIfMissing)(eslintrcPath, _templates.eslintrc));

      case 70:
        progress.tick(1);

        gitignorePath = (0, _path.join)(path, '.gitignore');
        context$1$0.next = 74;
        return _regeneratorRuntime.awrap((0, _common.createFileIfMissing)(gitignorePath, _templates.gitignore));

      case 74:
        progress.tick(1);

        // balance of the files will be under "root" if it is specified
        if (newPackageJson.config.meldio.root) {
          path = (0, _path.resolve)('.', newPackageJson.config.meldio.root);
        }

        schemaPath = (0, _path.join)(path, newPackageJson.config.meldio.schema);
        context$1$0.next = 79;
        return _regeneratorRuntime.awrap((0, _common.createFileIfMissing)(schemaPath, _templates.schema));

      case 79:
        progress.tick(1);

        permissionsPath = (0, _path.join)(path, newPackageJson.config.meldio.permissions);
        context$1$0.next = 83;
        return _regeneratorRuntime.awrap((0, _common.createFileIfMissing)(permissionsPath, _templates.permissions));

      case 83:
        progress.tick(1);

        mutationsPath = (0, _path.join)(path, newPackageJson.config.meldio.mutations);
        context$1$0.next = 87;
        return _regeneratorRuntime.awrap((0, _common.mkdir)(mutationsPath, true));

      case 87:
        progress.tick(1);

        hooksPath = (0, _path.join)(path, newPackageJson.config.meldio.hooks);
        context$1$0.next = 91;
        return _regeneratorRuntime.awrap(_Promise.all(_Object$keys(_buildCheckHooks.HOOKS).map(function callee$1$0(hook) {
          var hookPath;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                hookPath = (0, _path.join)(hooksPath, hook + '.js');
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap((0, _common.mkdir)(hookPath));

              case 3:
                progress.tick(1);

                if (!_templates.hooks[hook]) {
                  context$2$0.next = 7;
                  break;
                }

                context$2$0.next = 7;
                return _regeneratorRuntime.awrap((0, _common.createFileIfMissing)(hookPath, _templates.hooks[hook]));

              case 7:
                progress.tick(1);

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })));

      case 91:
        return context$1$0.abrupt('return', true);

      case 92:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 19]]);
}

function promiseInquiry(questions) {
  return _regeneratorRuntime.async(function promiseInquiry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _Promise(function (resolve) {
          _inquirer2['default'].prompt(questions, function (answers) {
            resolve(answers);
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function validateName(name) {
  var NPM_MAX_NAME_LEN = 214;
  var ALLOWED_FIRST_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var ALLOWED_CHARS = '-0123456789' + ALLOWED_FIRST_CHAR;

  return !name || !name.length ? 'Project name is required.' : name.length > NPM_MAX_NAME_LEN ? 'Project name must be shorter than ' + NPM_MAX_NAME_LEN + ' characters.' : !ALLOWED_FIRST_CHAR.includes(name.split('')[0]) ? 'Project name must start with a letter.' : !name.split('').every(function (ch) {
    return ALLOWED_CHARS.includes(ch);
  }) ? 'Project name can only include letters, numbers or dashes.' : true;
}

function validateVersion(version) {
  return !_semver2['default'].valid(version) ? 'Must be a valid semver version number.' : true;
}
// twitter: [ ],
// twitter: chalk.underline(`${baseUrl(ans)}/auth/twitter/callback`),

// ...answers.TWITTER_CLIENT_ID ?
//   { TWITTER_CLIENT_ID: answers.TWITTER_CLIENT_ID } :
//   { TWITTER_CLIENT_ID: undefined },
// ...answers.TWITTER_CLIENT_SECRET ?
//   { TWITTER_CLIENT_SECRET: answers.TWITTER_CLIENT_SECRET } :
//   { TWITTER_CLIENT_SECRET: undefined },