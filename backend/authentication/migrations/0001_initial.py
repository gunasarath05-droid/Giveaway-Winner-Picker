from django.db import migrations, models
import django.db.models.deletion
import django_mongodb_backend.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', django_mongodb_backend.fields.ObjectIdAutoField(primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='superuser status')),
                ('username', models.CharField(max_length=150, unique=True, verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, verbose_name='active')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='InstagramProfile',
            fields=[
                ('id', django_mongodb_backend.fields.ObjectIdAutoField(primary_key=True, serialize=False)),
                ('instagram_user_id', models.CharField(max_length=255, unique=True)),
                ('username', models.CharField(max_length=255)),
                ('access_token', models.TextField()),
                ('profile_picture_url', models.URLField(blank=True, max_length=500, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='instagram_profile',
                    to='authentication.user',
                )),
            ],
        ),
    ]
