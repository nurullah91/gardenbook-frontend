"use client";

import { useUser } from "@/src/context/user.provider";
import { useUpdateUserData } from "@/src/hooks/post.hook";
import { TUser } from "@/src/types";
import { useDisclosure } from "@nextui-org/modal";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import GBModal from "../../modal/GBModal";
import { Button } from "@nextui-org/button";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "@nextui-org/tooltip";
import GBForm from "../../form/GBForm";
import GBInput from "../../form/GBInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/src/schema";

export interface IActionButtonsProps {
  userData: TUser;
}
export default function ActionButtons({ userData }: IActionButtonsProps) {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultValues = {
    name: {
      firstName: userData.name.firstName,
      middleName: userData.name.middleName,
      lastName: userData.name.lastName,
    },
    address: userData.address,
    bio: userData.bio,
    phone: userData.phone,
  };

  const handleOpen = () => {
    onOpen();
  };

  const {
    mutate: updateUserData,
    isPending,
    isSuccess,
  } = useUpdateUserData(user?._id);

  const handleSubmit = (values: FieldValues) => {
    // Send postData to the API
    updateUserData(JSON.stringify(values));
    if (!isPending && isSuccess) {
      toast.success("Cover photo updated Successfully");
    }
    onClose();
  };

  return (
    <div className="flex gap-2 items-center">
      {user?._id === userData?._id && (
        <div>
          {userData?.plan === "basic" && userData?.totalUpvoteGained === 0 && (
            <div>
              <Button
                isDisabled={userData.totalDownvoteGained > 1}
                radius="sm"
                size="sm"
                color="primary"
              >
                Get Premium
              </Button>
            </div>
          )}
          {userData?.plan === "premium" && (
            <div>
              <Button radius="sm" size="sm" color="primary" isDisabled>
                Your premium access will end {userData.planValidity}
              </Button>
            </div>
          )}
        </div>
      )}

      {user?._id === userData._id && (
        <div>
          <GBModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle="Change profile picture"
            footerCancelButtonText="Cancel"
          >
            <GBForm
              resolver={zodResolver(updateUserSchema)}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            >
              <GBInput required label="First Name" name="name.firstName" />
              <GBInput label="Middle Name" name="name.middleName" />
              <GBInput required label="Last Name" name="name.lastName" />
              <GBInput required label="Phone" name="phone" />
              <GBInput required label="Address" name="address" />
              <GBInput required label="Bio" name="bio" />

              <Button
                className="mt-3"
                isDisabled={isPending}
                radius="sm"
                size="sm"
                color="primary"
                type="submit"
              >
                {isPending ? "Loading..." : "Update"}
              </Button>
            </GBForm>
          </GBModal>

          <Tooltip content="Edit Info">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={handleOpen}
            >
              <FaEdit className="text-3xl" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}