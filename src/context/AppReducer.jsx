// Reducer is how we specify application state changes in response to certain actions to our context
export const AppReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_CATEGORY':
        // return state with changed selected category
        return{
            ...state,
            loading: false,
            selectedCategory: action.payload
        }
      case 'SET_LOADING':
        // return state with loading
        return{
            ...state,
            loading: action.payload,
        }
      case 'SET_ERROR':
        // return state with error
        return{
            ...state,
            loading: false,
            error: action.payload
        }
      case 'CHANGE_CURRENCY':
        // save selected currency to local storage
        localStorage.setItem('scandiweb_test_selected_currency', JSON.stringify(action.payload))
        // return state with loading false and selected currency
        return{
            ...state,
            loading: false,
            selectedCurrency: action.payload
        }
      case 'SET_CATEGORY_DATA':
        // return state with loading false and category data
        return{
            ...state,
            loading: false,
            products: action.payload
        }
      case 'SET_PROD_DETAILS_DATA':
        // return state with loading false and productdetails data
        return{
            ...state,
            loading: false,
            productDetails: action.payload
        }
      case 'SET_OVERLAY_DISPLAY':
        // return state with minicartopen true or false
        return{
            ...state,
            miniCartOpen: action.payload
        }
      case 'ADD_ITEM_TO_CART':
        // set local storage with new item
        localStorage.setItem('scandiweb_test_cart_items', JSON.stringify([...state.cartItems, action.payload]))
        // return state with new item
        return{
            ...state,
            cartItems: [...state.cartItems, action.payload]
        }
      case 'INCREMENT_CART_ITEM_QTY':
        // insert new item with updated qty to place of an old item with old qty
        state.cartItems.splice(action.payload.index, 1, action.payload.tmp)
        // set localstorage
        localStorage.setItem('scandiweb_test_cart_items', JSON.stringify(state.cartItems))
        //return state
        return{
          ...state
        }
      case 'DECREMENT_CART_ITEM_QTY':
        // insert new item with updated qty to place of an old item with old qty
        state.cartItems.splice(action.payload.index, 1, action.payload.tmp)
        // set localstorage
        localStorage.setItem('scandiweb_test_cart_items', JSON.stringify(state.cartItems))
        //return state
        return{
          ...state,
        }
      case 'REMOVE_CART_ITEM':
        // set localstorage
        localStorage.setItem('scandiweb_test_cart_items', JSON.stringify([...state.cartItems.filter((item,id) => id !== action.payload)]))
        // return state
        return{
          ...state,
          // filter cart items by index (position in array) we pass from global context
          cartItems: [
            ...state.cartItems.filter((item,id) => id !== action.payload),
          ]
        }
      case 'HANDLE_LIGHTBOX':
        //return state
        return{
          ...state,
          lightbox: {open: action.payload.open, items: action.payload.items, currId: action.payload.index}
        }
      default:
        return state
    }
  }