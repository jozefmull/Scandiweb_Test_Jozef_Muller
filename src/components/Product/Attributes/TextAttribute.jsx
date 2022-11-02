import React, { Component } from 'react'

import { handleSelectedAttributeClass } from '../../../Helpers/Helpers'

export default class TextAttribute extends Component {
 
  render() {
    const {item, handleAttributes, attribute, selectedAttributes, styles} = this.props

    return (
      <li 
        id={styles.textAttribute}
        className={handleSelectedAttributeClass(item, attribute, selectedAttributes, styles)}
        data-value={item.value}
        data-attribute={attribute}
        onClick={(e) => handleAttributes(e)}
        >
          {item.value}
      </li>
    )
  }
}
