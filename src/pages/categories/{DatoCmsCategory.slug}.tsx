import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../../components/page-layout";
import HeroPost from "../../components/hero-post";
import MoreStories from "../../components/more-stories";
import {
  ICategoryNode,
  IPostNode,
  IMetaTag,
  ITitleTag,
  ILinkTag,
} from "interfaces/common";

interface ICategoryPageProps {
  data: {
    posts: {
      nodes: IPostNode[];
    };
    blog: {
      seo: {
        tags: Array<IMetaTag | ITitleTag>;
      };
    };
    site: {
      favicon: {
        tags: Array<ILinkTag | IMetaTag>;
      };
    };
    category: ICategoryNode;
  };
}

export default function CategoryPage(props: ICategoryPageProps) {
  const { data } = props;
  const { posts, blog, site, category } = data;
  const heroPost = posts.nodes[0];
  const morePosts = posts.nodes.slice(1);

  return (
    <>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <PageLayout title={`Category/${category.name}`}>
        <>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      </PageLayout>
    </>
  );
}

export const query = graphql`
  query PostByCategory($slug: String) {
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
    category: datoCmsCategory(slug: { eq: $slug }) {
      name
    }
    posts: allDatoCmsPost(filter: { category: { slug: { eq: $slug } } }) {
      nodes {
        title
        slug
        excerpt
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
