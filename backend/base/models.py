from django.db import models
import os
import random
from django.core.exceptions import ValidationError

# Create your models here.

def validate_video_file(value):
    allowed_extensions = ['.mp4', '.avi', '.mov', '.mkv', '.flv']
    ext = os.path.splitext(value.name)[1]  # Get the file extension
    if ext.lower() not in allowed_extensions:
        raise ValidationError('Only video files are allowed!')

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

def upload_vid_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "vid/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

class Video(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    vid = models.FileField(upload_to=upload_vid_path, null=True, blank=False,)
    description = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
