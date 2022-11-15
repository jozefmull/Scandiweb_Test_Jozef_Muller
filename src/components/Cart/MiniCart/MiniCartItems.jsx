import React, { Component } from 'react'
import { GlobalContext } from '../../../context/GlobalState'

import AttributeCartValues from '../AttributesCart/AttributeCartValues'

import styles from '../../../css/MiniCart.module.css'

export default class MiniCartItems extends Component {
    static contextType = GlobalContext

    handleAttributes(){

    }

  render() {
    const {decrementCartItemQty, incrementCartItemQty} = this.context
    const {cartItem, selectedCurrency} = this.props
    const {prices, name, gallery, qty, attributes, selectedAttributes, brand} = cartItem

    const itemPrice = prices.filter(price => price.currency.label === selectedCurrency.label)[0]

    return (
        <li>
            <div className={styles.left}>
                <h4>{name}</h4>
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
                      // handleAttributes={changeProductAttributesInCart}
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
                <img src={gallery[0]} alt="cart-item" draggable="false"/>
            </div>
      </li>
    )
  }
}
