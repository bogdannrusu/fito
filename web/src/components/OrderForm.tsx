import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const formFields = [
  { label: "Name", type: "text", key: "name" },
  { label: "Email", type: "email", key: "email" },
  { label: "Drink", type: "text", key: "drink" },
];

export const OrderForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    drink: "",
    size: "medium",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Received",
      description: "We'll prepare your drink right away!",
    });
  };

  return (
    <section id="order" className="py-24">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            Ready to Order?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold mt-2"
          >
            Place Your Order
          </motion.h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {formFields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium">{field.label}</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type={field.type}
                required
                className="w-full px-4 py-2 rounded-lg border bg-background"
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">Size</label>
            <motion.select
              whileFocus={{ scale: 1.01 }}
              className="w-full px-4 py-2 rounded-lg border bg-background"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </motion.select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">Special Instructions</label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              className="w-full px-4 py-2 rounded-lg border bg-background min-h-[100px]"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            type="submit"
          >
            Place Order
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};