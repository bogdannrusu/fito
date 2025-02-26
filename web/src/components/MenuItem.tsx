import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import { CartItem } from "./Cart";


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
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/BoRRaoZ45Z54smAE-generated_image.jpg';
      case 'latte special fito':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/Cxxhpgz920ug4pb9-generated_image.jpg';
      case 'americano special fito':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/CiGbTgreGLA6yc5z-generated_image.jpg';
      case 'cappuccino cu miere și scorțișoară':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/GklUvSo00TnXo8Q0-generated_image.jpg';
      case 'honey cinnamon cappuccino':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/dyFC6KM8OQW54Ujr-generated_image.jpg';
      case 'napoleon':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/mKPadGhzcXDBsETf-generated_image.jpg';
      case 'medovik':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/WFO8rpsAFwfmpBZy-generated_image.jpg';
      case 'tiramisu':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/31cC9OXRz7TrVT9B-generated_image.jpg';
      case 'croissant cu ciocolată':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/YJzjBmB3FPx1Wg7k-generated_image.jpg';
      case 'croissant cu fistic':
        return 'https://assets.grok.com/users/53ec2ee6-b705-4a66-94e5-61ceeb48869f/Tk6ZlVvc6oaPjbXh-generated_image.jpg';
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingCart = localStorage.getItem('cart');
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
      
      localStorage.setItem('cart', JSON.stringify(cartItems));

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
            <span className="font-medium">${item.price}</span>
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