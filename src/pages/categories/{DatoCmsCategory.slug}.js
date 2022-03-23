import React from "react";
import { graphql } from "gatsby";

export default function Category(props) {
  const { data } = props;
  const { posts } = data;
  console.log("props", props);
  console.log("posts", posts);
  return <div>Test</div>;
}

export const query = graphql`
  query PostByCategory($slug: String) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    posts: allDatoCmsPost(filter: { category: { slug: { eq: $slug } } }) {
      nodes {
        id
        title
      }
    }
  }
`;
