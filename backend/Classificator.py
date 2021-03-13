import pickle
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, MaxPooling1D, Conv1D, GlobalMaxPooling1D, Dropout, LSTM, GRU
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras import utils
import numpy as np

num_words = 10000
max_news_len = 40
model_cnn_save_path = 'model_cnn.h5'
token_file = 'tokenizer.pickle'
class_file = 'classes.txt'

class Classificator():
    def __init__(self):
        # loading token
        with open(token_file, 'rb') as handle:
            self.tokenizer = pickle.load(handle)

        self.classes = []
        with open(class_file, 'r') as f:
            self.classes = f.readlines()
        self.n = len(self.classes)


    def getTextClass(self, text):
        model = Sequential()
        model.add(Embedding(num_words, 32, input_length=max_news_len))
        model.add(Conv1D(512, 5, padding='valid', activation='relu'))
        model.add(GlobalMaxPooling1D())
        model.add(Dense(512, activation='relu'))
        model.add(Dense(self.n, activation='softmax'))
        model.compile(optimizer='adam',
                      loss='categorical_crossentropy',
                      metrics=['accuracy'])

        model.load_weights(model_cnn_save_path)

        inputSequence = self.tokenizer.texts_to_sequences([text])
        prepSequence = pad_sequences(inputSequence, maxlen=max_news_len)
        prediction = model.predict(prepSequence)
        return self.classes[np.argmax(prediction)]

