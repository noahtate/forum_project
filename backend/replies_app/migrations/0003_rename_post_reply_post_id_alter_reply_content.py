# Generated by Django 4.2.4 on 2023-08-15 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('replies_app', '0002_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reply',
            old_name='post',
            new_name='post_id',
        ),
        migrations.AlterField(
            model_name='reply',
            name='content',
            field=models.TextField(),
        ),
    ]