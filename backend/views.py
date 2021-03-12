from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.core import serializers
from .models import Article
from django.http.response import JsonResponse
import json

# Create your views here.
class ArticleView(APIView):
    """API endpoint /api/model/ для обработки запросов на определение класса для передаваемого текста"""

    def get(self, request):
        if request.method == 'GET':
            title = request.GET.get('title', '')
            author = request.GET.get('author', '')
            tag = request.GET.get('tag', '')
            articles = Article.objects.all()
            if title is not '':
                articles = articles.filter(title).filter(title__contains=title)
            ##serialized_queryset = serializers.serialize('json', articles)
            return JsonResponse(list(articles[:10].values()), safe=False)
