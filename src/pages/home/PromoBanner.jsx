import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container' aria-label="Promotions">
      
      {/* 📌 Kostenloser Versand */}
      <article className='banner__card'>
        <span>
          <i className="ri-truck-line" aria-hidden="true"></i>
        </span>
        <h4>Free Delivery</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, saepe?</p>
      </article>

      {/* 📌 Geld-zurück-Garantie */}
      <article className='banner__card'>
        <span>
          <i className="ri-money-dollar-circle-line" aria-hidden="true"></i>
        </span>
        <h4>100% Money Back Guarantee</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, voluptatum.</p>
      </article>

      {/* 📌 Starker Kundensupport */}
      <article className='banner__card'>
        <span>
          <i className="ri-user-voice-line" aria-hidden="true"></i>
        </span>
        <h4>Strong Support</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, repellat!</p>
      </article>

    </section>
  )
}

export default PromoBanner
