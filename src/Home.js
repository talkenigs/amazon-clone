import React from 'react'
import './Home.css'
import Header from './Header';
import Product from './Product'

function Home() {
    const img = ["https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png", 
    "https://m.media-amazon.com/images/I/71UrKtZapPL._AC_SL1500_.jpg", 
    "https://m.media-amazon.com/images/I/61rQC6AM-6L._AC_SL1000_.jpg", 
    "https://m.media-amazon.com/images/I/91XLJL1h1nS._AC_SL1500_.jpg", 
    "https://m.media-amazon.com/images/I/71H0spxwmSL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81hcVjZfGtS._AC_SL1500_.jpg"]
    
  return (
      <>
    <div className='home'>
        <div className='home__container'>
        <img className='home__image' src={img[0]} />

        <div className='home__row'>
            <Product title="Vital Proteins Collagen" image={img[1]} price={19.99} rating={5} />
            <Product title="Fire TV Stick 4K" image={img[2]} price={39.99} rating={5} />
        </div>

        <div className='home__row'>
        <Product title="Legendary Whitetails Men's Buck Camp Flannel Shirt" image={img[3]} price={9.99} rating={5} />
        <Product title="Storage Boxes (Pack Of 14)" image={img[4]} price={34.60} rating={5} />
        <Product title="Lenovo Flex 5i 13 Chromebook" image={img[5]} price={199.99} rating={5} />
        </div>

        <div className='home__row'>
        <Product title=" Vital Proteins Collagen" image={img[1]} price={19.99} rating={5} />        
        </div>
    </div>
    </div>
    </>
  )
}

export default Home