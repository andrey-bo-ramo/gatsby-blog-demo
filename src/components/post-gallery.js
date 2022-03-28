import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export default function PostGallery(props) {
  const { images } = props;

  return (
    <div className="py-3">
      <p className="text-center text-lg mb-2">Gallery</p>
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
