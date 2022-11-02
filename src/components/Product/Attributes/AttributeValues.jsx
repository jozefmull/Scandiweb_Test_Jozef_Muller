import React, { Component } from 'react'

import TextAttribute from './TextAttribute'
import SwatchAttribute from './SwatchAttribute'

export default class AttValues extends Component {

  render() {
    const {items, type, handleAttributes, attribute, selectedAttributes, styles} = this.props

    if (type === 'text') {
      return (
        <ul id={attribute} className={styles.itemsWrap}>
          {items?.map((item,id) => (
                <TextAttribute 
                  key={`${item?.name}-${id}`} 
                  item={item} id={id} 
                  attribute={attribute} 
                  styles={styles}
                  handleAttributes={handleAttributes}
                  selectedAttributes={selectedAttributes}/>
          ))}
        </ul>
      )
    }

    if (type === 'swatch') {
      return (
          <ul id={attribute} className={styles.itemsWrap}>
            {items?.map((item,id) => (
                  <SwatchAttribute  
                    key={`${item?.name}-${id}`} 
                    item={item} 
                    attribute={attribute} 
                    styles={styles}
                    handleAttributes={handleAttributes}
                    selectedAttributes={selectedAttributes}/>
            ))}
          </ul>
      )
    }
  }
}
