import React, { Component } from 'react'

import { handleSelectedAttributeClass } from '../../../Helpers/Helpers'

export default class SwatchAttribute extends Component {

  render() {
    const {item, handleAttributes, attribute, selectedAttributes, styles} = this.props

    return (
      <li
        id={styles.swatchAttribute}
        className={handleSelectedAttributeClass(item, attribute, selectedAttributes, styles)}
        onClick={(e) => handleAttributes(e)}
        data-value={item.value}
        data-attribute={attribute}
        
      >
        <div 
          style={item.id === 'White'? {outline: '1px solid #000', outlineStyle: 'inset', backgroundColor: item.value} : {backgroundColor: item.value}}
        ></div>
      </li>
    )
  }
}
