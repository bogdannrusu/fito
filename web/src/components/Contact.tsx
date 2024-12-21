import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground">{t("contact.visit")}</span>
          <h2 className="text-4xl font-bold mt-2">{t("contact.getInTouch")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("contact.location")}</h3>
              <p className="text-muted-foreground">{t("contact.address")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t("contact.hours")}</h3>
              <p className="text-muted-foreground">{t("contact.weekdayHours")}</p>
              <p className="text-muted-foreground">{t("contact.weekendHours")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t("contact.contact")}</h3>
              <p className="text-muted-foreground">{t("contact.phone")}</p>
              <p className="text-muted-foreground">{t("contact.email")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] rounded-lg overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d796.8388024465632!2d28.85311007575567!3d46.97697311438239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97936a5d00001%3A0x800b71c4bc3a15db!2z0JTQvtCx0YDQsNGPINCc0L7Qu9C00LDQstC40Y8!5e1!3m2!1sro!2s!4v1734252652415!5m2!1sro!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("contact.mapTitle")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};