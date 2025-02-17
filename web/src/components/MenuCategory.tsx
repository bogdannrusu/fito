import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

type MenuCategoryProps = {
  category: {
    category: string;
    items: Array<{
      name: string;
      price: string;
      description: string;
      image: string;
      _id?: string;
    }>;
  };
};

export const MenuCategory = ({ category }: MenuCategoryProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-semibold text-center">
        {category.category}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {category.items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </motion.div>
  );
};