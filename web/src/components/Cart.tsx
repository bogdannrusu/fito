import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Send, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

export type CartItem = {
  name: string;
  price: string;
  quantity: number;
};

type CartProps = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (name: string) => void;
};

export const Cart = ({ items, isOpen, onClose, onRemoveItem }: CartProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  const handleSubmitOrder = async () => {
    if (items.length === 0) {
      toast({
        title: t("cart.emptyOrderError"),
        description: t("cart.addItemsFirst"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = items.map(item => ({
        productId: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        subtotal: item.quantity * parseFloat(item.price)
      }));

      const orderData = {
        orderId: `ORD-${Date.now()}`,
        items: orderItems,
        totalAmount: total,
      };

      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      toast({
        title: t("cart.orderSuccess"),
        description: t("cart.orderProcessing"),
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: t("cart.orderError"),
        description: t("cart.tryAgain"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveItem = (name: string) => {
    onRemoveItem(name);
    toast({
      title: t("cart.itemRemoved"),
      description: t("cart.itemRemovedDesc"),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100]"
            onClick={onClose}
          />
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
                        <p className="font-medium">{t(`menu.items.${item.name.toLowerCase().replace(/\s+/g, '')}`)}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x ${item.price}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveItem(item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? t("cart.submitting") : t("cart.submitOrder")}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};