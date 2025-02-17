import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderDetailsModal, CustomerDetails } from "./OrderDetailsModal";
import { CartSidebar } from "./CartSidebar";
import { createOrderItems, submitOrder } from "@/utils/cartUtils";

export type CartItem = {
  name: string;
  price: string;
  quantity: number;
  _id?: string;
};

type CartProps = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (name: string) => void;
};

const fetchGoods = async () => {
  const response = await fetch('http://localhost:4000/api/goods');
  if (!response.ok) {
    throw new Error('Failed to fetch goods');
  }
  return response.json();
};

export const Cart = ({ items, isOpen, onClose, onRemoveItem }: CartProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  const { data: goodsData } = useQuery({
    queryKey: ['goods'],
    queryFn: fetchGoods
  });

  const handleSubmitOrder = async (customerDetails: CustomerDetails) => {
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
      const orderItems = createOrderItems(items, goodsData);
      const total = items.reduce((sum, item) => 
        sum + (parseFloat(item.price) * item.quantity), 0);
  
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        items: orderItems,
        totalAmount: total,
        name: customerDetails.name,
        address: customerDetails.address,
        phone: customerDetails.phone
      };
  
      await submitOrder(orderData);
      
      toast({
        title: t("cart.orderSuccess"),
        description: t("cart.orderProcessing"),
      });
      
      setShowOrderModal(false);
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



  const handleOpenOrderModal = () => {
    setShowOrderModal(true);
    onClose();
  };


  
  return (
    <>
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
            <CartSidebar
              items={items}
              isOpen={isOpen}
              onClose={onClose}
              onRemoveItem={onRemoveItem}
              onOpenOrderModal={handleOpenOrderModal}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </AnimatePresence>

      <OrderDetailsModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={handleSubmitOrder}
        totalAmount={items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)}
      />
    </>
  );
};