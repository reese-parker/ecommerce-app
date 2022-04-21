import {useState} from 'react'
import { commerce } from "../lib/commerce";


export default function useManageCart() {
 
    const [cart, setCart] = useState({});

    // Fetch data from commerce.js
  
    const fetchCart = async () => {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    };
  
    // Functions for updating commerce.js data
  
    const handleAddToCart = async (productId, quantity, size) => {

      const { cart } = await commerce.cart.add(productId, quantity, size );
      setCart(cart);
    };
  
    const handleUpdateCartQuantity = async (productId, quantity) => {
      const { cart } = await commerce.cart.update(productId, { quantity });
      setCart(cart);
    };
  
    const handleRemoveFromCart = async (productId) => {
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
    };
  
    const handleEmptyCart = async () => {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    };
  
    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();
      setCart(newCart);
    };

    return [cart, fetchCart, handleAddToCart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart, refreshCart]


}
