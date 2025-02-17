import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#1A1F2C] text-white mt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">{t("footer.title")}</h3>
            <p className="text-gray-300">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
            {[
               { Icon: Facebook, link: "https://www.facebook.com/bogdanvoeod01" },
               { Icon: Instagram, link: "https://www.instagram.com/bogdann_rusu/" },
               { Icon: Linkedin, link: "https://www.linkedin.com/in/bogdann-rusu/" },
             ].map(({ Icon, link }, index) => (
           <motion.a
            key={index}
             href={link}
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-primary transition-colors"
             whileHover={{ scale: 1.2 }}
             whileTap={{ scale: 0.9 }}
           >
      <Icon className="h-5 w-5" />
    </motion.a>
  ))}
</div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">{t("footer.openingHours")}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t("footer.weekdayHours")}</li>
              <li>{t("footer.saturdayHours")}</li>
              <li>{t("footer.sundayHours")}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {["menu", "orderOnline", "contactUs"].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`#${link}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t(`footer.links.${link}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-400 text-sm"
        >
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </motion.div>
      </div>
    </motion.footer>
  );
};