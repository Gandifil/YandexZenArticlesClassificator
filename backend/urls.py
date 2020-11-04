from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.ArticleListCreate.as_view()),
]