# Generated by Django 4.2.4 on 2023-08-21 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_app', '0003_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='display_name',
            field=models.CharField(default=1, unique=True),
            preserve_default=False,
        ),
    ]
