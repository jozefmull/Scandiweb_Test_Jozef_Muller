import React, { Component } from 'react'

import { GlobalContext } from '../../context/GlobalState'

import leftArr from '../../assets/images/arrLeft.svg'
import rightArr from '../../assets/images/arrRight.svg'

import styles from '../../css/ImageLightBox.module.css'

export default class ImageLightBox extends Component {
  static contextType = GlobalContext

  constructor(props) {
    super(props);
    this.state = {
        currIndex: 0
    }
  }
  // on component mount if we have curr lightbox id from context set it to state
  componentDidMount() {
    if (this.context?.lightbox?.currId) {
      this.setState({
        currIndex: this.context?.lightbox?.currId
      })
    }
  }
  //go to previous item set new current index
  goToPrevious = () => {
    const isFirstSlide = this.state.currIndex === 0;
    const newIndex = isFirstSlide ? this.context.lightbox.items.length - 1 : this.state.currIndex - 1;
    this.setState({
        currIndex: newIndex
    })
  }
  //go to next item set new current index
  goToNext = () => {
      const isLastSlide = this.state.currIndex === this.context.lightbox.items.length - 1;
      const newIndex = isLastSlide ? 0 : this.state.currIndex + 1;
      this.setState({
          currIndex: newIndex
      })
  }

  render() {
    const {handleLightbox, lightbox} = this.context
    const {open, items} = lightbox

    return (
      <div 
        id={styles.lightbox}
        aria-label='lightbox'>
          <button
            aria-label='exit-lightbox'
            type='button'
            className={styles.exitLightbox} 
            onClick={() => handleLightbox(!open, [], 0)}>
              ✖
          </button>
          <button 
            aria-label='previoues-lightbox-item'
            type='button'
            className={styles.leftArr} 
            onClick={this.goToPrevious}>
            <img src={leftArr} alt="left-arr" />
          </button>
          <img aria-label='lightbox-current-item' id={styles.lightboxImg} src={items[this.state.currIndex]} alt='lightbox-item' loading='lazy'/>
          <button
            aria-label='next-lightbox-item'
            type='button' 
            className={styles.rightArr} 
            onClick={this.goToNext}>
            <img src={rightArr} alt="right-arr" />
          </button>
      </div>
    )
  }
}
