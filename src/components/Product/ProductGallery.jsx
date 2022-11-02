import React, { Component } from 'react'

import styles from '../../css/ProductGallery.module.css'

export default class ProductGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currIndex: 0
        }
    }

    handleChangeImage = (id) => {
        this.setState({
            currIndex: id
        })
    }


  render() {
    const {images, lightbox, handleLightbox} = this.props

    let filteredImages = images.filter(id => id !== this.state.currIndex)

    return (
      <>
        <div className={styles.productGalleryWrap}>
          <ul>
              {filteredImages.map((image, id) => (
                  <li 
                  key={`gallery-thumb-${id}`} 
                  onClick={() => this.handleChangeImage(id)}
                  className={id === this.state.currIndex ? styles.current : null}>
                    <img src={image} alt='gallery-li-thumb' draggable="false" loading="lazy"/>
                  </li>
              ))}
          </ul>
          <div className={styles.currentImgWrap}>
              <img 
                src={images[this.state.currIndex]} 
                alt="active-gallery-pic" 
                width={'100%'} 
                height={'auto'} 
                draggable="false" 
                loading="lazy"
                onClick={() => handleLightbox(!lightbox.open, images, this.state.currIndex)}
                />
          </div>
        </div>
      </>
    )
  }
}
