import React from "react";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../components/page-layout";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface ILinkTagAttr {
  href: string;
  rel: string;
  sizes: string;
}

interface IMetaTagAttr {
  content: string;
  name: string;
}

interface ILinkTag {
  tagName: string;
  attributes: ILinkTagAttr;
}

interface IMetaTag {
  tagName: string;
  attributes: IMetaTagAttr;
}

interface ITitleTag {
  tagName: string;
  content: string;
}

interface IPostNodeAuthor {
  name: string;
  picture: IGatsbyImageData;
}

interface IPostNodeCategory {
  name: string;
  slug: string;
}

interface IPostNode {
  author: IPostNodeAuthor;
  category: IPostNodeCategory;
  coverImage: {
    large: IGatsbyImageData;
    small: IGatsbyImageData;
  };
  date: string;
  excerpt: string;
  featured: boolean;
  slug: string;
  title: string;
}

interface IIndexProps {
  data: {
    allPosts: {
      nodes: Array<IPostNode>;
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
  };
}

export default function Index(props: IIndexProps) {
  const { allPosts, blog, site } = props.data;
  const heroPost = allPosts.nodes[0];
  const morePosts = allPosts.nodes.slice(1);

  return (
    <>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <PageLayout title="Test blog">
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
        date
        featured
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
