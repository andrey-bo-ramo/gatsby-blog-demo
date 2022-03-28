import React from "react";
import { graphql } from "gatsby";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../../components/page-layout";

export default function Post({ data: { site, post, morePosts } }) {
  console.log("post", post);
  return (
    <>
      <HelmetDatoCms seo={post.seo} favicon={site.favicon} />
      <PageLayout title={post.title}>
        <article>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            featured={post.featured}
          />

          <PostBody content={post.content} gallery={post.gallery} />
        </article>
        <SectionSeparator />
        {morePosts.nodes.length > 0 && <MoreStories posts={morePosts.nodes} />}
      </PageLayout>
    </>
  );
}

export const query = graphql`
  query PostBySlug($id: String) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsPost(id: { eq: $id }) {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      content {
        value
        blocks {
          __typename
          id: originalId
          image {
            gatsbyImageData(width: 700)
          }
        }
      }
      date
      coverImage {
        gatsbyImageData(width: 1500)
      }
      gallery {
        gatsbyImageData(width: 760)
      }
      featured
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
    morePosts: allDatoCmsPost(
      sort: { fields: date, order: DESC }
      limit: 2
      filter: { id: { ne: $id } }
    ) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
          small: gatsbyImageData(width: 760)
        }
        featured
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
