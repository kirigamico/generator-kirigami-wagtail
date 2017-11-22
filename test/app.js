'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-kirigami-wagtail:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.buildpacks',
      '.editorconfig',
      '.env.sample',
      '.flake8',
      '.gitignore',
      '.sass-lint.yml',
      'Pipfile',
      'Procfile',
      'Procfile.dev',
      'README.md',
      'apps',
      'bin/post_compile',
      'gulpfile.js',
      'manage.py',
      'nginx.conf.sigil',
      'package.json',
      'runtime.txt',
      'static',
      'templates',
      'uwsgi.ini',
    ]);
  });
});
