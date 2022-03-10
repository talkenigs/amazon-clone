import React from 'react'
import "./Checkout.css"
import Subtotal from '../Subtotal'
import { getBasketTotal } from '../StateProvider/Reducer'
import { useStateValue } from '../StateProvider/StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const [{ basket }, dispatch] = useStateValue();

  return (
    <div className='checkout'>
        <div className="checkout__left">
            <img 
            className='checkout__ad' 
            src="https://media-exp1.licdn.com/dms/image/C561BAQFjHL9EU0Yvvg/company-background_10000/0/1619644672652?e=2147483647&v=beta&t=i3XuZrZ35yGc7L55QVrlHwG4k90q1EFBfmP6D_i2hzI" 
            alt="" />

        <div>
            <h2 className="checkout__title">
                Your Shopping Basket
            </h2>

            {basket.map(item => (
                <CheckoutProduct 
                id= {item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                />
            ))}
        </div>
    </div>

        <div className="checkout__right">
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout