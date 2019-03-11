'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('kirigami-wagtail') + ' generator!'
    ));

    this.option('skip-install');

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: path.basename(process.cwd()).replace('.', ''),
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
  }

  project() {
    const dotfiles = [
      '_buildpacks',
      '_dockerignore',
      '_editorconfig',
      '_env.sample',
      '_flake8',
      '_gitignore',
      '_sass-lint.yml',
    ];

    const ignoredDotfiles = dotfiles.map(path => this.templatePath(path))
    ignoredDotfiles.push(this.templatePath('_circleci_config.yml'));

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

    // Copy special dotfolder
    this.fs.copy(
      this.templatePath('_circleci_config.yml'),
      this.destinationPath('.circleci/config.yml')
    );

    this.fs.copyTpl(
      this.templatePath('_env.sample'),
      this.destinationPath('.env.sample'),
      this.props.context
    );
  }

  python() {
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

    this.fs.copyTpl(
      this.templatePath('stellar.yaml'),
      this.destinationPath('stellar.yaml'),
      this.props.context
    );
  }

  frontend() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props.context
    );
  }

  deploys() {
    this.fs.copyTpl(
      this.templatePath('uwsgi.ini'),
      this.destinationPath('uwsgi.ini'),
      this.props.context
    );
  }

  docs() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props.context
    );
  }

  install() {
    if (this.options.skipInstall) {
      this.log('Finished! Run ' + chalk.green('docker-compose up') + ' to get started.');
    } else {
      this.log(chalk.yellow('Generating lock files.'));
      this.spawnCommandSync('docker-compose', ['run', '--rm', 'django', 'pipenv', 'lock']);
      this.spawnCommandSync('docker-compose', ['run', '--rm', 'gulp', 'npm', 'install']);

      this.log(chalk.yellow('Migrating database.'));
      this.spawnCommandSync('docker-compose', ['run', '--rm', 'django', 'pipenv', 'run', 'python', 'manage.py', 'migrate']);

      this.log(chalk.yellow('Starting containers using docker-compose.'));
      this.spawnCommandSync('docker-compose', ['up']);
    }
  }
};
