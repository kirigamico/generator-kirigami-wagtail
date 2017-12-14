# <%= projectName %>

<%= description %>

## Requirements

* Python 3.6
* Pipenv

## Setup

Install Python dependencies with pipenv. It'll automatically create a virtualenv for you, unless you already made one and have it activated.

```
$ pipenv install --dev
```

Install front-end dependencies with npm

```
$ npm install
```

Copy the `.env.sample` file to `.env` and replace its values as needed. You should create a postgres database for the project.

```
$ cp .env.sample .env
```

## Developing

Run the Django dev server

```
$ python manage.py runserver
```

Gulp is configured to compile JavaScript and Sass, minify images, and copy some files.

```
$ gulp // runs watchers
$ gulp scripts // compile javascript
$ gulp styles // compile sass
$ gulp images // copy images
$ gulp svg // minify svgs
$ gulp build // does all of the above
$ gulp build --prod // build but also minify everything
```

Run both at the same time using honcho

```
$ honcho start -f Procfile.dev
```

## Deploying

The app is configured to be deployed to Heroku/Dokku. But don't forget to:

1. Create a Postgres database and link it. Make sure `DATABASE_URL` gets set.
2. Set `ALLOWED_HOST=localhost,.yourdomain.com`, `DJANGO_ENV=production`, `DEBUG=False`, and `DISABLE_COLLECTSTATIC=1`