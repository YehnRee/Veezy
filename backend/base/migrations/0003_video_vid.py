# Generated by Django 5.1.5 on 2025-03-04 10:59

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_video_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='vid',
            field=models.FileField(blank=True, null=True, upload_to=base.models.upload_vid_path),
        ),
    ]
