from django.shortcuts import render
from .models import Article
from rest_framework import generics

# Create your views here.

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all()