/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import IceCoffee from '../../assets/coffee/ice-coffee.png'
import Cappucino from '../../assets/coffee/latte.png'
import Mokachino from '../../assets/coffee/moccacino.jpg'

const ServiceData = [
  {
    id: 1,
    image: IceCoffee,
    title: 'Ice Coffee',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    image: Cappucino,
    title: 'Latte',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 3,
    image: Mokachino,
    title: 'Moccachino',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },  
  {
    id: 3,
    image: Mokachino,
    title: 'Moccachino',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.9,
      delay: 1
    },
  }
}

const cardVariants = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 10,
        ease: "easeInOut"
      }
    
    },
}

 const Services = () => {
  return (
    <div className=' container my-16 space-y-4'>
      {/* Header Section */}
      <div className='text-center max-w-lg mx-auto space-y-2'>
      <motion.h1 
           initial = {{ opacity: 0, y: -100 }}
           animate = {{ opacity: 1, y: 0 }}
           transition = {{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
      className='text-3xl font-bold text-lightGrey'>
        Fresh and <span className='text-primary'> Tasty Coffee </span>
      </motion.h1>
      <motion.p 
           initial = {{ opacity: 0, scale: 0 }}
           whileInView={{ opacity: 1, scale: 1 }}
           animate = {{ opacity: 1, y: 0 }}
           transition = {{ type: 'spring', stiffness: 100, damping: 10, delay: 0.4 }}
      className='text-sm opacity-50'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
      </motion.p>
      </div> 
      {/* Card Section */}
      <motion.div 
      variants={ containerVariants } 
      initial = "hidden"
      whileInView={"visible"}
      viewport={{ amount: 0.6 }}
      className='grid grid-cols-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      { ServiceData.map((service) => (
        <motion.div 
        variants={ cardVariants }
        initial = "hidden"
        whileInView={"visible"}
        viewport={{ amount: 0.6 }}
        className='text-center p-4 space-y-6'>
          <img
          src={service.image}
          alt=''
          className='img-shadow2 max-w-[200px] mx-auto hover:scale-110 duration-300 cursor-pointer'
          />
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-primary'>{service.title}</h1>
            <p className='text-darkGrey'>{service.description}</p>
            </div>
        </motion.div>
      ))}      
      </motion.div>
     </div>
  )
}

export default Services