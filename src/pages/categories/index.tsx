import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import PageLayout from "../../components/page-layout";
import Categories from "../../components/categories";
import {
  ICategoryNode,
  IMetaTag,
  ITitleTag,
  ILinkTag,
} from "interfaces/common";

interface ICategoriesPageProps {
  data: {
    allCategory: {
      nodes: ICategoryNode[];
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

export default function CategoriesPage(props: ICategoriesPageProps) {
  const {
    data: { allCategory, blog, site },
  } = props;

  return (
    <>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <PageLayout title="Categories">
        <Categories data={allCategory.nodes} />
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
    allCategory: allDatoCmsCategory {
      nodes {
        name
        slug
        image {
          small: gatsbyImageData(width: 760)
        }
      }
    }
  }
`;
