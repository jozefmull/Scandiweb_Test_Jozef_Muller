import React, { Component } from 'react'

export default class Container extends Component {
  render() {
    // JUST a wrapper container for our content
    return (
      <div style={{maxWidth:'1280px', width: '100%', margin: '0 auto', height: 'calc(100% - 80px)'}}>{this.props.children}</div>
    )
  }
}
