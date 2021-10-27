from flask import Flask, request, json, jsonify
import pandas as pd
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recommendation.db'
db = SQLAlchemy(app)


class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60))

    def __repr__(self):
        return f"History('{self.id}', '{self.title}')"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(60))
    email = db.Column(db.String(60))
    password = db.Column(db.String(60))

    def __repr__(self):
        return f"User('{self.id}', '{self.fullname}','{self.email}','{self.password}')"


def getData():
    data = pd.read_csv('Dataset.csv')
    data = data.head(5)
    return data


@app.route('/msg')
def get_msg():
    return {"hello": "world"}


@app.route('/getbooklist')
def getbooklist():
    # store_data = pd.read_csv('Dataset.csv')
    # store_data = store_data.head(2)
    store_data = getData()
    json_data = store_data.to_json(orient='index')
    return json_data


@app.route('/searchbook', methods=["POST"])
def searchbook():
    request_data = request.get_json()
    new_record = History(title=request_data['content'])
    db.session.add(new_record)
    db.session.commit()
    return request_data


@app.route('/registeruser', methods=["POST"])
def registeruser():
    request_data = request.get_json()
    new_record = User(fullname=request_data['name'],
                      email=request_data['email'], password=request_data['password'])
    db.session.add(new_record)
    db.session.commit()
    return request_data


# @app.route('/loginuser', methods=["POST"])
# def loginuser():
#     request_data = request.get_json()
#     new_record = User.query.filter_by(email=request_data['email']).first_or_404(
#         description='There is no data with {}'.format(request_data['email']))
#     # db.session.add(new_record)
#     # db.session.commit()
#     return {"result": new_record}
