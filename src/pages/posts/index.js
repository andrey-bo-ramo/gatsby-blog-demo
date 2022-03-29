import React, { useCallback, useMemo, useState } from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../../components/page-layout";
import PostPreview from "../../components/post-preview";
import PostsFilter from "../../components/posts-filter";
import usePosts from "../../hooks/usePosts";

export default function AllPosts({ data: { allPosts, blog, site } }) {
  const [isShowFeatured, setIsShowFeatured] = useState(false);
  const [isShowNewest, setIsShowNewest] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const posts = usePosts(allPosts.nodes);
  const { activePostsIds, values, getFilteredData } = posts;
  const { allPostsById } = values;

  const handleChangeShowFeatured = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      console.log(e);
      getFilteredData({
        isShowFeatured: isChecked,
        isShowNewest,
      });
      setIsShowFeatured(isChecked);
    },
    [getFilteredData, isShowNewest]
  );

  const handleChangeShowNewest = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      getFilteredData({
        isShowFeatured,
        isShowNewest: isChecked,
      });
      setIsShowNewest(isChecked);
    },
    [getFilteredData, isShowFeatured]
  );

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  console.log("searchValue", searchValue);

  return (
    <>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <PageLayout title="All Posts">
        <PostsFilter
          onChangeSearch={handleChangeSearch}
          onChangeFeatured={handleChangeShowFeatured}
          onChangeNewest={handleChangeShowNewest}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {activePostsIds.map((id) => {
            const post = allPostsById[id];
            return (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
                featured={post.featured}
              />
            );
          })}
        </div>
      </PageLayout>
    </>
  );
}

export const query = graphql`
  {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    blog: datoCmsBlog {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
      nodes {
        id
        title
        slug
        excerpt
        featured
        date
        coverImage {
          large: gatsbyImageData(width: 1500)
          small: gatsbyImageData(width: 760)
        }
        category {
          name
          slug
        }
        author {
          name
          picture {
            gatsbyImageData(
              layout: FIXED
              width: 48
              height: 48
              imgixParams: { sat: -100 }
            )
          }
        }
      }
    }
  }
`;
