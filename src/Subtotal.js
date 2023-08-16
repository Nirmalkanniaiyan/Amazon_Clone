import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { TotalBasket } from './Reducer';
import Payment from './Payment';

function Subtotal() {

  const [{basket}, dispatch] = useStateValue();
  const navigate = useNavigate();
    // let sum =0;
    // for (let i =0; i< basket.length;i++){
    //     sum = sum + basket[i].price
    // }

  return (

    <div className='subtotal'>
        <CurrencyFormat
            renderText = {(value) => (
                <>
                    <p>
                        Subtotal ({basket?.length} items) : <strong>{value}</strong>
                    </p>
                    <small className='subtotal__gift'>
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
             )}
            decimalScale={2}
            value={TotalBasket(basket)}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"₹"}
        />

        <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal