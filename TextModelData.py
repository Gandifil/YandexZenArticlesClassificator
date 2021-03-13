# need for normal work
import os
import re
os.environ['DJANGO_SETTINGS_MODULE'] = 'YandexZenClassificator.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
import sys
from backend.models import Keyword, Article

class TextModelData:
    def __init__(self):
        self.classes = list()
        self.indexes = dict()
        self.train = list()

        
    def harvest(self):
        articles = list(map(lambda x: [x.classkey, x.title + " " + x.text], Article.objects.all()))
        self.classes = list(set(map(lambda x: x[0], articles)))
        self.indexes = {self.classes[i]: i for i in range(len(self.classes))}

        self.train = [[self.indexes[a[0]], a[1]] for a in articles]
        

    def extract(self, n):
        counter = [[i, self.classes[i], 0] for i in range(len(self.classes))]
        
        for classI, text in self.train:
            counter[classI][2] += 1

        counter.sort(key=lambda x: x[2])
        counter = counter[-1:-n:-1]

        # optimize indexes
        transform = {counter[i][0]:i for i in range(len(counter))}
        newIndexes = {x[0] for x in counter}
        self.train = filter(lambda x: x[0] in newIndexes, self.train)
        self.train = [[transform[x[0]], x[1]] for x in self.train]
        self.classes = [counter[i][1] for i in range(len(counter))]
        self.indexes = {counter[i][1]:counter[i][0] for i in range(len(counter))}

    def print(self):
        print("Class's count: ", len(self.classes))
        print("Articles count: ", len(self.train))

        for i in range(len(self.classes)):
            print(i, ": ", self.classes[i])
        print();

        for classI, text in self.train:
            print(classI, ": ", text[:20])


    def __str__(self):
        return "Classes: {}\nTexts: {}\n". \
            format(self.classes, self.train)



n = 10
data = TextModelData()
data.harvest()
data.extract(n)
data.print()


from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, Conv1D, GlobalMaxPooling1D
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras import utils
import numpy as np
import matplotlib.pyplot as plt
import pickle


num_words = 10000
max_news_len = 30
nb_classes = 4

tokenizer = Tokenizer(num_words=num_words)
tokenizer.fit_on_texts([x[1] for x in data.train]) 
print(tokenizer.word_index)

