import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MenuCategory } from "./MenuCategory";

const menuItems = [
  {
    category: "SignatureDrinks",
    items: [
      {
        name: "FitoSpecialLatte",
        price: "5.50",
        description: "Our signature blend with vanilla and caramel",
        image: "/placeholder.svg"
      },
      {
        name: "HoneyCinnamonCappuccino",
        price: "4.90",
        description: "Local honey and Ceylon cinnamon",
        image: "/placeholder.svg"
      },
    ]
  },
  {
    category: "ClassicCoffee",
    items: [
      {
        name: "Espresso",
        price: "3.00",
        description: "Single shot of our house blend",
        image: "/placeholder.svg"
      },
      {
        name: "Americano",
        price: "3.50",
        description: "Espresso with hot water",
        image: "/placeholder.svg"
      },
    ]
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Tiramisu",
        price: "6.50",
        description: "Classic Italian coffee-flavored dessert",
        image: "/placeholder.svg"
      },
      {
        name: "ChocolateCroissant",
        price: "4.00",
        description: "Buttery croissant with rich chocolate filling",
        image: "/placeholder.svg"
      },
    ]
  }
];

export const Menu = () => {
  const { t } = useTranslation();

  return (
    <section id="menu" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            {t("menu.discover")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold mt-2"
          >
            {t("menu.ourMenu")}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {menuItems.map((category) => (
            <MenuCategory key={category.category} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};