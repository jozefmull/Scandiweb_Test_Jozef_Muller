import React, { Component } from 'react'

import styles from '../../css/Info.module.css'

export default class InfoMessage extends Component {
  render() {
    // get message from props
    const {message} = this.props
    // display info message
    return (
        <div className={styles.infoWrap}>
            <p className={styles.message}>{message}</p>
        </div>
    )
  }
}
