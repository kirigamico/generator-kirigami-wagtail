# <%= projectName %>

<%= description %>

## Requirements

* Docker

## Developing

Use docker-compose.

```
$ docker-compose up
```

This will create the containers necessary for development. Namely, the postgres
database, django runserver, and gulp + browser-sync.

### Management commands

Occasionally, you might need to run django management commands. e.g. to migrate
the database or create a superuser. Run this using docker-compose.

```
$ docker-compose run django python manage.py migrate
```

### Gulp

Gulp handles static asset compilation and runs in its own container. To run gulp
tasks manually, use docker-compose:

```
$ docker-compose run gulp gulp <command>
```

Here's a list of available gulp tasks:

```
$ gulp               # runs watchers
$ gulp scripts       # compile javascript
$ gulp styles        # compile sass
$ gulp images        # copy images
$ gulp svg           # minify svgs
$ gulp build         # does all of the above
$ gulp build --prod  # build but also minify everything
```

### Linting

Typically, linting needs to work on the host machine because the code editor is
on the host machine. flake8, sass-lint, and eslint are configured to lint code
for this repository. flake8 and sass-lint can be installed globally.

```
$ npm install -g sass-lint
$ pip install flake8  # outside a virtualenv
```

eslint needs to be installed locally however. Unfortunately, it only works if
you install everything.

```
$ npm install
```

You can then run the linters using npm scripts:

```
$ npm run lint:python   # lint using flake8
$ npm run lint:styles   # lint using sass-lint
$ npm run lint:scripts  # lint using eslint
$ npm run lint          # run all linters
```


## Deploying

The app is configured to be deployed to Heroku/Dokku. But don't forget to:

1. Create a Postgres database and link it. Make sure `DATABASE_URL` gets set.
2. Set `ALLOWED_HOST=localhost,.yourdomain.com`, `DJANGO_ENV=production`, `DEBUG=False`, and `DISABLE_COLLECTSTATIC=1`
