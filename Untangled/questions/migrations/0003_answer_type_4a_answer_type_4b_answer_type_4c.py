# Generated by Django 4.1.1 on 2022-11-27 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_remove_answer_correct_answer_type_1a_answer_type_1b_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='Type_4A',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='answer',
            name='Type_4B',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='answer',
            name='Type_4C',
            field=models.BooleanField(default=False),
        ),
    ]
