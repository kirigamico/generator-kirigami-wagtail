# generator-kirigami-wagtail [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> An opinionated Yeoman generator for Wagtail

## What's in the box

* Python 3.6
* Django + Wagtail
   * Sane default configuration
   * [pip-tools](https://github.com/jazzband/pip-tools) for Python dependencies
   * [django-environ](https://github.com/joke2k/django-environ) for cleaner `settings.py` file
* Front-end tooling
  * [Gulp](http://gulpjs.com/) for task management
  * [Sass](http://sass-lang.com/) for easier CSS
  * [Browserify](http://browserify.org/) w/ [babel](https://babeljs.io/) for ES6 bundling
  * [imagemin](https://github.com/imagemin/imagemin) to compress images, svgs
  * `npm run lint` to lint files with flake8, eslint, and sass-lint
* Basic styles
  * [Breakerpoint Slicer](https://github.com/lolmaus/breakpoint-slicer) for breakpoints
  * [Modular Scale](https://github.com/modularscale/modularscale-sass) for… modular scale
  * [Susy](http://susy.oddbird.net/) for grids
  * [Typi](https://github.com/zellwk/typi) for typography
  * [normalize-scss](https://github.com/JohnAlbin/normalize-scss) for CSS resets
* Deploy configuration
  * Heroku/Dokku ready
  * [uwsgi](https://uwsgi-docs.readthedocs.io/) for Python server
  * [Whitenoise](http://whitenoise.evans.io/) for serving static files
  * CircleCI config

## Installation

First, install [Yeoman](http://yeoman.io) and generator-kirigami-wagtail using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-kirigami-wagtail
```

Create your project folder

```bash
mkdir wagtail-is-osm
mv wagtail-is-osm
```

Activate your virtualenv

```bash
virtualenv venv
source venv/bin/activate
```

Then generate your new project:

```bash
yo kirigami-wagtail
```

## Usage

Honcho gets installed locally, you can use it to run both Gulp and the Django
dev server at the same time.

```bash
honcho -f Procfile.dev start
```

## Deploy

This generator includes configuration for deployment using buildpacks, so you
can deploy it to Heroku or Dokku right out of the box.

Before you do though, make sure these environment variables are set on your
Heroku/Dokku app.

* SECRET_KEY
* ALLOWED_HOSTS
* DATABASE_URL
* DISABLE_COLLECTSTATIC=1

## License

MIT © [Mitchel Cabuloy](https://mitchel.me)


[npm-image]: https://badge.fury.io/js/generator-kirigami-wagtail.svg
[npm-url]: https://npmjs.org/package/generator-kirigami-wagtail
[travis-image]: https://travis-ci.org/kirigamico/generator-kirigami-wagtail.svg?branch=master
[travis-url]: https://travis-ci.org/kirigamico/generator-kirigami-wagtail
[daviddm-image]: https://david-dm.org/kirigamico/generator-kirigami-wagtail.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kirigamico/generator-kirigami-wagtail
