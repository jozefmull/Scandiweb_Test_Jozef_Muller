import React, { Component } from 'react'
import { GlobalContext } from '../../../context/GlobalState'
import { Link } from 'react-router-dom'

import { getCartTotal } from '../../../Helpers/Helpers'

import MiniCartItems from './MiniCartItems'

import Cart from '../../../assets/images/cart.png'

import styles from '../../../css/MiniCart.module.css'

export default class MiniCart extends Component {
    static contextType = GlobalContext
    
    handleopenMiniCart(){
        this.context.setOverlayDisplay(!this.context.miniCartOpen)
    }

  render() {
    // get values from context
    const {miniCartOpen, cartItems, selectedCurrency} = this.context
    //get total and cartCount from helper function
    const {total , cartCount} = getCartTotal(cartItems, selectedCurrency)

    return (
      <div className={styles.cartIconHeader} >
        <img src={Cart} alt="cart-icon" onClick={() => this.handleopenMiniCart()} draggable="false"/>
        {cartItems.length > 0 ? (
          <span className={styles.cartBadge}>{cartCount}</span>
        ) : null}
        {miniCartOpen ? (
            <div className={styles.miniCart}>
              <h3>My bag, <span>{cartCount} items</span></h3>
              {!cartItems.length > 0 ? 'Please add some products to your bag' : (
                <>
                  <div className={styles.itemsWrap}>
                    <ul>
                      {cartItems?.map((cartItem, id) => (
                        <MiniCartItems key={`${cartItem.name}-${id}`} cartItem={cartItem} selectedCurrency={selectedCurrency}/>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.total}>
                    <h3>Total</h3>
                    <h3>{selectedCurrency.symbol} {total}</h3>
                  </div>
                  <div className={styles.buttons}>
                    <Link to='/cart' className={styles.bag} onClick={() => this.handleopenMiniCart()}>VIEW BAG</Link>
                    <Link to='/checkout' className={styles.checkout} onClick={() => this.handleopenMiniCart()}>CHECKOUT</Link>
                  </div>
                </> 
              )}
            </div>
            ) : null}
      </div>
    )
  }
}
