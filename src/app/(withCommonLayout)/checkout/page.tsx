import CheckoutForm from "@/src/components/UI/Checkout/CheckoutForm";
import React from "react";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
