# Generated by Django 4.2.4 on 2023-08-15 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts_app', '0003_rename_topic_post_topic_id_alter_post_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.CharField(default='default_title', max_length=255),
            preserve_default=False,
        ),
    ]
