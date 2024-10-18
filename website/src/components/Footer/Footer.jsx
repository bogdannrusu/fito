import React from 'react'
import {
    FaFacebook,
    FaGoogle,
    FaInstagram,
    FaPhone,
    FaTelegram
} from 'react-icons/fa'
import { FaMapLocation } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Home from '../Hero/Hero'

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-primary to primaryDark pt-12 pb-8 text-white'>
     <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company Detail Section */} 
            <motion.div 
            initial={{ opacity:0, y:100 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delayay:0.2 }}
            viewport={{ once:true, amount:0.5 }}
            className='space-y-6'>
            <h1 className='text-3xl font-bold uppercase'> Fito Coffee </h1>
            <p className='text-sm max-w-[300px]'>

            FITO Coffee este o cafenea modernă și cozy, sunteti mereu binevenit aici la noi

            </p>
            <p className='flex items-center gap-2 mt-2'>
               <FaPhone />
            +373 69 69 69 69
            </p>
            <p className='flex items-center gap-2 mt-2'>
               {""}
               <FaMapLocation /> Singera, Chisinau, Moldova
            </p>
            </motion.div >

            {/* Footer Links Section */}
            <motion.div 
             initial={{ opacity:0, y:100 }}
             whileInView={{ opacity:1, y:0 }}
             transition={{ duration:0.6, delayay:0.2 }}
             viewport={{ once:true, amount:0.5 }}
            className='space-y-6'>
                <h1 className='text-3xl font-bold'>
                Quick Links
                </h1>
            <div className='grid grid-colsgrid-cols-2 gap-3'>
                    {/* First column section */}
                    <div>
                        <ul className='space-y-2'>
                            <li className={<Home />}>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                            <li>Home</li>
                        </ul>
                    </div>
                    {/* Second column section */}
                    <div>
                        <ul className='space-y-2'>
                            
                        </ul>
                    </div>
            </div>
            </motion.div>
                {/* Social Links Section */}
            <motion.div 
             initial={{ opacity:0, y:100 }}
             whileInView={{ opacity:1, y:0 }}
             transition={{ duration:0.6, delayay:0.2 }}
             viewport={{ once:true, amount:0.5 }}
            className='space-y-6'>
            <h1 className='text-3xl font-bold'> Follow Us </h1>
            <div className='flex items-center gap-3'>

                {/* Facebook */}
               <a href='https://www.facebook.com/bogdanvoeod01'> 
                    <FaFacebook className='text-3xl cursor-pointer' hover:scale-105 duration-300 /> 
               </a>

                {/* Instagram */}
               <a href='https://www.instagram.com/bogdann_rusu/'>
                    <FaInstagram className='text-3xl cursor-pointer' hover:scale-105 duration-300 />
               </a> 

                 {/* Telegram */}
               <a href='https://t.me/bogdannrusu'>
                     <FaTelegram className='text-3xl cursor-pointer' hover:scale-105 duration-300 />
               </a> 

               {/* Google */}
               <a href='https://www.google.com/search?q=fito+coffee&sca_esv=72aaa3890415b76e&sca_upv=1&sxsrf=ADLYWIIw6h7GEJR3Sl6IKWOBL6J8PcnuKA%3A1726577942276&ei=Fn3pZrO0EI6B9u8PzYyR-AE&ved=0ahUKEwizl7SHhMqIAxWOgP0HHU1GBB8Q4dUDCA8&uact=5&oq=fito+coffee&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2ZpdG8gY29mZmVlMgoQIxiABBgnGIoFMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIwgZQAFgAcAB4AJABAJgBcaABcaoBAzAuMbgBA8gBAPgBAZgCAaACgwGYAwDiAwUSATEgQJIHAzAuMaAH-gM&sclient=gws-wiz-serp'>
                    <FaGoogle className='text-3xl cursor-pointer' hover:scale-105 duration-300 />
               </a>
            </div>
            </motion.div>
            </div>
            {/* copyright section */}
            <motion.p 
             initial={{ opacity:0, y:100 }}
             whileInView={{ opacity:1, y:0 }}
             transition={{ duration:0.6, delayay:0.2 }}
             viewport={{ once:true, amount:0.5 }}
             className='text-white text-center mt-8 pt-8 border-t-2'>
                Copyright &copy; 2023 Fito Coffee. All Rights Reserved.
            </motion.p>
       
    </div>
    </div>
  )
}

export default Footer