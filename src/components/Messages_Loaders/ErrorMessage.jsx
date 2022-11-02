import { Component } from 'react'

import styles from '../../css/Error.module.css'

export default class ErrorMessage extends Component {
  render() {
    // get error from props
    const {error} = this.props 
    // dispaly error message
    return (
      <div className={styles.errorWrap}>
        <p className={styles.message}>{error}</p>
      </div>
    )
  }
}
