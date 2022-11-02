import React, { Component } from 'react'

import ProductCard from './ProductCard'

import styles from '../../css/ProductList.module.css'

export default class ProductList extends Component {
    
  render() {
    // we get values from props
    const {products, selectedCurrency} = this.props

    return (
        <ul className={styles.productWrapper}>
            {/* if we have products then map through them and display product cards */}
            {products ? products.map((product, idx) => (
                <ProductCard key={`${product.id}-${product.name}`} product={product} selectedCurrency={selectedCurrency} idx={idx}/>
            )) : null}
        </ul>
    )
  }
}
