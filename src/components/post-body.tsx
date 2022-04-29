import React from "react";
import {
  StructuredText,
  StructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord,
} from "react-datocms";
import PostGallery from "./post-gallery";
import { GatsbyImage } from "gatsby-plugin-image";
import PostCarousel from "./post-carousel";
import { IDatoCmsGalleryBlock, IDatoCmsQueryBlock } from "interfaces/common";

export default function PostBody({
  content,
}: {
  content: StructuredTextGraphQlResponse;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({
            record,
          }: {
            record: IDatoCmsGalleryBlock | IDatoCmsQueryBlock;
          }) => {
            if (record.__typename === "DatoCmsImageBlock") {
              return (
                <GatsbyImage image={record.image.gatsbyImageData} alt="" />
              );
            }
            if (record.__typename === "DatoCmsGalleryBlock") {
              if (record.gallery.length < 2) {
                return (
                  <GatsbyImage
                    image={record.gallery[0].gatsbyImageData}
                    alt=""
                  />
                );
              } else if (record.gallery.length < 3) {
                return <PostGallery images={record.gallery} />;
              }
              return <PostCarousel images={record.gallery} />;
            }
            if (record.__typename === "DatoCmsQueryBlock") {
              return <p className="text-7xl text-red-700">{record.query}</p>;
            }
            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
