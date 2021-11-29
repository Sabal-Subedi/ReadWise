import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer


# it helps in modularizing our app so that all code is not in a single file ok
from __init__ import store_data_uncleaned

df = store_data_uncleaned


df['isbn'] = range(0, 1152)  # yo 1152 vnya xai number of available data
df.head(3)

columns = ['author', 'genre', 'title']


def get_important_features(data):
    important_features = []
    for i in range(0, data.shape[0]):
        important_features.append(
            str(data['author'][i]) + str(data['genre'][i])+''+str(data['title'][i]))
    return important_features


df['important_features'] = get_important_features(df)
cm = CountVectorizer().fit_transform(df['important_features'])

# Get the cosine similarity matrix from the count matrix
cs = cosine_similarity(cm)
# print the cosine similarity matrix
# print(cs)

# get the title of the book
title = 'The Maze Runner'
# find the matrices
isbn = df[df.title == title]['isbn'].values[0]

scores = list(enumerate(cs[isbn]))
sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
sorted_scores = sorted_scores[1:]
print(sorted_scores)

j = 0
print('the 7 most similar to', title, 'are:\n')
for item in sorted_scores:
    title = df[df.isbn == item[0]]['title'].values[0]
    print(j+1, title)
    j = j+1
    if j > 6:
        break
