import { useState, useEffect } from 'react';
import FrontImage from '../../assets/bg-slate.png';
import CoffeeMain from '../../assets/black.png';
import Navbar from '../Navbar/Navbar';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const bgImage = {
  backgroundImage: `url(${FrontImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Hero = () => {
  const [sidebar, setSidebar] = useState(false);

  // Add a useEffect to prevent default browser shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent opening browser developer tools (F12), default sidebars, etc.
      if (e.key === 'F12' || (e.ctrlKey && e.key === 'I')) {
        e.preventDefault();
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main style={bgImage} className="min-h-screen">
      <section className="min-h-screen w-full">
        <div className="container mx-auto">
          {/* Navbar section */}
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          
          {/* Hero section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center min-h-[80vh]">
            {/* Text content section */}
            <div className="text-lightOrange mt-[50px] md:mt-0 p-4 space-y-12 md:space-y-28">
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ml-6 md:ml-14 text-center md:text-left"
              >
                Fito
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
                className="relative text-center md:text-left"
              >
                <div className="relative z-10 space-y-4">
                  <h1 className="text-xl md:text-2xl">Black Lifestyle Lovers,</h1>
                  <p className="text-sm md:text-base opacity-75 leading-loose">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                  </p>
                </div>
                <div className="absolute -top-6 -left-10 w-[180px] h-[140px] md:w-[250px] md:h-[190px] bg-gray-700/25"></div>
              </motion.div>
            </div>

            {/* Image section */}
            <div className="relative">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
                src={CoffeeMain}
                className="relative z-40 h-[300px] md:h-[500px] lg:h-[800px] img-shadow"
                alt="Coffee Main"
              />
              {/* Orange Circle Bottle */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.8 }}
                className="h-[180px] w-[180px] absolute top-24 -right-16 border-primary border-[20px] rounded-full z-10"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.8 }}
                className="absolute -top-20 left-[120px] md:left-[200px] z-[1]"
              >
                <h1 className="text-[100px] md:text-[120px] lg:text-[140px] scale-150 font-bold text-darkGrey/40 leading-none">
                  Fito Coffee
                </h1>
              </motion.div>
            </div>

            {/* Third div section */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
              className="text-lightOrange mt-[50px] md:mt-0 p-4 space-y-12 md:space-y-28"
            >
              <div className="relative text-center md:text-left mt-[180px]">
                <div className="relative z-10 space-y-4">
                  <h1 className="text-xl md:text-2xl">Fito Coffee</h1>
                  <p className="text-sm md:text-base opacity-75 leading-loose">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </div>
                <div className="absolute -top-6 -right-10 w-[180px] h-[140px] md:w-[250px] md:h-[190px] bg-darkGrey/50"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidebar section */}
        {sidebar && (
          <motion.div
            initial={{ x: '100%' }}
            whileInView={{ x: 0 }}
            className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-b from-primary/80 to-primaryDark/80 backdrop-blur-sm z-10"
          >
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-6 text-white">
                <div className="w-[1px] h-[70px] bg-white"></div>
                {/* Social links */}
                <div className="inline-block p-2 rounded-full cursor-pointer border border-white">
                  <FaFacebookF className="text-2xl" />
                </div>
                <div className="inline-block p-2 rounded-full cursor-pointer border border-white">
                  <FaTwitter className="text-2xl" />
                </div>
                <div className="inline-block p-2 rounded-full cursor-pointer border border-white">
                  <FaInstagram className="text-2xl" />
                </div>
                <div className="w-[1px] h-[70px] bg-white"></div>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Hero;
