"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import TextEditor from "../TextEditor/TextEditor";
import { FieldValues } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import { Select, SelectItem } from "@nextui-org/select";
import { categories } from "@/src/config/categories";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: ModalProps) {
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState("Vegetable Gardening");
  const [postType, setPostType] = useState("free");

  const [images, setImages] = useState<File[] | []>([]);
  const [imagePreviews, setImageImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();

  const { mutate: handleCreatePost } = useCreatePost();

  const handleSubmit = () => {
    const formData = new FormData();

    const postData = {
      post: content,
      user: user?._id,
      category: postCategory,
      contentType: postType,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of images) {
      formData.append("image", image);
    }

    // Send postData to the API
    handleCreatePost(formData);
    onClose();
  };

  const handleImageChange = (e: FieldValues) => {
    const file = e.target.files[0];

    setImages((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Post
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    label="Select a category"
                    className="max-w-xs"
                    size="md"
                    radius="none"
                    variant="bordered"
                    placeholder="Vegetable Gardening"
                    onChange={(e) => setPostCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.key}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Content Type"
                    className="max-w-xs"
                    size="md"
                    radius="none"
                    variant="bordered"
                    placeholder="Free"
                    onChange={(e) => setPostType(e.target.value)}
                  >
                    <SelectItem key="free">Free</SelectItem>
                    <SelectItem key="premium">Premium</SelectItem>
                  </Select>
                </div>
                <TextEditor value={content} onChange={setContent} />
                <label
                  htmlFor="postImages"
                  className="cursor-pointer px-3 py-2 border border-dotted"
                >
                  Attach single or multiple image
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="postImages"
                  id="postImages"
                  multiple
                  onChange={(e) => handleImageChange(e)}
                />

                <div className="w-full flex gap-3 flex-wrap">
                  {imagePreviews?.map((image: string, index) => (
                    <div
                      key={index}
                      className="relative w-48 h-44 rounded-xl border-2 border-dashed"
                    >
                      <img
                        src={image}
                        alt="PostImage"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Dismiss
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
