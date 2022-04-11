import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface IPostGalleryProps {
  images: Array<{ gatsbyImageData: IGatsbyImageData }>;
}

export default function PostGallery(props: IPostGalleryProps) {
  const { images } = props;

  return (
    <div className="py-3">
      <div className="grid grid-cols-2 gap-2">
        {images.map((item, i) => (
          <div key={`gallery-item-${i}`}>
            <GatsbyImage image={item.gatsbyImageData} alt={`Cover Image for`} />
          </div>
        ))}
      </div>
    </div>
  );
}
