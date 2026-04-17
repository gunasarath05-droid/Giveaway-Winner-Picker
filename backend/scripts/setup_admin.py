import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.core.management import call_command

# Run migrations automatically
print("--- Starting Auto-Migrations ---")
try:
    call_command('migrate', interactive=False)
    print("--- Migrations completed successfully ---")
except Exception as e:
    print(f"--- Migration ERROR: {str(e)} ---")

from django.contrib.auth.models import User

username = 'admin'
email = 'admin@example.com'
password = 'admin123'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Superuser '{username}' created successfully.")
else:
    print(f"Superuser '{username}' already exists.")
