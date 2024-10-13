"use client";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";

interface IImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: IImageGalleryProps) {
  return (
    <div>
      <LightGallery
        elementClassNames={` mt-2 gap-2 grid place-items-center ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} `}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {images.map((image, index) => (
          <Link
            href={image}
            key={image}
            className={`w-full ${images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"}`}
          >
            <Image
              src={image}
              width={500}
              height={500}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRpgDAABXRUJQVlA4WAoAAAAgAAAAcAAAcAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggqgEAABANAJ0BKnEAcQA+tU6fSrK0raIvFeuKkBaJZQaDvQ/AhvSLT/+ASwES6to3yr/0qmB8hsuzbm9+XNYKLb3+/fyHqZZKb3PJOoUpK8ULird18cd5nqYc6mPscyaXVAkitqurJVtWiKge3fxx0UfKZ2+gAP7v0b6k9PoWtzcSQ9BS0ArJMoVr3v4MknKcYNYKKcy+L6kkNF/fn/4GT2S5lqKhkarIgTZIfoIUzaB9IeIHjv3aNCp3Ojmiu409BG4CiWv+FFxs5OeUV+1edrP1tBx2P3K9heywDtC3wjTZN7rpgu1PIIK79Pt/dwiM1Lg6gOKHjkyRuu1qAmIzXE32Igv+m5E01oJrJadM7idB7iyGeJBwZVLHLV7ZmNYo5sq0O3nQWsLD7ju3xn8iFG7vyuyT5uG52eA8/tNmh9bViJvjW6x6DUH3U4EkDLXTEtEc9eJd+pT0TrV+fqZKsnIS3/ClOF8aQZLGcPowhEfNQoDsChBvjrxIbVkc6aQ3LsVKw53wMuvPyYXW4OvHbHYPmt/Aln2BOA4uxyfDa8bwjIDiIAeP7oJB+gAAAA=="
              alt={`image-${index + 1}`}
            />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
}
