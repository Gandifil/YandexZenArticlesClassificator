from datetime import datetime

from bs4 import BeautifulSoup, CData
from lxml import etree
# need for normal work
import os
import re
os.environ['DJANGO_SETTINGS_MODULE'] = 'YandexZenClassificator.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

import sys
from backend.models import Keyword, Article

def parseCDATA(str):
    return re.sub('(\<\!\[CDATA\[)|(\]\]\>)', '', str).replace('\n ', '').strip()

class ArticleW:
    def __init__(self, doc):
        soup = BeautifulSoup(doc, 'lxml')
        self.title = parseCDATA(soup.doc.title.text)
        self.author = parseCDATA(soup.doc.author.string)
        self.likeCount = int(soup.doc.likecount.string)
        self.middleReadingTime = parseCDATA(soup.doc.middlereadingtime.string)
        self.text = parseCDATA(soup.findChild('text').text)
        self.keywords = list(map(lambda x: parseCDATA(x.text), soup.find_all("keyword")))
        self.mainKeyword = self.keywords[0] if self.keywords else ""

    @classmethod
    def fromFile(cls, filepath):
        """Initialize article from a file (which read by filepath)"""
        print("Try parse ", filepath)
        return cls(open(filepath, "r", encoding="utf8").read())

    def __str__(self):
        return "Title: {}\nAuthor: {}\nLikeCount: {}\nMiddleReadingTime: {}\nKeywords: {}\nText: {}\n". \
            format(self.title, self.author, self.likeCount, self.middleReadingTime, self.keywords, self.text)



print("Working directory: ", os.getcwd())
# reading articles from data folder
articleWs = list()
for root, directories, files in os.walk('data'):
    for file in files:
        if file.endswith('.xml'):
            article = ArticleW.fromFile(os.path.join(root, file))
            articleWs.append(article)
            print(article.keywords)

print("Найденные тэги:")
tags = set().union(*map(lambda x: x.keywords, articleWs))
print(tags)
print("Найденные подразделы:")
classkeys = set().union(map(lambda x: x.mainKeyword, articleWs))
print(classkeys)


print("Очищаем базу данных...")
Article.objects.all().delete()
Keyword.objects.all().delete()

print("Вносим новые тэги...")
keyDict = dict()
for x in tags:
    k = Keyword(name=x)
    k.save()
    keyDict[x] = k

print("Вносим новые статьи...")
for article in articleWs:
    item = Article(title= article.title,
                   author=article.author,
                   classkey=article.mainKeyword,
                   text=article.text,
                   middleReadingTime=article.middleReadingTime,
                   likeCount=article.likeCount,
                   created_at=datetime.today())
    item.save()
    item.keywords.add(*map(lambda key: keyDict[key], article.keywords))
#articles = Article.objects.all()
#print(articles.first())
exit()

