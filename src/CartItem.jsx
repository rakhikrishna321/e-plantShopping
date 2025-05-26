import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.cost.substring(1));
            return total + (price * item.quantity);
        }, 0);
    };

    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (itemName) => {
        dispatch(removeItem(itemName));
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.name} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Unit Price: {item.cost}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                    </div>
                                    <p>Subtotal: ${calculateTotalCost(item)}</p>
                                    <button 
                                        className="remove-button"
                                        onClick={() => handleRemove(item.name)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ${calculateTotalAmount().toFixed(2)}</h3>
                        <div className="cart-buttons">
                            <button onClick={onContinueShopping}>Continue Shopping</button>
                            <button onClick={handleCheckoutShopping}>Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;

