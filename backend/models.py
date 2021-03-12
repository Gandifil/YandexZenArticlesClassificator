from django.db import models


# Create your models here.
class Keyword(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256)

    class Meta:
        ordering = ['name']


class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256)
    keywords = models.ManyToManyField(Keyword)
    classkey = models.CharField(max_length=256)
    text = models.CharField(max_length=4096)
    middleReadingTime = models.CharField(max_length=4096)
    likeCount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']
