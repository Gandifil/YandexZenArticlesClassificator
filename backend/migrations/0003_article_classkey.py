# Generated by Django 3.1.7 on 2021-03-12 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20210312_1349'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='classkey',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
    ]
