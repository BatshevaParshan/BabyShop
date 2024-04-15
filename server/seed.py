from flask import Flask
from config import db
from models import User, Product, Category, Listing, Subscription

def seed_data():
    # Create a new Flask app instance
    app = Flask(__name__)

    # Initialize SQLAlchemy with the app context
    db.init_app(app)

    # Create dummy user data
    with app.app_context():
        user1 = User(username='john_doe', email='john@example.com', password='password123')
        user2 = User(username='jane_smith', email='jane@example.com', password='abc456')

        # Create dummy category data
        category1 = Category(name='Car Seats')
        category2 = Category(name='Strollers')
        category3 = Category(name='Bassinets')

        # Create dummy product data
        product1 = Product(name='Convertible Car Seat', description='Safe and comfortable car seat for infants and toddlers.', price=149.99, image_url='path_to_image1.jpg', category=category1)
        product2 = Product(name='Lightweight Stroller', description='Easy-to-use stroller for everyday use.', price=99.99, image_url='path_to_image2.jpg', category=category2)
        product3 = Product(name='Portable Bassinet', description='Compact and portable bassinet for travel.', price=79.99, image_url='path_to_image3.jpg', category=category3)

        # Create dummy listing data
        listing1 = Listing(product=product1, seller=user1, price=139.99, condition='Like new', image_url='path_to_listing_image1.jpg')
        listing2 = Listing(product=product2, seller=user2, price=89.99, condition='Used', image_url='path_to_listing_image2.jpg')
        listing3 = Listing(product=product3, seller=user1, price=74.99, condition='Good condition', image_url='path_to_listing_image3.jpg')

        # Create dummy subscription data
        subscription1 = Subscription(user=user1)
        subscription2 = Subscription(user=user2)

        # Add objects to the session and commit to the database
        db.session.add_all([user1, user2, category1, category2, category3, product1, product2, product3, listing1, listing2, listing3, subscription1, subscription2])
        db.session.commit()

if __name__ == '__main__':
    seed_data()
