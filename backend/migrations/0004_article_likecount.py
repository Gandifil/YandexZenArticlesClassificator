# Generated by Django 3.1.7 on 2021-03-12 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_article_classkey'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='likeCount',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
