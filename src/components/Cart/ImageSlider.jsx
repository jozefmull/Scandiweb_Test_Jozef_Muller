import React, { Component } from 'react'

import arrLeft from '../../assets/images/arrLeft.svg'
import arrRight from '../../assets/images/arrRight.svg'

import styles from '../../css/ImageSlider.module.css'

export default class ImageSlider extends Component {
  // define state with icurrent index of image we want to display
    constructor(props) {
        super(props);
        this.state = {
            currIndex: 0
        }
    }
    // go to previous image
    goToPrevious = () => {
      // check if slide is first
        const isFirstSlide = this.state.currIndex === 0;
        // if it is first use last slide in arary else use previous slide 
        const newIndex = isFirstSlide ? this.props.images.length - 1 : this.state.currIndex - 1;
        // set new state
        this.setState({
            currIndex: newIndex
        })
    }
    // go to next
    goToNext = () => {
      // check if this is the last slide
        const isLastSlide = this.state.currIndex === this.props.images.length - 1;
        // if it is last slide use first slide in array else use next one
        const newIndex = isLastSlide ? 0 : this.state.currIndex + 1;
        // set new tate
        this.setState({
            currIndex: newIndex
        })
    }

  render() {
    // get images from props
    const {images} = this.props
    // slide styles
    const slideStyles = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        transition: 'all .325s ease-in-out',
        backgroundRepeat: 'no-repeat'
    }
    // slide styles with dynamic background depending on state 
    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${images[this.state.currIndex]})`,
    }

    return (
      <div className={styles.sliderStyles} >
        <div
          className={styles.leftArrStyles} 
          onClick={this.goToPrevious}
          // if we have les than 2 images in array do not display arrow
          style={images.length < 2 ? {display: 'none'} : null}>
            <img src={arrLeft} alt="arr-left"/>
        </div>
        <div 
          className={styles.rightArrStyles} 
          onClick={this.goToNext}
          // if we have les than 2 images in array do not display arrow
          style={images.length < 2 ? {display: 'none'} : null}>
            <img src={arrRight} alt="arr-right"/>
        </div>
        <div style={slideStylesWidthBackground}></div>
      </div>
    )
  }
}
