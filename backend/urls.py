from django.urls import path
from . import views

urlpatterns = [
    path('articles', views.ArticlesView.as_view()),
    path('article/<int:id>', views.ArticleView.as_view()),
]