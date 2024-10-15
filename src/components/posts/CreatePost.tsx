import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import { FieldValues } from "react-hook-form";
import GBModal from "../modal/GBModal";

import TextEditor from "../TextEditor/TextEditor";
import { Select, SelectItem } from "@nextui-org/select";
import { categories } from "@/src/config/categories";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

export interface ICreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreatePostModal({ isOpen, onClose }: ICreatePostProps) {
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState("Vegetable Gardening");
  const [postType, setPostType] = useState("free");

  const [images, setImages] = useState<File[] | []>([]);
  const [imagePreviews, setImageImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();

  const { mutate: handleCreatePost, isPending, isSuccess } = useCreatePost();

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
    if (!isPending && isSuccess) {
      toast.success("Post Created Successfully");
    }
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
    <div>
      <GBModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Create New Post"
        footerCancelButtonText="Cancel"
        footerExtraButton={
          <Button color="primary" isDisabled={isPending} onClick={handleSubmit}>
            {isPending ? "Loading..." : "Post"}
          </Button>
        }
      >
        <div>
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
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
            {user?.plan === "premium" ? (
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
            ) : (
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
              </Select>
            )}
          </div>
          <div className="mt-2 mb-3">
            <TextEditor value={content} onChange={setContent} />
          </div>

          <label
            htmlFor="postImages"
            className="cursor-pointer px-3 py-2 border border-dotted w-full"
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

          <div className="w-full flex gap-3 mt-4 flex-wrap">
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
        </div>
      </GBModal>
    </div>
  );
}
