import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { makePayment } from "../services/User";

export const useMakePayment = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["MAKE_PAYMENT"],
    mutationFn: async (postData) => await makePayment(postData),

    onSuccess: () => {
      toast.success("Redirecting to payment getaway...");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
