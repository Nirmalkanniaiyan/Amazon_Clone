import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product( {id,title,price,rating,image} ) {

  const [{basket},dispatch] = useStateValue();

  const addToBasket = () => {
    //dispatch will shoot the data into the data layer
    dispatch({
        type:'ADD_TO_BASKET',
        item:{
          id:id,
          title:title,
          price:price,
          rating:rating,
          image:image,
        },
    });
  };

  return (
    <div className='product'>
        <div className="product__info">
            <p>{title}</p>
            <p className="product__price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">

              {/* {Array(rating).fill().map( (_,i) =>(
                <p>🌟</p>
              ) )} */}

              {Array(rating).fill(<p>⭐</p>)}

            </div>
        </div>
        <img src={image} className='product__image' alt="" />
        <button className='product__button' onClick={addToBasket}>Add to basket</button>
    </div>
  )
}

export default Product