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

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: path.basename(process.cwd())
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.pyname = this.props.name.replace(/-/g, '_');
    }.bind(this));
  },

  python: function () {
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath(),
      {globOptions: {ignore: '**/*/project_name/*'}}
    );

    this.fs.copyTpl(
      this.templatePath('project_name/**/*'),
      this.destinationPath(this.props.pyname),
      {projectName: this.props.pyname}
    );
  }
});
