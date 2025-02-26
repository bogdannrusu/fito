import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";
import { Globe2, Coffee, Leaf, Sun } from "lucide-react";

const regions = [
  {
    icon: <Sun className="w-6 h-6" />,
    region: "Ethiopia",
    characteristics: "EthiopiaDesc",
    image: "https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/cJ7eysfrnnoxVuqi-generated_image.jpg"
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    region: "Colombia",
    characteristics: "ColombiaDesc",
    image: "https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/DLAYUZKcZi7gGgxO-generated_image.jpg"
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    region: "Brazil",
    characteristics: "BrazilDesc",
    image: "https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/eJ9lTII1b9NwTCHB-generated_image.jpg"
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    region: "Indonesia",
    characteristics: "IndonesiaDesc",
    image: "https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/BClOtiSfabNam3kS-generated_image.jpg"
  }
];

export const CoffeeOrigins = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground">{t("origins.discover")}</span>
          <h2 className="text-4xl font-bold mt-2">{t("origins.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t("origins.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((item) => (
            <motion.div
              key={item.region}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={t(`origins.regions.${item.region.toLowerCase()}`)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`origins.regions.${item.region.toLowerCase()}`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`origins.descriptions.${item.characteristics}`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};