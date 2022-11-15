import React, { Component } from 'react'

import CartTextAttribute from './CartTextAttribute'
import CartSwatchAttribute from './CartSwatchAttribute'

export default class AttValues extends Component {

  render() {
    const {items, type, attribute, selectedAttributes, styles} = this.props

    if (type === 'text') {
      return (
        <ul id={attribute} className={styles.itemsWrap}>
          {items?.map((item,id) => (
                <CartTextAttribute 
                  key={`${item?.name}-${id}`} 
                  item={item} id={id} 
                  attribute={attribute} 
                  styles={styles}
                  selectedAttributes={selectedAttributes}
                  />
          ))}
        </ul>
      )
    }

    if (type === 'swatch') {
      return (
          <ul id={attribute} className={styles.itemsWrap}>
            {items?.map((item,id) => (
                  <CartSwatchAttribute  
                    key={`${item?.name}-${id}`} 
                    item={item} 
                    attribute={attribute} 
                    styles={styles}
                    selectedAttributes={selectedAttributes}
                    />
            ))}
          </ul>
      )
    }
  }
}
