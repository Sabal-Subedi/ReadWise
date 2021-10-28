from io import StringIO
from os import path
import pandas as pd
from flask import Flask, request, json, jsonify, Blueprint
from flask.wrappers import Request, Response
import operator
books = Blueprint('books', __name__) #blueprint basically tells that this file is part of the app
#it helps in modularizing our app so that all code is not in a single file ok
from __init__ import store_data_uncleaned

@books.route('/gettopbooks',methods=["GET"])
def gettopbooks():
    try: 
        count = request.args.get('count')
        store_data = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"])    
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
@books.route('/getmostpopular',methods=["GET"])
def getmostpopular():
    try: 
        count = request.args.get('count')
        store_data = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"])    
        book_sorted_ranking=store_data.sort_values("book_rating_count",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("book_rating_count").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
@books.route('/gettopfiction',methods=["GET"])
def gettopfiction():
    try: 
        count = request.args.get('count')
        store_data_pre = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"]) 
        store_data = store_data_pre[store_data_pre['genre'].str.contains('fiction|fantasy|magic', case=False, regex=True)]
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
    
@books.route('/gettopromance',methods=["GET"])
def gettopromance():
    try: 
        count = request.args.get('count')
        store_data_pre = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"]) 
        store_data = store_data_pre[store_data_pre['genre'].str.contains('love|romance|adult', case=False, regex=True)]
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
    
@books.route('/gettophorror',methods=["GET"])
def gettophorror():
    try: 
        count = request.args.get('count')
        store_data_pre = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"]) 
        store_data = store_data_pre[store_data_pre['genre'].str.contains('ghost|horror|paranormal|apocalyptic', case=False, regex=True)]
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
    
@books.route('/gettopmystery',methods=["GET"])
def gettopmystery():
    try: 
        count = request.args.get('count')
        store_data_pre = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"]) 
        store_data = store_data_pre[store_data_pre['genre'].str.contains('mystery|puzzle|secret|enigma|riddle', case=False, regex=True)]
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
@books.route('/gettopthriller',methods=["GET"])
def gettopthriller():
    try: 
        count = request.args.get('count')
        store_data_pre = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"]) 
        store_data = store_data_pre[store_data_pre['genre'].str.contains('thriller', case=False, regex=True)]
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
@books.route('/gettopscifi',methods=["GET"])
def gettopscifi():
    try: 
        count = request.args.get('count')
        store_data_pre = store_data_uncleaned.dropna().drop(columns=["book_edition","book_review_count","book_format"]) 
        store_data = store_data_pre[store_data_pre['genre'].str.contains('science|Post Apocalyptic|Steampunk|Dystopia|time travel', case=False, regex=True)]
        R = store_data["rating"]
        v=store_data["book_rating_count"]
    
        #calculate average rating for the books
        C = store_data["rating"].mean() 
 
        #min no. of votes required for the books
        m = store_data["book_rating_count"].quantile(0.70)
        print(m)

        #use the formula
        store_data["weighted_average"]=((R*v)+ (C*m))/(v+m)
        book_sorted_ranking=store_data.sort_values("weighted_average",ascending=False).head(int(count))
    
        print(book_sorted_ranking)
    
        return book_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg = "Some error with the server", errmsg = str(e)), 500
    
