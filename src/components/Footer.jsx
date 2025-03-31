import React from 'react'

// Importiere die Bilder für den Instagram-Bereich
import instagram1 from '../assets/instagram-1.jpg'
import instagram2 from '../assets/instagram-2.jpg'
import instagram3 from '../assets/instagram-3.jpg'
import instagram4 from '../assets/instagram-4.jpg'
import instagram5 from '../assets/instagram-5.jpg'
import instagram6 from '../assets/instagram-6.jpg'

const Footer = () => {
  return (
    <>
      <footer className='section__container footer__container'>
        {/* Kontaktinformationen */}
        <div className='footer__col'>
          <h4>CONTACT INFO</h4>
          <p>
            <span><i className="ri-map-pin-fill text-primary"></i></span>
            123, London Bridge Street, London
          </p>
          <p>
            <span><i className="ri-mail-fill text-primary"></i></span>
            support@minerva.com
          </p>
          <p>
            <span><i className="ri-phone-fill text-primary"></i></span>
            (+0149) 15906489213
          </p>
        </div>

        {/* Unternehmenslinks */}
        <div className='footer__col'>
          <h4>COMPANY</h4>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Work With Us</a>
          <a href="#">Our Blog</a>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* Nützliche Links */}
        <div className='footer__col'>
          <h4>USEFUL LINKS</h4>
          <a href="#">Help</a>
          <a href="#">Track My Order</a>
          <a href="#">Work With Us</a>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Dresses</a>
        </div>

        {/* Instagram-Bereich */}
        <div className='footer__col'>
          <h4>INSTAGRAM</h4>
          <div className='instagram__grid'>
            <img src={instagram1} alt="Instagram 1" />
            <img src={instagram2} alt="Instagram 2" />
            <img src={instagram3} alt="Instagram 3" />
            <img src={instagram4} alt="Instagram 4" />
            <img src={instagram5} alt="Instagram 5" />
            <img src={instagram6} alt="Instagram 6" />
          </div>
        </div>
      </footer>

      {/* Copyright-Bereich */}
      <div className='footer__bar'>
        &copy; 2025 Web Design Mastery. All rights reserved.
      </div>
    </>
  )
}

export default Footer
