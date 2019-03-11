from django.conf import settings


def global_vars(request):
    return {
        'GTAG_TRACKING_ID': getattr(settings, 'GTAG_TRACKING_ID', None),
    }
