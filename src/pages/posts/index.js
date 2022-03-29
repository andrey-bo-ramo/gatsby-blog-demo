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
  const [allPostsIds, setAllPostsIds] = useState([]);
  const [allNewestPostsIds, setAllNewestPostsIds] = useState([]);
  const [allFeaturedPostsIds, setAllFeaturedPostsIds] = useState([]);
  const [allNewestFeaturedPostsIds, setAllNewestFeaturedPostsIds] = useState(
    []
  );
  const [activePostsIds, setActivePostsIds] = useState([]);
  const posts = useMemo(() => {
    const arr = [...allPosts.nodes];
    const sortedArr = [...allPosts.nodes].sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      }
      return 0;
    });
    const all = {};
    const postsIds = [];
    const featuredIds = [];
    const newestIds = [];
    const newestFeaturedIds = [];
    arr.forEach((item) => {
      all[item.id] = {
        ...item,
      };
      postsIds.push(item.id);
      if (item.featured) {
        featuredIds.push(item.id);
      }
    });
    sortedArr.forEach((item) => {
      newestIds.push(item.id);
      if (item.featured) {
        newestFeaturedIds.push(item.id);
      }
    });
    setAllPostsIds(postsIds);
    setAllFeaturedPostsIds(featuredIds);
    setAllNewestPostsIds(newestIds);
    setAllNewestFeaturedPostsIds(newestFeaturedIds);

    setActivePostsIds(postsIds);
    return all;
  }, [allPosts]);

  const handleChangeShowFeatured = () => {
    const allPosts = isShowNewest ? allNewestPostsIds : allPostsIds;
    const sortedPosts = isShowNewest
      ? allNewestFeaturedPostsIds
      : allFeaturedPostsIds;
    setActivePostsIds(!isShowFeatured ? sortedPosts : allPosts);
    setIsShowFeatured(!isShowFeatured);
  };

  const handleChangeShowNewest = () => {
    const allPosts = isShowFeatured ? allFeaturedPostsIds : allPostsIds;
    const sortedPosts = isShowFeatured
      ? allNewestFeaturedPostsIds
      : allNewestPostsIds;
    setActivePostsIds(!isShowNewest ? sortedPosts : allPosts);
    setIsShowNewest(!isShowNewest);
  };

  const getFilteredArray = (value) => {
    const arr = [...allPosts.nodes]
      .filter((item) => item.slug.indexOf(value) >= 0)
      .map((item) => item.id);
    return arr;
  };

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    const filteredArrIds = getFilteredArray(value);
    console.log("filteredArrIds", filteredArrIds);
    console.log("value", value);
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
          {activePostsIds.map((id) => {
            const post = posts[id];
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
