from django.urls import path
from . import views

urlpatterns = [
    path('articles', views.ArticlesView.as_view()),
    path('article/<int:id>', views.ArticleView.as_view()),
    path('article/<int:id>/tags', views.ArticleTagsView.as_view()),
    path('tags', views.TagsView.as_view()),
]