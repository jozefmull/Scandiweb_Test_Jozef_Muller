
import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GlobalContext } from './context/GlobalState'

import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound' 

import Nav from './components/Header/Nav';
import Container from './components/Container';
import Overlay from './components/Overlay';
import ImageLightBox from './components/Product/ImageLightBox';

import styles from './css/App.module.css'

class App extends Component {
  static contextType = GlobalContext

  render() {
    // desctructure context
    const {miniCartOpen, lightbox} = this.context

    return (
      <div className={styles.scandiweb_app}>
        {/* if minicart is open display overlay else null */}
        {miniCartOpen ? <Overlay/> : null}
        {/* if light box is open display lightbox else null */}
        {lightbox.open ? <ImageLightBox /> : null}
        <Nav/>
        <Container> 
          <Routes>
              <Route path='/not-found' element={<NotFound />} />
              <Route path='/' element={<Category/>}/>
              <Route path='/:category' element={<Category/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/product/:name' element={<Product/>}/>
          </Routes>
        </Container>
      </div>
    )
  }
}

export default App