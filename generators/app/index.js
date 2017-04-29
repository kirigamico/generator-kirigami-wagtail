'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('kirigami-wagtail') + ' generator!'
    ));

    this.option('skip-install');

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: path.basename(process.cwd()),
    }, {
      type: 'input',
      name: 'description',
      message: 'Your project\'s description',
      default: '',
    }, {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: 'Kirigami Design Company <http://kirigami.co>',
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.nameSnake = this.props.name.replace(/-/g, '_');

      this.props.context = {
        projectName: this.props.name,
        projectNameSnake: this.props.nameSnake,
        description: this.props.description,
        author: this.props.author,
      };
    }.bind(this));
  },

  project: function () {
    const dotfiles = [
      '_buildpacks',
      '_editorconfig',
      '_env.sample',
      '_flake8',
      '_gitignore',
      '_sass-lint.yml',
    ];

    const ignoredDotfiles = dotfiles.map(path => this.templatePath(path));

    // Copy all files except some
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath(),
      {globOptions: {ignore: ['**/*/project_name/*', ...ignoredDotfiles]}}
    );

    // Copy dotfiles
    for (let dotfile of dotfiles) {
      this.fs.copy(
        this.templatePath(dotfile),
        this.destinationPath(dotfile.replace('_', '.'))
      );
    }

    this.fs.copyTpl(
      this.templatePath('_env.sample'),
      this.destinationPath('.env.sample'),
      this.props.context
    );
  },

  python: function () {
    // Copy templates
    this.fs.copyTpl(
      this.templatePath('manage.py'),
      this.destinationPath('manage.py'),
      this.props.context
    );

    this.fs.copyTpl(
      this.templatePath('project_name/**/*'),
      this.destinationPath(this.props.nameSnake),
      this.props.context
    );
  },

  frontend: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props.context
    );

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      this.props.context
    );
  },

  deploys: function () {
    this.fs.copyTpl(
      this.templatePath('uwsgi.ini'),
      this.destinationPath('uwsgi.ini'),
      this.props.context
    );
  },

  docs: function () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props.context
    );
  },

  install: function () {
    if (!this.options.skipInstall) {
      this.installDependencies();

      if (process.env.VIRTUAL_ENV) {
        this.log(chalk.yellow('Installing Python dependencies.'));
        this.spawnCommandSync('pip', ['install', 'pip-tools']);
        this.spawnCommandSync('pip-sync', ['requirements.txt', 'dev-requirements.txt']);
      } else {
        this.log(chalk.yellow('Not in a virtualenv, skipping pip install.'));
      }
    }
  },
});
