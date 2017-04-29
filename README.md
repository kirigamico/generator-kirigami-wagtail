# generator-kirigami-wagtail [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Yeoman generator for Wagtail

## What's in the box

 * Wagtail
 * Front-end tooling (w/ gulp)
 * Basic styles
 * Deploy configuration

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
* DISABLE_COLLECTSTATIC

## License

MIT © [Mitchel Cabuloy](https://mitchel.me)


[npm-image]: https://badge.fury.io/js/generator-kirigami-wagtail.svg
[npm-url]: https://npmjs.org/package/generator-kirigami-wagtail
[travis-image]: https://travis-ci.org/kirigamico/generator-kirigami-wagtail.svg?branch=master
[travis-url]: https://travis-ci.org/kirigamico/generator-kirigami-wagtail
[daviddm-image]: https://david-dm.org/kirigamico/generator-kirigami-wagtail.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kirigamico/generator-kirigami-wagtail
