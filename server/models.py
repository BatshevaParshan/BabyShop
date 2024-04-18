from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, Table, LargeBinary
from sqlalchemy.orm import relationship
from config import db
from sqlalchemy_serializer import SerializerMixin
import base64

# Association table for many-to-many relationship
user_product_association = Table(
    'user_product_association',
    db.Model.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('product_id', Integer, ForeignKey('products.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    role = Column(String(20), default='user', nullable=False)

    listings = relationship("Listing", back_populates="seller")
    subscriptions = relationship("Subscription", back_populates="user")
    favorite_products = relationship("Product", secondary=user_product_association, backref="favorited_by")

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'role': self.role
        }
    
    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email})>"

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    image_url = db.Column(db.String(255), default=None)  # Allow image_url to be None (optional)

    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    category = relationship("Category", back_populates="products")

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url  # Return image_url in serialization
        }

    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, price={self.price})>"

class Category(db.Model,SerializerMixin):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False, unique=True)

    products = relationship("Product", back_populates="category")

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

    def __repr__(self):
        return f"<Category(id={self.id}, name={self.name})>"

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    seller_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    price = Column(Float, nullable=False)
    condition = Column(String(50), nullable=True)
    image_url = Column(String(255), nullable=True)

    product = relationship("Product")
    seller = relationship("User", back_populates="listings")

    def serialize(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'seller_id': self.seller_id,
            'price': self.price,
            'condition': self.condition,
            'image_url': self.image_url
        }

    def __repr__(self):
        return f"<Listing(id={self.id}, product_id={self.product_id}, seller_id={self.seller_id})>"

class Subscription(db.Model,SerializerMixin):
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    subscribed_at = Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    user = relationship("User", back_populates="subscriptions")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subscribed_at': self.subscribed_at
        }

    def __repr__(self):
        return f"<Subscription(id={self.id}, user_id={self.user_id}, subscribed_at={self.subscribed_at})>"
