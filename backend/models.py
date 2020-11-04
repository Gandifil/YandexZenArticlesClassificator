from django.db import models

# Create your models here.
class Keywords(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256)

    class Meta:
        ordering = ['name']


class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256)
    keywords = models.ManyToManyField(Keywords)
    text = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']