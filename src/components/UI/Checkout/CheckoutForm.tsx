"use client";

import { useUser } from "@/src/context/user.provider";
import { useMakePayment } from "@/src/hooks/payment.hooks";
import { getDateThirtyDaysFromToday } from "@/src/utils/getDateThirtyDaysFromToday";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../LoadingAnimation";

export interface ICheckoutFormProps {}

export default function CheckoutForm({}: ICheckoutFormProps) {
  const { user } = useUser();
  const router = useRouter();

  const {
    mutate: handleMakePayment,
    isPending,
    isSuccess,
    data,
  } = useMakePayment();

  const handlePayment = () => {
    const paymentData = {
      user: user?._id,
      email: user?.email,
      paymentMethod: "AmarPay",
      amount: 500,
    };

    handleMakePayment(JSON.stringify(paymentData));
  };

  if (isSuccess && data?.data?.payment_url) {
    router.push(data?.data?.payment_url);
  }

  return (
    <div className="shadow-md rounded p-4">
      {isPending && <LoadingAnimation />}
      <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
      <div className="table w-full">
        <div className="table-row-group">
          <div className="table-row">
            <p className="table-cell font-medium p-2">Name:</p>
            <div className="table-cell p-2">
              {user?.name?.firstName} {user?.name?.middleName}{" "}
              {user?.name?.lastName}
            </div>
          </div>
          <div className="table-row">
            <p className="table-cell font-medium p-2">Email:</p>
            <p className="table-cell p-2">{user?.email}</p>
          </div>
          <div className="table-row">
            <p className="table-cell font-medium p-2">Phone:</p>
            <p className="table-cell p-2">{user?.phone}</p>
          </div>
          <div className="table-row">
            <p className="table-cell font-medium p-2">Validity:</p>
            <p className="table-cell p-2">30 Days</p>
          </div>
          <div className="table-row">
            <p className="table-cell font-medium p-2">Will expires at:</p>
            <p className="table-cell p-2">{getDateThirtyDaysFromToday()}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={handlePayment} color="primary" isDisabled={isPending}>
          Pay 500 ৳
        </Button>
      </div>
    </div>
  );
}
