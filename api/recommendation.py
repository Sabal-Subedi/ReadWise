import pandas as pd
import numpy as np
from flask import json, jsonify
from flask import json, jsonify, Blueprint, request
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer


# blueprint basically tells that this file is part of the app
recommendation = Blueprint('recommendation', __name__)
# it helps in modularizing our app so that all code is not in a single file


df = pd.read_csv('./api/Dataset.csv', error_bad_lines=False)
df['isbn'] = range(0, 9635)  # yo 9635 vnya xai number of available data
df.head(3)


def get_important_features(data):
    important_features = []
    for i in range(0, data.shape[0]):
        important_features.append(
            str(data['author'][i]) + str(data['genre'][i])+''+str(data['title'][i]))
    return important_features


@recommendation.route('/getrecommendation', methods=["POST"])
def getrecommendation():
    try:
        isbn_list = []
        recommend_list = pd.DataFrame()
        recommend_list.empty

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

        j = 0
        print('the 7 most similar to', title, 'are:\n')
        for item in sorted_scores:
            title = df[df.isbn == item[0]]['title'].values[0]
            print(j+1, title)
            isbn_list.append(item[0])
            j = j+1
            if j > 6:
                break

        for i in range(0, len(isbn_list)):
            recommend_list = recommend_list.append(
                df[df["isbn"] == isbn_list[i]])

        print(recommend_list)

        return recommend_list.to_json(orient='index'), 200

    except Exception as e:
        print(e)
        return jsonify(msg="Some error occured during getting the cart. Try again.",
                       errmsg=str(e)), 500


# getrecommendation()
