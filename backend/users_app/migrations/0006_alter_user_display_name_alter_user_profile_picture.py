# Generated by Django 4.2.4 on 2023-08-22 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_app', '0005_alter_user_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='display_name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.CharField(max_length=255),
        ),
    ]
