import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './payment.css'
import { TotalBasket } from './Reducer';
import { useStateValue } from './StateProvider'
import { db } from './firebase';

function Payment() {
  
  const [{basket,user},dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe(); //The useStripe hook returns a reference to the Stripe
  const elements = useElements(); // To safely pass the payment information to the Stripe API we use useElements hook

  const [disable,setDisable] = useState(true);
  const [error,setError] = useState(null);

  const [succeeded,setSucceeded] = useState(false);
  const [processing,setProcessing] = useState("");

  const [clientSecret,setClientSecret] = useState("true"); // this sets the amount that will be paid by the user .... a info to the strive

  // use effect renders everytime there is a change in the basket 
  useEffect(() => {
      // here we will generate the amount (client secret...we can relate the amount to it in some way)

      
      const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            // Stripe expects the total in a currencies subunits
            url: `/payments/create?total=${TotalBasket(basket) * 100}`
        });
        setClientSecret(response.data.clientSecret)
      }
      getClientSecret();
      }, [basket])
  
  console.log('The secret is = ', clientSecret)

  const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true); // after clicking the buy now button this will disable the buy now button which restricts the user from clicking the button multiple times

      // again i repeat the clientSecret tells the stripe how much we are going to charge the client
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
          card: elements.getElement(CardElement)
          // we find the card element with this card
        } 
      }).then(({ paymentIntent }) =>{
        // then will be executed after the function is completed
        // paymentIntent is kind of like the payment confirmation ...atleast think of it like that

        db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created // this is will give the timeStamp of the payment
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type : "EMPTY_BASKET"
        });

        //history.replace('/orders');

        navigate('/orders' , {replace:true} )
        
      }) 
      
  }

  const handleChange = event => {
      // here we listen to the changes in the cardElement and display if any errors occur while the user is entering the card details
      setDisable(event.empty); // if the event is empty we can disable the button
      setError(event.error ? event.error.message : "") //if there is a error show the error else show nothing
  }

  return (
    <div className='payment'>

      <div className="payment__container">

          <Link to = '/checkout' className='payment__link'>
            <h1 className='payment__h1'> Checkout ({basket?.length} items)</h1>
          </Link>        

          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address" >
                <p> { user ? user?.email : 'Guest' }</p>
                <p>54 Karurar Ilalam</p>
                <p>kambar street</p>
                <p>vellalore</p>
                <p>coimbatore,Tamil nadu</p>
              </div>
          </div>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Review Items and Details</h3>
            </div>
            <div className="payment__details">
              {basket.map( (item) => (
              <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  hidebutton
              ></CheckoutProduct>
              ))}

            {/* <CheckoutProduct
              id={2}
              title="Aurion Synthetic Leather Punching Bag- with Free Chain Heavy Bag"
              price={1200}
              image="https://m.media-amazon.com/images/I/61wx9APxCcL._SL1334_.jpg"
              rating={4}
            />

            <CheckoutProduct 
            id={5}
            title="Lg 7 Kg 5 Star Inverter Fully-Automatic Top Loading Washing Machine "
            price={19000}
            image="https://m.media-amazon.com/images/I/61jhEDBPOaL._SL1500_.jpg"
            rating={4}
            /> */}

            </div>
          </div>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">

              <form action="/orders.js" onSubmit={handleSubmit}>
                {/* The CardElement provides the space to enter card details */}
                <CardElement onChange={handleChange}> </CardElement>
                <div className="payment__priceContainer">
                    <CurrencyFormat 
                        renderText={ (value) => (
                              <h3 className='payment__details__h3'>Order Total : {value}</h3>
                          )}      
                        decimalScale={2} // no of decimals i.e paisa              
                        value={TotalBasket(basket)}
                        thousandSeparator={true}
                        prefix={"₹"}
                        displayType={"text"}
                    />
                    
                    <button disabled={processing || disable || succeeded} >
                      <span> {processing ? <p>Processing</p> : "Buy Now"} </span>
                    </button>
                    
                </div>

               {/* only if there is a error show the following div */}
               {error && <div>{error}</div>}

              </form>

              {/* Sti */}
            </div>
          </div>

        </div>
    </div>
  )
}

export default Payment