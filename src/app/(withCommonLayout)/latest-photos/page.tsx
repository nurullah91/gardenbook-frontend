import RecentImageGallery from "@/src/components/ImageGallery/RecentImageGallery";
import { getLatestPhotos } from "@/src/services/Post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery with recent gardening photos",
};
export default async function LatestPhotos() {
  const photosData = await getLatestPhotos();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">
        Latest gardening photos
      </h1>
      <RecentImageGallery images={photosData?.data} />
    </div>
  );
}
