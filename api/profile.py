from flask import json, jsonify, Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import session
import pandas as pd

from __init__ import db
from flask_jwt_extended import jwt_required
from __init__ import store_data_cleaned
from models.modelbase import CartItem, PurchasedItem


# blueprint basically tells that this file is part of the app
profile = Blueprint('profile', __name__)
# it helps in modularizing our app so that all code is not in a single file


@profile.route('/addtocart', methods=["POST"])
@login_required
# @jwt_required()
def addToCart():
    try:
        bookisbn_ = request.get_json().get('isbn')
        bookcount = request.get_json().get('count')
        # checking if the book is in the dataset first
        book = store_data_cleaned[store_data_cleaned['isbn'] == bookisbn_]
        if(not book.empty):
            existingCartItem = CartItem.query.filter_by(
                book_isbn=bookisbn_).first()
            if(existingCartItem):  # if item is in cart, just increment count
                existingCartItem.count = CartItem.count + bookcount
                db.session.commit()
                return jsonify(bookisbn=bookisbn_, count=existingCartItem.count, msg="Updated the cart item"), 200
            # if item not in cart # add it to cart
            cartItem = CartItem(book_isbn=bookisbn_,
                                count=bookcount, user_id=current_user.id)
            db.session.add(cartItem)
            db.session.commit()
            return jsonify(bookisbn=bookisbn_, count=bookcount, msg="Added the cart item"), 200
        raise Exception('Item that you added is not in the dataset')
    except Exception as e:
        print(e)
        return jsonify(msg="Failed to add/update the cart item", errmsg=str(e)), 500


@profile.route('/removefromcart', methods=["POST"])
@login_required
# @jwt_required()
def removefromcart():
    try:
        bookisbn_ = request.get_json().get('isbn')
        bookcount = request.get_json().get('count')
        existingCartItem = CartItem.query.filter_by(
            book_isbn=bookisbn_).first()
        if(existingCartItem):
            db.session.delete(existingCartItem)
            db.session.commit()
            return jsonify(bookisbn=bookisbn_, msg="Deleted the cart item"), 200
        return jsonify(msg="Book is not in the cart"), 200

    except Exception as e:
        print(e)
        return jsonify(msg="Failed to delete cart item", errmsg=str(e)), 500


@profile.route('/cart', methods=["GET"])
@login_required
# @jwt_required()
def getCart():
    try:
        cartdf = pd.DataFrame()
        cartdf.empty
        cart = current_user.cart
        if(cart):
            for cartItem in cart:
                # check if the item in cart is in the csv file.
                book = store_data_cleaned[store_data_cleaned['isbn']
                                          == cartItem.book_isbn]
                # if yes return the full book details
                if(not book.empty):  # always check if the dataframe is empty like this
                    book['cart_id'] = cartItem.cart_id
                    book['count'] = cartItem.count
                    book['date'] = cartItem.date
                    cartdf = cartdf.append(book)
            return cartdf.set_index("cart_id").to_json(orient='index'), 200
        return jsonify(None), 200  # none = null
    except Exception as e:
        print(e)
        return jsonify(msg="Some error occured during getting the cart. Try again.",
                       errmsg=str(e)), 500


@profile.route('/cartcount', methods=["GET"])
@login_required
# @jwt_required()
def getCartCount():
    cartCount = CartItem.query.filter_by(user_id=current_user.id).count()
    return jsonify(count=cartCount), 200


@profile.route('/buybook', methods=["POST"])
@login_required
# @jwt_required()
def buy():
    try:
        requestData = request.get_json()
        bookisbn_ = requestData.get('isbn')
        bookcount = requestData.get('count')
        # check if the item to buy is in the dataset
        bookToBuy = store_data_cleaned[store_data_cleaned["isbn"] == bookisbn_]
        if(not bookToBuy.empty):
            book = PurchasedItem(book_isbn=bookisbn_,
                                 count=bookcount, user_id=current_user.id)
            db.session.add(book)
            db.session.commit()
            return jsonify(msg="Book purchase successful", bookisbn=bookisbn_, count=bookcount), 200
        raise Exception('Item that you added is not in the dataset')
    except Exception as e:
        print(e)
        return jsonify(msg="Some error occured during purchase. Try again.", errmsg=str(e)), 500


@profile.route('/purchasehistory', methods=["GET"])
@login_required
# @jwt_required()
def getPurchaseHistory():
    try:
        purchasedf = pd.DataFrame()
        purchasedf.empty
        purchasedItemsList = current_user.purchased_books
        if(purchasedItemsList):
            for purchasedItem in purchasedItemsList:
                book = store_data_cleaned[store_data_cleaned["isbn"]
                                          == purchasedItem.book_isbn]
                if(not book.empty):
                    book['purchase_id'] = purchasedItem.purchase_id
                    book['count'] = purchasedItem.count
                    book['date'] = purchasedItem.date
                    purchasedf = purchasedf.append(book)
            return purchasedf.set_index("purchase_id").to_json(orient='index'), 200
        return jsonify(None), 200
    except Exception as e:
        print(e)
        return jsonify(msg="Some error occured during getting the purchase history. Try again.",
                       errmsg=str(e)), 500
