import React, { useMemo, useState } from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../../components/page-layout";
import PostPreview from "../../components/post-preview";
import PostsFilter from "../../components/posts-filter";

export default function AllPosts({ data: { allPosts, blog, site } }) {
  const [isShowFeatured, setIsShowFeatured] = useState(false);
  const [isShowNewest, setIsShowNewest] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const posts = useMemo(() => {
    let arr = allPosts.nodes;
    if (isShowFeatured) {
      arr = arr.filter((item) => item.featured);
    }
    if (isShowNewest) {
      const oneDay = 86400 * 1000 * 1;
      arr = arr.filter((item) => {
        if (new Date().getTime() - new Date(item.date).getTime() < oneDay) {
          return true;
        }
        return false;
      });
    }
    if (searchValue) {
      arr = arr.filter((item) => {
        if (item.slug.indexOf(searchValue) >= 0) {
          return true;
        }
        return false;
      });
    }
    return arr;
  }, [isShowFeatured, isShowNewest, searchValue, allPosts.nodes]);

  const handleChangeShowFeatured = () => {
    setIsShowFeatured(!isShowFeatured);
  };

  const handleChangeShowNewest = () => {
    setIsShowNewest(!isShowNewest);
  };

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

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
          {posts.map((post) => (
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
          ))}
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
