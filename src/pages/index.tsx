import React from "react";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../components/page-layout";
import { IPostNode, IMetaTag, ITitleTag, ILinkTag } from "interfaces/common";
import { useWebWorker } from "../hooks/useWebWorker";
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

  const countPostTitlesChars = (posts) => {
    let res = 0;
    posts.forEach((post) => {
      res += post.title.length;
    });
    return res;
  };

  const { result, run } = useWebWorker(countPostTitlesChars);

  const testWorker = () => {
    run(allPosts.nodes);
  };

  return (
    <>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <PageLayout title="Test blog">
        <>
          <div>
            <button onClick={testWorker}>Count Posts Title Chars</button>
            <p>Posts title chars: {result}</p>
          </div>
          {heroPost && <HeroPost {...heroPost} />}
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
