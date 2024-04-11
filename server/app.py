from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import User, Product, Category, Listing, Subscription

app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Import models to create tables
from models import User, Product, Category, Listing, Subscription

# Create tables based on models
db.create_all()

# Seed the database with initial data
from seed import seed_data
seed_data()

# Routes
@app.route('/')
def home():
    return 'Welcome to the BabyShop API!'

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users)

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    serialized_products = [product.serialize() for product in products]
    return jsonify(serialized_products)

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    serialized_categories = [category.serialize() for category in categories]
    return jsonify(serialized_categories)

@app.route('/listings', methods=['GET'])
def get_listings():
    listings = Listing.query.all()
    serialized_listings = [listing.serialize() for listing in listings]
    return jsonify(serialized_listings)

@app.route('/subscriptions', methods=['GET'])
def get_subscriptions():
    subscriptions = Subscription.query.all()
    serialized_subscriptions = [subscription.serialize() for subscription in subscriptions]
    return jsonify(serialized_subscriptions)

if __name__ == '__main__':
    app.run(debug=True)
