import React, { Component } from 'react'

import { handleSelectedAttributeClass } from '../../../Helpers/Helpers'

export default class SwatchAttribute extends Component {

  render() {
    const {item, attribute, selectedAttributes, styles, handleAttributes, cartItem} = this.props

    return (
      <li
        id={styles.swatchAttribute}
        className={handleSelectedAttributeClass(item, attribute, selectedAttributes, styles)}
        onClick={(e) => handleAttributes(e, selectedAttributes, cartItem)}
        data-value={item.value}
        data-attribute={attribute}
      >
        <div style={{backgroundColor: item.value}}></div>
      </li>
    )
  }
}
