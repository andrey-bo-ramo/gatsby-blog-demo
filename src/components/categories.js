import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function Categories(props) {
  const { data } = props;

  return (
    <div className="px-2 pt-2 pb-3 flex items-stretch justify-between flex-wrap">
      {data.map(({ slug, name, image }) => (
        <Link
          key={`category-item-${slug}`}
          to={`/categories/${slug}`}
          className="block relative overflow-hidden w-1/2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          <div className="h-48 relative overflow-hidden">
            <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <GatsbyImage
                image={image.small}
                alt={`Cover Image for ${name}`}
              />
            </div>
          </div>

          <p className="text-center">{name}</p>
        </Link>
      ))}
    </div>
  );
}
