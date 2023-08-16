import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,title,price,image,rating,hidebutton}) {

    const [,dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,
        })
    }

  return (
    <div className='checkoutproduct'>
        <img src={image} alt="" className="checkoutproduct__img" />
        <div className="checkoutproduct__info">
            <p className="checkoutproduct__title">{title}</p>
            <p className="checkoutproduct__price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutproduct__rating">
              {Array(rating).fill(<p>⭐</p>)}
            </div>
            {!hidebutton && (
            <button className='checkoutproduct__button' onClick={removeFromBasket}>Remove From basket</button>
            )}
        </div>
    </div>
  )
}

export default CheckoutProduct