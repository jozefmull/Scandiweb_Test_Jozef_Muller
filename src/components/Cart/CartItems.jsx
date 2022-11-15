import React, { Component } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { Link } from 'react-router-dom'

import { getProductPrice } from '../../Helpers/Helpers'

import AttributeCartValues from '../Cart/AttributesCart/AttributeCartValues'

import styles from '../../css/Cart.module.css'
import ImageSlider from './ImageSlider'

export default class CartItems extends Component {
    static contextType = GlobalContext

  render() {
    // get values from props and context
    const {decrementCartItemQty, incrementCartItemQty} = this.context
    const {cartItem, selectedCurrency} = this.props
    // desctructre item
    const {prices, name, gallery, qty, brand, attributes, selectedAttributes, id} = cartItem
    // get item price in selected currency
    const itemPrice = getProductPrice(prices, selectedCurrency)

    return (
        <li>
            <div className={styles.left}>
                <h3><Link to={`/product/${id}`}>{name}</Link></h3>
                <h4>{brand}</h4>
                <span>{itemPrice.currency.symbol} {itemPrice.amount}</span>
                {attributes?.map((att,id) => (
                  <div key={`${att?.name}-${id}`} className={styles.attributesWrap}>
                    <h5>{att?.name}:</h5>
                    <AttributeCartValues
                        selectedAttributes={selectedAttributes}
                        attribute={att.id}
                        items={att.items}
                        type={att.type}
                        styles={styles}
                      />
                  </div>
                ))}
            </div>
            <div className={styles.right}>
                <div className={styles.qtyWrapper}>
                    <span className={styles.plus} onClick={() => incrementCartItemQty(cartItem)}>&#43;</span>
                    <span className={styles.count}>{qty}</span>
                    <span className={styles.minus} onClick={() => decrementCartItemQty(cartItem)}>&#8722;</span>
                </div>
                <ImageSlider images={gallery} /> 
            </div>
      </li>
    )
  }
}