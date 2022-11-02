import { Component } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { GET_PRODUCT_DATA, makeQuery } from '../context/GraphQLQueries';

import { handleProductAttributes, handleSelectedAttributeClass, getProductPrice } from '../Helpers/Helpers'
import withRouter from '../Hooks/withRouter'

import AttributeValues from '../components/Product/Attributes/AttributeValues'
import ErrorMessage from '../components/Messages_Loaders/ErrorMessage'
import Loader from '../components/Messages_Loaders/Loader'

import styles from '../css/ProductDetails.module.css'
import ProductGallery from '../components/Product/ProductGallery';

class Product extends Component {
  static contextType = GlobalContext
  // define state with selectedAttributes as an empty array
  constructor(props) {
    super(props);
    this.state = {
        selectedAttributes: []
    }
  }

  // on component did mount 
  componentDidMount() {
    // destructure context
    const {setError,setLoading, setProductData} = this.context
    // set loading to true
    setLoading(true)
    //get name of product from url params (possible bcs of with router hook)
    const {name} = this.props?.params
    // make query wit variable from url params (returns promise)
    const res = makeQuery(GET_PRODUCT_DATA, {id: name})
    // after we get response 
    res.then(res => {
      //set loading to false
      setLoading(false)
      //1. setProduct data to global state
      setProductData(res.data)
      //2. and set initial selected attributes
      const {attributes} = res.data.product
      //3. map through attributes and return object with att id as a key and value from first items
      //innitial selected attributes will always be first items in that array
      let initialAttributes = attributes.map(att => ({[att.id]: att.items[0].value}))
      //4. set state
      this.setState({
        selectedAttributes: [...initialAttributes]
      })
      //if error set error
    }).catch(error => setError(error.message))
  }

  // if component unmounts reset product details to empty object
  componentWillUnmount() {
    this.context.setProductData({})
  }

  // handle selected atributes
  handleAttributes = (e) => {
    // destructure state
    const {selectedAttributes} = this.state
    // get new state from helper function
    const newState = handleProductAttributes(e, selectedAttributes) 
    // set the new state of attributes
    this.setState({
      selectedAttributes: newState
    })
  }

  render() {
    // get variables from context and state
    const {loading, productDetails, selectedCurrency, addItemToCart, error, handleLightbox, lightbox} = this.context
    const {selectedAttributes} = this.state
    // get product price in selected currency
    let productPrice = getProductPrice(productDetails?.product?.prices, selectedCurrency)

    // if we are loading display loader
    if (loading) {
      return (
        <section className={styles.productDetails}>
          <Loader/>
        </section>
      )
    }

    // if there is an error dispaly error
    if (error) {
      return (
        <section className={styles.productDetails}>
          <ErrorMessage error={error.message} />
        </section>
      )
    }

    // if everything is alright return category page
    return (
      <>
      <section className={styles.productDetails}>
        {/* if we are not loading and we have productDetails with product inside of it display product page */}
        {!loading && productDetails && productDetails.product ? (
          <div className={styles.columnsWrapper}>
            {/* LEFT COLUMN */}
            <div className={styles.leftCol}>
              <ProductGallery images={productDetails?.product?.gallery} handleLightbox={handleLightbox} lightbox={lightbox}/>
            </div>
            {/* RIGHT COLUMN */}
            <div className={styles.rightCol}>
                <h1>{productDetails?.product?.name}</h1>
                <h3>{productDetails?.product?.brand}</h3>
                {/* PRODUCT ATTRIBUTES */}
                {productDetails?.product?.attributes?.map((att,id) => (
                  <div key={`${att?.name}-${id}`} className={styles.attributesWrap}>
                    <h3>{att?.name}:</h3>
                    <AttributeValues
                      selectedAttributes={selectedAttributes}
                      attribute={att.id}
                      items={att.items}
                      type={att.type}
                      styles={styles}
                      handleSelectedAttributeClass={handleSelectedAttributeClass}
                      handleAttributes={this.handleAttributes}
                    />
                  </div>
                ))}
                {/* PRODUCT PRICE */}
                <div className={styles.priceWrap}>
                  <h3>PRICE:</h3>
                  <span>{productPrice?.currency?.symbol} {productPrice?.amount}</span>
                </div>
                {/* ADD TO CART */}
                <button 
                  className={styles.addToCartBtn} 
                  disabled={productDetails?.product?.inStock ? false : true}
                  onClick={() => addItemToCart(productDetails?.product, selectedAttributes)}>
                    ADD TO CART
                  </button>
                <div dangerouslySetInnerHTML={{__html: productDetails?.product?.description}}></div>
            </div>
          </div>
        ) : null }
      </section>
      </>
    )
  }
}

export default withRouter(Product)