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

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Mitchel Cabuloy](https://mitchel.me)


[npm-image]: https://badge.fury.io/js/generator-kirigami-wagtail.svg
[npm-url]: https://npmjs.org/package/generator-kirigami-wagtail
[travis-image]: https://travis-ci.org/mixxorz/generator-kirigami-wagtail.svg?branch=master
[travis-url]: https://travis-ci.org/mixxorz/generator-kirigami-wagtail
[daviddm-image]: https://david-dm.org/kirigamico/generator-kirigami-wagtail.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kirigamico/generator-kirigami-wagtail
