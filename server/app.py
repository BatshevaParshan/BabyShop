from flask import Flask, jsonify, request
# from werkzeug.security import generate_password_hash, check_password_hash
from config import app, db
from models import User, Product, Category

# # Define your models (Product, Category, Listing, User) - replace with actual models
# class Product(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     price = db.Column(db.Float, nullable=False)
#     image_url = db.Column(db.String(200), nullable=True)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'description': self.description,
#             'price': self.price,
#             'image_url': self.image_url
#         }

# class Category(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'name': self.name
#         }

# class Listing(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
#     seller_id = db.Column(db.Integer, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     condition = db.Column(db.String(50), nullable=True)
#     image_url = db.Column(db.String(200), nullable=True)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'product_id': self.product_id,
#             'seller_id': self.seller_id,
#             'price': self.price,
#             'condition': self.condition,
#             'image_url': self.image_url
#         }

# Your existing route definitions
@app.route('/')
def index():
    return '<h1>Welcome to Your Flask App</h1>'

# Route to add a baby product
@app.route('/add-product', methods=['POST'])
def add_product():
    try:
        data = request.json
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image_url=data['image_url']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Baby product added successfully', 'product': new_product.serialize()}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get details of a specific baby product
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.serialize()), 200
    else:
        return jsonify({'message': 'Product not found'}), 404

# Route to get all baby products
@app.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    serialized_products = [product.serialize() for product in products]
    return jsonify(serialized_products), 200

# Route to add a category for baby products
@app.route('/add-category', methods=['POST'])
def add_category():
    try:
        data = request.json
        new_category = Category(name=data['name'])
        db.session.add(new_category)
        db.session.commit()
        return jsonify({'message': 'Category added successfully', 'category': new_category.serialize()}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get all categories for baby products
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    serialized_categories = [category.serialize() for category in categories]
    return jsonify(serialized_categories), 200

# Route to create a listing for a baby product
@app.route('/create-listing', methods=['POST'])
def create_listing():
    try:
        data = request.json
        new_listing = Listing(
            product_id=data['product_id'],
            seller_id=data['seller_id'],
            price=data['price'],
            condition=data['condition'],
            image_url=data['image_url']
        )
        db.session.add(new_listing)
        db.session.commit()
        return jsonify({'message': 'Listing created successfully', 'listing': new_listing.serialize()}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
