import { createContext, useReducer } from 'react'
import { AppReducer } from './AppReducer'
import { useQuery } from '@apollo/client';

import { INITIAL_QUERY } from './GraphQLQueries';

//INITIAL STATE OF OUR APP
const INITIAL_STATE = {
    loading: false,
    error: null,
    categories: [],
    //initial selected category
    selectedCategory: 'ALL',
    currencies: [],
    // selected curency check if we have it in local storage if yes use it if no initial currency will be USD
    selectedCurrency: localStorage.getItem('scandiweb_test_selected_currency') ?
                      JSON.parse(localStorage.getItem('scandiweb_test_selected_currency')) : 
                      { label: 'USD', symbol: '$' },
    //products with initial category all
    products:{
        category: 'all',
        data: []
    },
    productDetails: {},
    miniCartOpen: false,
    // check if we have cart items in local storage if yes use it if no initial state will be empty array
    cartItems: localStorage.getItem('scandiweb_test_cart_items') ?
               JSON.parse(localStorage.getItem('scandiweb_test_cart_items')) : [] ,
    lightbox: {
        open:false,
        items: [],
        currId: 0
    }
}

export const GlobalContext = createContext(INITIAL_STATE)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
    // MAKE INITIAL QUERY WITH CATEGORY NAMES AND CURRENCIES
    const { loading, data, error } = useQuery(INITIAL_QUERY);

    // SET LOADING
    const setLoading = (boolean) => {
        dispatch({type:'SET_LOADING', payload: boolean})
    }
    // SET ERROR
    const setError = (error) => {
        dispatch({type:'SET_ERROR', payload: error})
    }
    /**
     * CHANGE CATEGORY
     * @param {*} cat 
     */
    const changeCategory = (cat) => {
        dispatch({type:'CHANGE_CATEGORY', payload: cat})
    }
    /**
     * CHANGE CURRENCY
     * @param {*} curr 
     */
    const changeCurrency = (curr) => {
        dispatch({type:'CHANGE_CURRENCY', payload: curr})
    }
    /**
     * SET CATEGORY DATA WHEN IT LOADS
     * @param {*} data 
     */
    const setCategoryData = (data) => {
        dispatch({type:'SET_CATEGORY_DATA', payload: data})
    }
    /**
     * SET PROD DETAILS DATA TO GLOBAL STATE WHEN IT LOADS
     * @param {*} data 
     */
    const setProductData = (data) => {
        dispatch({type:'SET_PROD_DETAILS_DATA', payload: data})
    }
    /**
     * DISPLAY OVERLAY WHEN MINICART IS OPEN
     * @param {*} boolean 
     */
    const setOverlayDisplay = (boolean) => {
        dispatch({type:'SET_OVERLAY_DISPLAY', payload: boolean})
    }
    /**
     * ADD ITEM TO CART
     * @param {*} item 
     * @param {*} quantity 
     */
    const addItemToCart = (item, selectedAttributes) => {
        const newProduct = {...item, qty:1, selectedAttributes}
        // we check if we have this item in cart with same selected attributes and same id
        if (state.cartItems.find(cartItem => (JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(newProduct.selectedAttributes) && cartItem.id === newProduct.id))) {
            // we find this item
            let tmpItem = state.cartItems.find(cartItem => JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(newProduct.selectedAttributes))
            // find index
            let index = state.cartItems.indexOf(tmpItem)
            // then just get new item with updated qty
            let tmp = {...tmpItem,  qty: tmpItem.qty + 1}
            // dispatch action and update qty of this cart item
            dispatch({type: 'INCREMENT_CART_ITEM_QTY', payload: {index, tmp}})
        }else{
            // else we just add item to cart
            dispatch({type: 'ADD_ITEM_TO_CART', payload: newProduct})
        }
    }
    /**
     * INCREASE ITEM QTY BY ONE
     * @param {*} item 
     */
    const incrementCartItemQty = (item) => {
        // find index of this item in cartItems
        let index = state.cartItems.indexOf(item)
        // create new object with INCREASED qty
        const tmp = {...item, qty: item.qty + 1}
        // dispatch increment qty
        dispatch({type: 'INCREMENT_CART_ITEM_QTY', payload: {index, tmp}})
    }
    /**
     * DECREASE QTY BY ONE
     * @param {*} item 
     */
    const decrementCartItemQty = (item) => {
        // find index of this item in cartItems
        let index = state.cartItems.indexOf(item)
        // if item qty is bigger than 1 then decrement by one
        if (item.qty > 1) {
            // create new object with DECREASED qty
            const tmp = {...item, qty: item.qty - 1}
            //dispatch action
            dispatch({type: 'DECREMENT_CART_ITEM_QTY', payload: {index, tmp}})
        // else remove item from cart at given index (bcs we can have more items in cart with same id but different selected attributes)
        }else{
            dispatch({type: 'REMOVE_CART_ITEM', payload: index})
        }
    }
    // HANDLE OPEN LIGHTBOX
    const handleLightbox = (open, items, index) => {
        dispatch({type: 'HANDLE_LIGHTBOX', payload: {open, items, index}})
    }

    return (<GlobalContext.Provider value={{
        loading: loading ? loading : state.loading,
        error: error ? error : state.error,
        categories: data ? data.categories : [],
        selectedCategory: state.selectedCategory,
        currencies: data ? data.currencies : [],
        selectedCurrency: state.selectedCurrency,
        productDetails: state.productDetails,
        miniCartOpen: state.miniCartOpen,
        products: state.products,
        cartItems: state.cartItems,
        lightbox: state.lightbox,
        setCategoryData,
        changeCategory,
        changeCurrency,
        setProductData,
        setOverlayDisplay,
        addItemToCart,
        incrementCartItemQty,
        decrementCartItemQty,
        setLoading,
        setError,
        handleLightbox
    }}>
        {children}
    </GlobalContext.Provider>)
}