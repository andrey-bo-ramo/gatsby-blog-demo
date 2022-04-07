import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface IAvatarProps {
  name: string;
  picture: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export default function Avatar({ name, picture }: IAvatarProps) {
  return (
    <div className="flex items-center">
      <GatsbyImage
        image={picture.gatsbyImageData}
        className="w-12 h-12 rounded-full mr-4"
        alt={`Photo of ${name}`}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
