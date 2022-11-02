import { Component } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { Link } from 'react-router-dom'

import { getProductPrice } from '../../Helpers/Helpers'

import CartIcon from '../../assets/images/CartIconProductCard.svg'

import styles from '../../css/ProductList.module.css'

export default class ProductCard extends Component {
  static contextType = GlobalContext

  constructor(props) {
    super(props);
    this.state = {
        selectedAttributes: []
    }
  }

  // on component did mount 
  componentDidMount() {
    //1. get attributes from props
    const {attributes} = this.props?.product
    //2. map through attributes and return object with att id as a key and value from first item
    let initialAttributes = attributes.map(att => ({[att.id]: att.items[0].value}))
    //3. set state
    this.setState({
      selectedAttributes: [...initialAttributes]
    })
  }

  render() {
    // get values from context, props, state
    const {addItemToCart} = this.context
    const {product, selectedCurrency, idx} = this.props
    const {selectedAttributes} = this.state
    // desctructure product values
    const {name, gallery, prices, id, inStock} = product
    // get card price in selected currency
    const cardPrice = getProductPrice(prices, selectedCurrency)
    
    return (
        <li className={styles.productItem} style={{animationDelay: idx + '50ms'}}>
          <Link to={`/product/${id}`} draggable="false"/>
              <div className={styles.imgWrapper}>
                {/* if product is not in stock then we display out of stock design */}
                {!inStock ? (
                  <div className={styles.outOfStock}>
                      <h3>OUT OF STOCK</h3>
                  </div>
                ) : null}
                <img src={gallery[0]} alt="product" width={'auto'} loading="lazy"/>
              </div>
              <div className={styles.productInfo}>
                {/* we display cart icon only if product is in stock */}
                  <div 
                    className={!inStock ? styles.disabled : null}
                    onClick={() => addItemToCart(product, selectedAttributes)}>
                      {/* addItemToCart(productDetails?.product, selectedAttributes) */}
                      <img src={CartIcon} alt='cart-icon'/>
                  </div>
                  <h3>{name}</h3>
                  <span>{cardPrice.currency.symbol} {cardPrice.amount}</span>
              </div>  
        </li>
    )
  }
}
