"use client";

import { IoCamera } from "react-icons/io5";
import GBModal from "../../modal/GBModal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useUpdateProfilePicture } from "@/src/hooks/post.hook";
import { TUser } from "@/src/types";
import { IoMdAdd } from "react-icons/io";

export interface IChangeProfileProps {
  userData: TUser;
}
export default function ChangeProfile({ userData }: IChangeProfileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newImage, setImage] = useState<File | null>(null);
  const [imagePreview, setImageImagePreview] = useState<string>("");

  const { user } = useUser();

  const handleOpen = () => {
    onOpen();
  };

  const {
    mutate: handleUpdateProfilePicture,
    isPending,
    isSuccess,
  } = useUpdateProfilePicture(user?._id);

  const handleSubmit = () => {
    const formData = new FormData();

    if (newImage) {
      formData.append("image", newImage);
    }

    // Send postData to the API
    handleUpdateProfilePicture(formData);
    if (!isPending && isSuccess) {
      toast.success("Cover photo updated Successfully");
    }
    onClose();
  };

  const handleImageChange = (e: FieldValues) => {
    const file = e.target.files[0];

    setImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <GBModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Change profile picture"
        footerCancelButtonText="Cancel"
        footerExtraButton={
          <Button color="primary" isDisabled={isPending} onClick={handleSubmit}>
            {isPending ? "Loading..." : "Change Photo"}
          </Button>
        }
      >
        <label
          htmlFor="postImages"
          className="cursor-pointer px-3 py-2 border border-dashed flex items-center justify-center"
        >
          <IoMdAdd className="text-4xl" />
        </label>
        <input
          className="hidden"
          type="file"
          name="postImages"
          id="postImages"
          onChange={(e) => handleImageChange(e)}
        />

        <div className="w-full flex gap-3 mt-4 flex-wrap">
          <div className="relative w-48 h-48  rounded-xl border-2 bg-gray-500 mx-auto">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="PostImage"
                className="w-full h-full rounded-full"
              />
            )}
          </div>
        </div>
      </GBModal>
      {user?._id === userData._id && (
        <div className="bg-gray-300 p-1 rounded-full">
          <Tooltip content="Change profile photo">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={handleOpen}
            >
              <IoCamera className="text-3xl" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}