# Generated by Django 4.1.1 on 2022-12-10 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='user',
            field=models.TextField(),
        ),
    ]
