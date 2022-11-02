import React, { Component } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { GET_CATEGORY_DATA, makeQuery } from '../context/GraphQLQueries';
import { capitalizeCategory, checkIfCategoryIsPresent} from '../Helpers/Helpers';

import withRouter from '../Hooks/withRouter'

import ProductList from '../components/Product/ProductList'
import ErrorMessage from '../components/Messages_Loaders/ErrorMessage'
import Loader from '../components/Messages_Loaders/Loader'

import styles from '../css/Category.module.css'

class Category extends Component {
  static contextType = GlobalContext

  // on component mount
  componentDidMount(){
    // destructure context
    const {selectedCategory, changeCategory, setLoading, setError, setCategoryData} = this.context
    // set loading to true
    setLoading(true)
    //get category from url params (possible bcs of with router hook)
    const {category} = this.props?.params
    // if category is not undefined change category to this value
    if (category) {
      changeCategory(category.toUpperCase())
    }
    // make query with variable from url params (returns promise)
    const res = makeQuery(GET_CATEGORY_DATA, {input : {title: selectedCategory?.toLowerCase()}})
    // wait for reposne and do stuff with data
    res.then(res => {
      const {data} = res
      const {category} = data
      //set loading to false
      setLoading(false)
      //1. setCategory data to global state
      setCategoryData({name: category?.name, products: category?.products})
    //catch and set error if there is any
    }).catch(error => setError(error.message))
  }

  // on props update
  componentDidUpdate = (prevProps) => {
    // desctructure prev and actual props
    const {category:prevCategory} = prevProps.params
    const {category} = this.props.params
    // desctructure context
    const {changeCategory, setLoading, setError, setCategoryData, selectedCategory} = this.context

    // if category has changed
    if (prevCategory !== category) {
      // change context category to category from url and when we do not have category change to ALL 
      changeCategory( category ? category.toUpperCase() : 'ALL')
      // make query with variable from url params (returns promise)
      const res = makeQuery(GET_CATEGORY_DATA, {input : {title: selectedCategory?.toLowerCase()}})
      // wait for reposne and do stuff with data
      res.then(res => {
        const {data} = res
        const {category} = data
        //set loading to false
        setLoading(false)
        //1. setCategory data to global state
        setCategoryData({name: category?.name, products: category?.products})
      //catch and set error if there is any
      }).catch(error => setError(error.message))
    }
  }

  render() {
    // we get a parameter from URL (possible bcs of withRouter hook)
    const {category} = this.props.params
    // we get values from context
    const {selectedCategory, selectedCurrency, products, categories, error, loading} = this.context
    // check if category is present with helper function
    checkIfCategoryIsPresent(categories, category)

    // if we are loading display loader
    if (loading) {
      return (
        <section className={styles.category}>
          <Loader/>
        </section>
      )
    }
    // if there is an error dispaly error
    if (error) {
      return (
        <section className={styles.category}>
          <ErrorMessage error={error.message} />
        </section>
      )
    }
    // if everything is alright return category page
    return (
      <section className={styles.category}>
        {/* if we have products from query dispaly category page */}
        {products?.products ? (
          <>
            <h1>{capitalizeCategory(selectedCategory)}</h1>
            <div className={styles.productsWrapper}>
              <ProductList products={products.products} selectedCurrency={selectedCurrency}/>
            </div>
          </>
        ) : null}
      </section>
    )
  }
}

export default withRouter(Category)
