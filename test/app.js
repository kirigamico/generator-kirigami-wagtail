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
      'Procfile',
      'Procfile.dev',
      'README.md',
      'apps',
      'bower.json',
      'dev-requirements.in',
      'dev-requirements.txt',
      'gulpfile.js',
      'manage.py',
      'nginx.conf.sigil',
      'package.json',
      'requirements.in',
      'requirements.txt',
      'static',
      'templates',
      'uwsgi.ini',
    ]);
  });
});
