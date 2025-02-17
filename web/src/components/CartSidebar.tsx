import { Button } from "./ui/button";
import { X, Send, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CartItem } from "./Cart";
import { formatProductName } from "@/utils/cartUtils";

interface CartSidebarProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (name: string) => void;
  onOpenOrderModal: () => void;
  isSubmitting: boolean;
}

export const CartSidebar = ({ 
  items, 
  isOpen, 
  onClose, 
  onRemoveItem, 
  onOpenOrderModal,
  isSubmitting 
}: CartSidebarProps) => {
  const { t } = useTranslation();
  const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed right-0 top-0 h-full w-80 bg-background p-6 shadow-lg z-[101] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{t("cart.title")}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center">{t("cart.empty")}</p>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-grow space-y-4 overflow-y-auto">
            {items.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{formatProductName(item.name)}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveItem(item.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t mt-auto">
            <div className="flex justify-between font-semibold mb-4">
              <span>{t("cart.total")}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              onClick={onOpenOrderModal}
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? t("cart.submitting") : t("cart.submitOrder")}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};