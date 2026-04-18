from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField'
    name = 'authentication'

    def ready(self):
        # Disconnect the create_permissions signal because it is incompatible
        # with MongoDB ObjectId primary keys — it tries to put ContentType
        # instances into a set() before they have a PK assigned.
        from django.db.models.signals import post_migrate
        try:
            from django.contrib.auth.management import create_permissions
            post_migrate.disconnect(
                create_permissions,
                dispatch_uid='django.contrib.auth.management.create_permissions',
            )
        except ImportError:
            pass
