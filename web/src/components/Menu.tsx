import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MenuCategory } from "./MenuCategory";
import { useQuery } from "@tanstack/react-query";

import getAmericanoImage from "../../public/americano.jpg";
import getEspressoImage from "../../public/espresso.jpg";
import getLatteImage from "../../public/latte.jpg";
import getCappuccinoImage from "../../public/capuccinno.jpg";
import getCroissantCiocolataImage from "../../public/croissant cu ciocolata.jpg";
import getCroissantPistachioImage from "../../public/croissant cu fistic.jpg";
import getMedovikImage from "../../public/medovik.jpg";
import getNapoleonImage from "../../public/napoleon.jpg";
import getTiramisuImage from "../../public/tiramisu.jpg";

interface Good {
  _id: string;
  good_name: string;
  good_description: string;
  good_price: number;
  category: string;
}

interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
  _id: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const LOCAL_API_URL = 'http://localhost:4000/api';
const WEB_API_URL = 'https://fito-api.vercel.app/api';


const fetchGoods = async () => {
  const response = await fetch(WEB_API_URL + '/goods');
  if (!response.ok) {
    throw new Error('Failed to fetch goods');
  }
  return response.json();
};

// Obiect care mapează numele produselor la imaginile lor specifice
const getProductImage = (goodName: string): string => {
  switch (goodName.toLowerCase()) {
    case 'espresso':
      return getEspressoImage;
    case 'fitospeciallatte':
      return getLatteImage;
    case 'cappuccino':
      return getCappuccinoImage;
    case 'americano':
      return getAmericanoImage;
    case 'napoleon':
      return getNapoleonImage;
    case 'medovik':
      return getMedovikImage;
    case 'tiramisu':
      return getTiramisuImage;
    case 'croissant cu fistic':
      return getCroissantPistachioImage;
    case 'croissant cu ciocolata':
      return getCroissantCiocolataImage;
  }
};

const organizeGoodsByCategory = (goods: Good[]): MenuCategory[] => {
  const categories = goods.reduce((acc: { [key: string]: MenuItem[] }, good: Good) => {
    const category = good.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      name: good.good_name,
      price: good.good_price.toString(),
      description: good.good_description || "",
      image: getProductImage(good.good_name), // Folosim funcția pentru a seta imaginea
      _id: good._id
    });
    return acc;
  }, {});

  return Object.entries(categories).map(([category, items]) => ({
    category,
    items
  }));
};

export const Menu = () => {
  const { t } = useTranslation();

  const { data: goods, isLoading, error } = useQuery({
    queryKey: ['goods'],
    queryFn: fetchGoods
  });

  const menuItems = goods ? organizeGoodsByCategory(goods) : [];

  if (isLoading) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-24 text-center text-red-500">Error loading menu items</div>;
  }

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