import React from "react";
import { StructuredText } from "react-datocms";
import PostGallery from "./post-gallery";
import { GatsbyImage } from "gatsby-plugin-image";

export default function PostBody({ content, gallery }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "DatoCmsImageBlock") {
              return (
                <>
                  {record.image && (
                    <GatsbyImage image={record.image.gatsbyImageData} alt="" />
                  )}
                  {record.gallery && <PostGallery images={record.gallery} />}
                </>
              );
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
