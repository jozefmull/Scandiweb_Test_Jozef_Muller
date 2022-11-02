import { gql } from '@apollo/client';
import { client } from '../index'

//INITIAL QUERY THAT WE USE WHEN APP MOUNTS (we get categories names and available currencies)
export const INITIAL_QUERY = gql`
        query InitialQuery{
            categories{
                name
            }
            currencies{
                label,
                symbol
            }
        }
    `
//GET PRODUCT DATA (by product id)
export const GET_PRODUCT_DATA = gql`
        query GetProductData($id: String!) {
            product(id: $id){
                id,
                name,
                inStock,
                gallery,
                description,
                category,
                attributes{
                    id,
                    name,
                    type,
                    items{
                        displayValue, 
                        value, 
                        id, 
                    },
                }
                prices{
                    currency{
                        label,
                        symbol
                    }, 
                    amount 
                },
                brand
            }
        }
    `
// GET CATEGORY DATA (with its name and products by category title)
export const GET_CATEGORY_DATA = gql`
        query getCategoryData($input: CategoryInput){
            category(input: $input){
                name,
                products{
                    id,
                    name,
                    inStock,
                    gallery,
                    description,
                    category,
                    attributes{
                        id,
                        name,
                        type,
                        items{
                            displayValue, 
                            value, 
                            id, 
                        }, 
                    },
                    prices{
                        currency{
                            label,
                            symbol
                        }, 
                        amount 
                    },
                    brand
                    }
                }
        }
    `
//FUNCTION THAT ACTUALLY MAKES THE QUERY WITH QUERY AND VARIABLES WE PASS TO IT- RETURNS PROMISE
export const makeQuery = async(query, myVars) => {
    const response = await client.query({
        query: query,
        variables: myVars,
    })
    
    return response 
}