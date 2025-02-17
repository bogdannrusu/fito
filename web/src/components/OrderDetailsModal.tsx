import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerDetails: CustomerDetails) => void;
  totalAmount: number;
}

export interface CustomerDetails {
  name: string;
  address: string;
  phone: string;
}

export const OrderDetailsModal = ({ isOpen, onClose, onSubmit, totalAmount }: OrderDetailsModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    address: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      toast({
        title: t("order.error"),
        description: t("order.fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    onSubmit(customerDetails);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("order.completeDetails")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("order.name")}</Label>
            <Input
              id="name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              placeholder={t("order.namePlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">{t("order.address")}</Label>
            <Input
              id="address"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, address: e.target.value })
              }
              placeholder={t("order.addressPlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("order.phone")}</Label>
            <Input
              id="phone"
              value={customerDetails.phone}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, phone: e.target.value })
              }
              placeholder={t("order.phonePlaceholder")}
            />
          </div>
          <div className="pt-4 text-right space-y-2">
            <div className="font-medium">
              {t("order.total")}: ${totalAmount.toFixed(2)}
            </div>
            <Button type="submit" className="w-full">
              {t("order.confirmOrder")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};