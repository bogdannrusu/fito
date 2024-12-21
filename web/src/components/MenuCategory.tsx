import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MenuItem } from "./MenuItem";

type MenuCategoryProps = {
  category: {
    category: string;
    items: Array<{
      name: string;
      price: string;
      description: string;
      image: string;
    }>;
  };
};

export const MenuCategory = ({ category }: MenuCategoryProps) => {
  const { t } = useTranslation();
  
  // Convert category key to lowercase for consistent translation lookup
  const categoryKey = category.category.toLowerCase().replace(/([A-Z])/g, " $1").trim().replace(/\s+/g, "");
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-semibold text-center">
        {t(`menu.categories.${categoryKey}`)}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {category.items.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  );
};