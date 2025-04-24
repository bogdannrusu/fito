import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import { CartItem } from "./Cart";
import Cookies from "js-cookie";


import getAmericanoImage from "../../public/americano.jpg";
import simpleAmericanoImage from "../../public/americanoNew.jpg";
import getEspressoImage from "../../public/espresso.jpg";
import getLatteImage from "../../public/latte.jpg";
import getCappuccinoImage from "../../public/capuccinno.jpg";
import getCroissantCiocolataImage from "../../public/croissant cu ciocolata.jpg";
import getHoneyCinnamonCappuccinoImage from "../../public/honeycinnamoncappuccino.jpg";
import getCroissantPistachioImage from "../../public/croissant cu fistic.jpg";
import getMedovikImage from "../../public/medovik.jpg";
import getNapoleonImage from "../../public/napoleon.jpg";
import getTiramisuImage from "../../public/tiramisu.jpg";


type MenuItemProps = {
  item: {
    name: string;
    price: string;
    description: string;
    image: string;
    _id?: string;
  };
};

export const MenuItem = ({ item }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Funcție pentru a returna imaginea corectă bazată pe numele produsului
  const getProductImage = (name: string): string => {
    switch (name.toLowerCase()) {
      case 'espresso':
        return getEspressoImage;
      case 'americano':
        return simpleAmericanoImage;
      case 'latte special fito':
        return getLatteImage;
      case 'americano special fito':
        return getAmericanoImage;
      case 'cappuccino cu miere și scorțișoară':
        return getCappuccinoImage;
      case 'honey cinnamon cappuccino':
        return getHoneyCinnamonCappuccinoImage;
      case 'napoleon':
        return getNapoleonImage;
      case 'medovik':
        return getMedovikImage;
      case 'tiramisu':
        return getTiramisuImage;
      case 'croissant cu ciocolată':
        return getCroissantCiocolataImage;
      case 'croissant cu fistic':
        return getCroissantPistachioImage;
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingCart = Cookies.get('cart');
      const cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
      
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
      
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({
          name: item.name,
          price: item.price,
          quantity: quantity,
          _id: item._id
        });
      }
      
      Cookies.set('cart', JSON.stringify(cartItems), { secure: true, sameSite: 'strict' });

      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cart',
        newValue: JSON.stringify(cartItems)
      }));

      toast({
        title: t("menu.addedToCart"),
        description: t("menu.itemsAdded", { 
          quantity, 
          name: item.name
        }),
      });
      
      setQuantity(0);
    }
  };

  // Folosim funcția pentru a obține imaginea specifică
  const imageUrl = getProductImage(item.name);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={imageUrl}
          alt={item.name}
          className="w-full md:w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">
                {item.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <span className="font-medium">{item.price} lei</span>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
              disabled={quantity === 0}
              className="ml-auto"
            >
              {t("menu.addToCart")}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};