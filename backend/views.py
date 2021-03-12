from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from django.core import serializers
from .models import Article
from .models import Keyword
from django.http.response import JsonResponse
import json


#def getAll(id):
#    return JsonResponse([Article.objects.filter(pk=id)[:1].values()], safe=False)

# Create your views here.
class ArticleView(APIView):

    def get(self, request, id):
        if request.method == 'GET':
            articles = list(Article.objects.filter(pk=id).values());
            if articles:
                return JsonResponse(articles[0], safe=False)
            else:
                return HttpResponseNotFound('Article not found')


    def delete(self, request, id):
        if request.method == 'DELETE':
            deletedCount = Article.objects.filter(pk=id).delete()[0];
            if deletedCount > 0:
                return HttpResponse(status=200)
            else:
                return HttpResponseNotFound('Article not found')
            

    def patch(self, request, id):
        if request.method == 'PATCH':
            articles = list(Article.objects.filter(pk=id));
            if articles:
                article = articles[0]
                json_data = json.loads(request.body)
                try:
                    article.title = json_data["title"]
                    article.author = json_data["author"]
                    article.classkey = json_data["classkey"]
                    article.text = json_data["text"]
                    article.middleReadingTime = json_data["middleReadingTime"]
                    article.likeCount = json_data["likeCount"]
                    article.save()
                except KeyError:
                    return HttpResponseServerError("Malformed data")
                return HttpResponse(status=200)
            else:
                return HttpResponseNotFound('Article not found')

class TagsView(APIView):

    def get(self, request):
        if request.method == 'GET':
            keywords = Keyword.objects.all();

            results = list();
            for x in keywords:
                obj = dict()
                ibj["id"] = x.id
                obj["name"] = x.name
                obj["countTags"] = Article.objects.filter(keywords__name=x.name).count()
                obj["countClasskeys"] = Article.objects.filter(classkey=x.name).count()
                results.append(obj)
            return JsonResponse(results, safe=False)

        
class ArticleTagsView(APIView):

    def get(self, request, id):
        if request.method == 'GET':
            keys = Article.objects.get(pk=id).keywords.values();
            return JsonResponse(list(keys), safe=False)


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
