import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ILinkTagAttr {
  href: string;
  rel: string;
  sizes: string;
}

export interface IMetaTagAttr {
  content: string;
  name: string;
}

export interface ILinkTag {
  tagName: string;
  attributes: ILinkTagAttr;
}

export interface IMetaTag {
  tagName: string;
  attributes: IMetaTagAttr;
}

export interface ITitleTag {
  tagName: string;
  content: string;
}

export interface IPostNodeAuthor {
  name: string;
  picture: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export interface IPostNodeCategory {
  name: string;
  slug: string;
}

export interface IDatoCmsQueryBlock {
  id: string;
  model: {
    apiKey: string;
  };
  query: string;
  __typename: string;
}

export interface IDatoCmsGalleryBlock {
  id: string;
  model: {
    apiKey: string;
  };
  __typename: string;
  gallery: IGatsbyImageData[];
}

export interface IPostNode {
  id: string;
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
  seo: {
    tags: Array<IMetaTag | ITitleTag>;
  };
  content: Array<IDatoCmsGalleryBlock | IDatoCmsQueryBlock>;
}
