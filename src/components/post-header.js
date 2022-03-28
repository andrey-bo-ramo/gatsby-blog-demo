import React from "react";
import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import { LikeButton, DislikeButton } from "./button";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  featured,
}) {
  return (
    <>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author?.name} picture={author?.picture} />
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} fluid={coverImage?.gatsbyImageData} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
        {featured && (
          <div className="flex space-x-5 mb-5">
            <LikeButton text="Likes" />
            <DislikeButton text="Dislike" />
          </div>
        )}
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
