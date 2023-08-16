import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          
        <Product 
            id={3}
            title="Aquaguard Aura RO+UV+UF+Taste Adjuster(MTDS) with Active Copper & Zinc 7L water purifier,8 stages of purification,suitable for borewell,tanker,municipal water(Black) from Eureka Forbes"
            price={16000}
            image="https://m.media-amazon.com/images/I/61OcN54uhiL._SL1500_.jpg"
            rating={4}
          />

          
          <Product 
            id={7}
            title="Samsung 253 L 3 Star with Inverter Double Door Refrigerator (RT28A3453S8/HL, Elegant Inox)- 2022 Model"
            price={24000}
            image="https://m.media-amazon.com/images/I/61-Vk77zloL._SL1500_.jpg"
            rating={4}
          />
        </div>

        <div className="home__row">
          
          <Product 
            id={4}
            title="Torque - Ruben 5 Seater Fabric Sofa for Living Room (3+1+1, Grey-Black) "
            price={17000}
            image="https://m.media-amazon.com/images/I/61oYTReVtpL._SL1100_.jpg"
            rating={4}
          />
          <Product 
            id={2}
            title="Aurion Synthetic Leather Punching Bag- with Free Chain Heavy Bag"
            price={1200}
            image="https://m.media-amazon.com/images/I/61wx9APxCcL._SL1334_.jpg"
            rating={4}
          />
          <Product 
            id={5}
            title="Lg 7 Kg 5 Star Inverter Fully-Automatic Top Loading Washing Machine "
            price={19000}
            image="https://m.media-amazon.com/images/I/61jhEDBPOaL._SL1500_.jpg"
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product 
            id={6}
            title="Samsung 125 cm (50 inches) 4K Ultra HD Smart LED TV UA50AU7700KLXL (Titan Gray) (2021 Model)
                   PurColor makes watching films feel almost like you're there. It enables the TV to express a huge range of colors for optimal picture performance, and an immersive viewing experience. "
            price={51000}
            image="https://m.media-amazon.com/images/I/61qZQqfzxjL._SL1500_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home