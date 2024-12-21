import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
          alt={t("hero.imageAlt")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 text-sm border border-white/20 rounded-full mb-6 backdrop-blur-sm">
            {t("hero.welcome")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
            {t("hero.subtitle")}
          </p>
          <motion.button
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("hero.explore")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};