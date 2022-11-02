import React, { Component } from 'react'

import styles from '../../css/Loader.module.css'

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.loadWrap}>
        <div className={styles.ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </div>
    )
  }
}
