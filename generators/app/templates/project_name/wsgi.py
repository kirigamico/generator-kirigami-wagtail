"""
WSGI config for <%= projectNameSnake %> project.

It exposes the WSGI callable as a module-level variable named ``application``.
"""

from __future__ import absolute_import, unicode_literals

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "<%= projectNameSnake %>.settings")

application = get_wsgi_application()
