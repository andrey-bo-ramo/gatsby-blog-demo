import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

export default function AllPosts({ data: { allPosts } }) {
  const [isShowFeatured, setIsShowFeatured] = useState(false);
  console.log("allPosts", allPosts);
  const posts = useMemo(() => {
    return isShowFeatured
      ? allPosts.nodes.filter((item) => item.featured)
      : allPosts.nodes;
  }, [isShowFeatured]);

  const handleChangeShowFeatured = () => {
    setIsShowFeatured(!isShowFeatured);
  };

  return (
    <>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
          to={`/`}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Main Page
        </Link>
      </div>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          All Posts.
        </h1>
      </section>
      <label>
        <span>Show only featured posts</span>
        <input type="checkbox" onChange={handleChangeShowFeatured} />
      </label>
      {posts.map((item) => (
        <div key={item.title}>{item.title}</div>
      ))}
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
