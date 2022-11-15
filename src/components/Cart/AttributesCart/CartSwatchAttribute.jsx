import React, { Component } from 'react'

import { handleSelectedAttributeClass } from '../../../Helpers/Helpers'

export default class SwatchAttribute extends Component {

  render() {
    const {item, attribute, selectedAttributes, styles} = this.props

    return (
      <li
        id={styles.swatchAttribute}
        className={handleSelectedAttributeClass(item, attribute, selectedAttributes, styles)}
        data-value={item.value}
        data-attribute={attribute}
      >
        <div style={ item.id === 'White' ? {outline: '1px solid #ccc', backgroundColor: item.value}  : {backgroundColor: item.value}}></div>
      </li>
    )
  }
}
