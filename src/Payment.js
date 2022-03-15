import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom"
import "./Payment.css"
import { useStateValue } from './StateProvider/StateProvider'
import CheckoutProduct from './Checkout/CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './StateProvider/Reducer';
import { axios } from 'axios';
import { db } from './firebase';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(null)

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
         
    }, [])

    // Stripe
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);;
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders');
        })
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    // Paypal 
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: getBasketTotal(basket).toFixed(2),
              },
            },
          ],
        });
      };

    const onApprove = (data, actions) => {
        // navigate("/orders");

        //         db
        //         .collection("users")
        //         .doc()
        //         .collection('orders')
        //         .doc(data)
        //         .set({
        //             basket: basket,
        //             amount: data
        //         })

        console.log(data)
        console.log(actions)

        return () => {actions.order.capture()
            .then((orderData) => {           
                console.log(orderData)
            })   
            .catch((error) => console.error(error.message))
        }};

  return (
    <div className='payment'>
        <div className="payment__container">
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
            </h1>

            <div className="payment__section">

                <div className="payment__title">
                    <h3>Delivery Address</h3>
                    </div>

                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                    </div>

            </div>

            <div className="payment__section">

                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                    </div>

                <div className="payment__items">
                    {basket.map(item => 
                        <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                />
                        )}
                    </div>

                </div>

            <div className="payment__section">

            <div className="payment__title">
                <h3>Payment Method</h3>
                </div>
                
                <div className="payment__details">
                <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    {/* <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button> */}
                                </div>

                            <div className='payment__paypal'>
                                <PayPalButton
                                    createOrder={(data, actions) => createOrder(data, actions)}
                                    onApprove={(data, actions) => onApprove(data, actions)}
                                    />
                                </div>
                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
            </div>
                 
            </div>
        
        </div>
  )
}

export default Payment