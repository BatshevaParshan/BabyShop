from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Product, Category
from config import app,db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Your existing route definitions
@app.route('/')
def index():
    return '<h1>Welcome to Your Flask App</h1>'

cart_items = {}

@app.route('/add-to-cart/<int:itemId>', methods=['POST'])
def add_to_cart(itemId):
    data = request.json
    quantity = data.get('quantity', 1)

    # Check if the item already exists in the cart
    if itemId in cart_items:
        # If the item already exists, increment the quantity
        cart_items[itemId]['quantity'] += quantity
    else:
        # If the item doesn't exist, add it to the cart
        product = Product.query.get(itemId)
        if product:
            cart_items[itemId] = {
                'product': product.serialize(),
                'quantity': quantity
            }
        else:
            return jsonify({'message': 'Product not found', 'ok': False}), 404

    return jsonify({'message': 'Item added to cart', 'cartItem': cart_items[itemId], 'ok': True}), 200

@app.route('/api/cart/items/count', methods=['GET'])
def get_cart_item_count():
    try:
        # Fetch the cart items from the session
        cart_items = session.get('cart_items', [])
        print('Cart items:', cart_items)  # Log the cart items

        # Calculate the total count of items in the cart
        total_item_count = sum(item['quantity'] for item in cart_items)
        return jsonify({'count': total_item_count}), 200
    except Exception as e:
        print('Error:', e)  # Log the error message
        return jsonify({'error': str(e)}), 500

@app.route('/remove-from-cart/<int:itemId>', methods=['DELETE'])
def remove_from_cart(itemId):
    # Remove the item if it exists, otherwise do nothing
    cart_items.pop(itemId, None)
    return jsonify({'message': 'Item removed from cart', 'ok': True}), 200

@app.route('/update-cart/<int:itemId>', methods=['PATCH'])
def update_cart_item(itemId):
    data = request.json
    new_quantity = data.get('quantity')

    if itemId in cart_items:
        # Update the quantity of the item if it exists in the cart
        cart_items[itemId]['quantity'] = new_quantity
        return jsonify({'message': 'Cart item updated', 'updatedItem': cart_items[itemId], 'ok': True}), 200
    else:
        # If the item doesn't exist, notify the client but do not treat as an error
        return jsonify({'message': 'Item not found in cart, no update performed', 'ok': True}), 200 

    
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        new_user = User(
            username = data["username"],
            email = data["email"],
            password = generate_password_hash(data["password"]),
            role = data["role"]
        )
        db.session.add(new_user)
        db.session.commit()
        user_token = create_access_token(identity=data["username"])
        return jsonify({'message': 'New User Created Successfully', 'user_token': user_token, 'user': new_user.serialize(), 'ok': True}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'ok': False}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({'message': 'Incorrect username', 'ok': False}), 200

        if check_password_hash(user.password, password):
            user_token = create_access_token(identity=user.username)
            return jsonify({'message': 'Login Successful', 'user_token': user_token, "user": user.serialize(), 'ok': True}), 200
        else:
            return jsonify({'message': 'Incorrect password', 'ok': False}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'ok': False}), 500

# Route to add a baby product
@app.route('/add-product', methods=['POST'])
@jwt_required()
def add_product():
    try:
        data = request.form

        # Extract the image URL from the form data
        image_url = data.get('image_url', '')

        # Create a new product instance
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image_url=image_url  # Assign the image URL directly to the product
        )

        # Authenticate user based on JWT token
        username = get_jwt_identity()
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "Unauthorized for this operation", "ok": False}), 401

        # Add the new product to the database
        db.session.add(new_product)
        db.session.commit()

        # Return success response with serialized product data
        return jsonify({
            'message': 'Product added successfully',
            'product': new_product.serialize(),
            'ok': True
        }), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Route to get details of a specific baby product
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.serialize()), 200
    else:
        return jsonify({'message': 'Product not found'}), 404
    
@app.route('/delete-product/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    try:
        # Retrieve the product from the database
        product = Product.query.get(product_id)
        
        # Check if the product exists
        if not product:
            return jsonify({'message': 'Product not found', 'ok': False}), 404
        
        # Check if the authenticated user has permission to delete the product
        username = get_jwt_identity()
        user = User.query.filter_by(username=username).first()
        if not user or not user.is_admin:  # Assuming you have an 'is_admin' attribute on your User model
            return jsonify({'message': 'Unauthorized for this operation', 'ok': False}), 403
        
        # Delete the product
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully', 'ok': True}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'ok': False}), 500


# Route to get all baby products
@app.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    serialized_products = [product.serialize() for product in products]
    return jsonify({"products": serialized_products}), 200

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