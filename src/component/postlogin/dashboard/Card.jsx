import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './dashboard.css';

const ProductCard = ({ image, title, category, price, quantity, updateQuantity }) => {
    const [addedToCart, setAddedToCart] = useState(false); // Track if the product is added to the cart

    const handleIncrease = () => {
        updateQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            if (quantity === 1) {
                handleRemoveFromCart()
            }
            updateQuantity(quantity - 1);
        }

    };

    const handleAddToCart = () => {
        setAddedToCart(true); // Show quantity controls after adding to cart
        handleIncrease()
    };

    const handleRemoveFromCart = () => {
        setAddedToCart(false); // Show "Add to Cart" button again
        updateQuantity(0); // Reset the quantity when removed
    };

    return (
        <Card className="product-card m-3">
            <div className="image-container">
                <Card.Img
                    variant="top"
                    src={image}
                    alt="Product Image"
                    className="card-img"
                />
            </div>
            <Card.Body>
                <Card.Title id="card-product-title" title={title}>{title}</Card.Title>
                <Card.Text id="card-brand" className='my-1'>{category}</Card.Text>
                <div className='d-flex justify-content-between align-items-center'>
                    <Card.Text id="card-price" className='m-0'>INR {price}</Card.Text>

                    {/* Show Add to Cart Button or Quantity Controls */}
                    {!addedToCart ? (
                        <Button className='border-radius button-active' onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                    ) : (
                        <div className="quantity-controls">
                            <Button className=' button-active' onClick={handleDecrease} disabled={quantity === 0}>
                               <span className='mx-1'>-</span>
                            </Button>
                            <span className="quantity mx-2">{quantity}</span>
                            <Button className=' button-active' onClick={handleIncrease}>
                            <span className='mx-1'>+</span>
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
