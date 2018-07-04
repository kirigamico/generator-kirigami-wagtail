from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from apps.search import views as search_views

urlpatterns = [
    url(r'^django-admin/', admin.site.urls),
    url(r'^admin/', include('wagtail.admin.urls')),

    url(r'^search/$', search_views.search, name='search'),

    url(r'^documents/', include('wagtail.documents.urls')),
    url(r'', include('wagtail.core.urls')),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
