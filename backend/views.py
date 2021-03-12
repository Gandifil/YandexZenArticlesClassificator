from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.core import serializers
from .models import Article
from django.http.response import JsonResponse
import json


#def getAll(id):
#    return JsonResponse([Article.objects.filter(pk=id)[:1].values()], safe=False)

# Create your views here.
class ArticleView(APIView):

    def get(self, request, id):
        if request.method == 'GET':
            articles = Article.objects.filter(pk=id).values();
            return JsonResponse(list(articles)[0], safe=False)

# Create your views here.
class ArticlesView(APIView):
    """API endpoint /api/model/ для обработки запросов на определение класса для передаваемого текста"""

    def get(self, request):
        if request.method == 'GET':
            title = request.GET.get('title', '')
            author = request.GET.get('author', '')
            tag = request.GET.get('tag', '')
            articles = Article.objects.all()
            if title is not '':
                articles = articles.filter(title__icontains=title)
            if author is not '':
                articles = articles.filter(author__icontains=author)
            if tag is not '':
                articles = articles.filter(keywords__name__icontains=tag)
            ##serialized_queryset = serializers.serialize('json', articles)
            return JsonResponse(list(articles[:10].values()), safe=False)
