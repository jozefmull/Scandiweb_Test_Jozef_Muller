import React, { Component } from 'react'

import { handleSelectedAttributeClass } from '../../../Helpers/Helpers'

export default class TextAttribute extends Component {
 
  render() {
    const {item, attribute, selectedAttributes, styles, handleAttributes, cartItem} = this.props
    return (
      <li 
        id={styles.textAttribute}
        className={handleSelectedAttributeClass(item, attribute, selectedAttributes, styles)}
        data-value={item.value}
        data-attribute={attribute}
        onClick={(e) => handleAttributes(e, selectedAttributes, cartItem)}
        >
          {item.value}
      </li>
    )
  }
}
