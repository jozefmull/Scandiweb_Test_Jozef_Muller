import React, { Component } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'

import { getCartTotal } from '../Helpers/Helpers'

import CartItems from '../components/Cart/CartItems'
import ErrorMessage from '../components/Messages_Loaders/ErrorMessage'
import InfoMessage from '../components/Messages_Loaders/InfoMessage'
import Loader from '../components/Messages_Loaders/Loader'

import styles from '../css/Cart.module.css'

export default class Cart extends Component {
  static contextType = GlobalContext

  render() {
    // get values from context
    const {cartItems, selectedCurrency, loading, error} = this.context
    // get cart total with helper function
    const {quantities, total, tax} = getCartTotal(cartItems, selectedCurrency)
    
    // if we are loading display loader
    if (loading) {
      return (
        <section className={styles.cart}>
          <Loader/>
        </section>
      )
    }
    // if there is an error dispaly error
    if (error) {
      return (
        <section className={styles.cart}>
          <ErrorMessage error={error.message} />
        </section>
      )
    }
    // if everything is alright return category page
    return (
      <section className={styles.cart}>
        <h1>CART</h1>
        {/* if we have cart items displaly cart page layout */}
        {cartItems?.length > 0 ? (
          <>
            <div className={styles.productsWrapper}>
            <ul>
              {cartItems?.map((cartItem, id) => (
                <CartItems key={`${cartItem.name}-${id}`} cartItem={cartItem} selectedCurrency={selectedCurrency}/>
              ))}
            </ul>
            </div>
            <div className={styles.cartSummary}>
              <h3><span>Tax 21%: </span>{selectedCurrency.symbol} {tax}</h3>
              <h3><span>Quantity: </span>{quantities}</h3>
              <h3><span>Total: </span>{selectedCurrency.symbol} {total}</h3>
              <Link to='/checkout'>ORDER</Link>
            </div>
          </>
        ) : 
        // else if cart is empty display empty cart with message and link to shop
        (
          <div className={styles.emptyCart}>
            <InfoMessage message={'Your cart is empty'} />
            <Link to='/'>BACK TO SHOP</Link>
          </div>
        )}
      </section>
    )
  }
}
