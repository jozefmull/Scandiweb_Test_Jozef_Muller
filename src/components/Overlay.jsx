import React, { Component } from 'react'
import { GlobalContext } from '../context/GlobalState'

import styles from '../css/Nav.module.css'

export default class Overlay extends Component {
  static contextType = GlobalContext
  // on mount
  componentDidMount(){
    // add listener for escape key and close overlay when its clicked
    document.body.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        this.context.setOverlayDisplay(!this.context.miniCartOpen)
      }
    })
  }
  // on unmount
  componentWillUnmount(){
    // remove this event listener
    document.body.removeEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        this.context.setOverlayDisplay(!this.context.miniCartOpen)
      }
    })
  }
  // set overlay dispaly to opposite value we have in state
  handleOverlay(){
     this.context.setOverlayDisplay(!this.context.miniCartOpen)
  }

  render() {
    return (
      <div className={styles.overlay} onClick={() => this.handleOverlay()}></div>
    )
  }
}
