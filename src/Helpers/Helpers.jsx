/**
 * HANDLE PRODUCT ATTRIBUTES STATE
 * @param {*} e 
 * @param {*} selectedAttributes 
 * @param {*} state 
 * @returns new selected attributes
 */
export const handleProductAttributes = (e, selectedAttributes) => {
  // variables from element that has been clicked on
  let myAttribute =  e.target.getAttribute("data-attribute")
  let myValue =  e.target.getAttribute("data-value")
  // if our state contains already contains this attribute
  if (selectedAttributes.some(attributes => myAttribute in attributes)){
    //1. find index of this item
    let index = selectedAttributes.findIndex(obj => obj.hasOwnProperty(myAttribute))
    //2. make shallow copy of state array
    let items = [...selectedAttributes]
    //3. make a shallow copy of this item
    let item = {...items[index]}
    //4. update item value
    item[myAttribute] = myValue
    //5. insert new item into state at given index
    items[index] = item
    //6. return new state
    return [...items]
  // else return new state with items from previous state and new attribute
  }else{
    return [...selectedAttributes, {[myAttribute]: myValue}]
  }
}

/**
 * HANDLE CLASS OF SELECTED PRODUCT ATTRIBUTES
 * @param {*} item 
 * @param {*} attribute 
 * @param {*} selectedAttributes 
 */
export const handleSelectedAttributeClass = (item, attribute, selectedAttributes, dynamicStyles) => {
    if (selectedAttributes.some(attributes => attribute in attributes)) {
    
        let index = selectedAttributes.findIndex(obj => obj.hasOwnProperty(attribute))
        let tmp = selectedAttributes[index]
        
        if (tmp[attribute] === item.value) {
          return dynamicStyles.selected
        }else{
            return null
        }
      }
}
/**
 * CAPITALIZE CATEGORY STRING
 * @param {*} category 
 * @returns capitalized category title
 */
export const capitalizeCategory = (category) => {
  return category[0].toUpperCase() + category.substring(1).toLowerCase()
}

/**
 * GET CART TOTALS
 * @param {*} cartItems 
 * @param {*} selectedCurrency 
 * @returns cart total quantities, total sum, tax, cartCount
 */
export const getCartTotal = (cartItems, selectedCurrency) => {
  let cartCount = cartItems?.map(item => item.qty).reduce((acc,curr) => acc += curr, 0)
  //get prices of items in cart in array map through them and filter
  let pricesInArray = cartItems?.map(item => item.prices).map(element => {
    // filter by currently selected currency and map and return only amounts
    return element.filter(price => price.currency.label === selectedCurrency.label).map(price => price.amount)
    // flatten the array
  }).flat();

  // map through qty and return them in an array
  let qtysInArray = cartItems?.map(item => item.qty)

  let sumOfQtys = qtysInArray.reduce((acc,curr) => acc += curr ,0)
  //map throuqh prices and multiply them by corresponding qty then sum all numbers and round them to two decimals
  let total = pricesInArray.map((price, id) => price * qtysInArray[id]).reduce((acc,curr) => acc += curr, 0).toFixed(2)
  //tax
  let tax = (total * 0.21).toFixed(2)

  return {quantities: sumOfQtys, total: total ,tax: tax, cartCount: cartCount}
}

/**
 * CHECK IF WE HAVE PARTICULAR CATEGORY IF NOT REDIRECT
 * @param {*} categories 
 * @param {*} category 
 */
export const checkIfCategoryIsPresent = (categories, category) => {
// if we have our array of categories from initial query and if category from url is not undefined
  if (categories?.length > 0 && category !== undefined) {
    // check if we have the category from url inside our category array... if not redirect to not found page
    if (!categories.find(cat => cat.name === category)) {
      window.location.replace('/not-found')
    }
  }
}

/**
 * GET PRODUCT PRICE WITH SELECTED CURRENCY
 * @param {*} prices 
 * @param {*} selectedCurrency 
 * @returns product price in that currency
 */
export const getProductPrice = (prices, selectedCurrency) => {
  let productPrice
  
  if (prices) {
    // filter prices by selectedcurrency
    productPrice = prices?.filter(price => price.currency.label === selectedCurrency.label)[0]
  }
  
  return productPrice
}