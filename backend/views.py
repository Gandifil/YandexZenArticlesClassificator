from django.shortcuts import render
from rest_framework.views import APIView

from .models import Article
from rest_framework import generics

# Create your views here.
class ArticleView(APIView):
    """API endpoint /api/model/ для обработки запросов на определение класса для передаваемого текста"""

    def get(self, request):
        if request.method == 'GET':
            title = request.GET.get('title', '')
            author = request.GET.get('author', '')
            tag = request.GET.get('tag', '')
            articles = Article.objects
            if title is not '':
                articles = articles.filter(title).filter(title__contains=title)
            return articles.all()
