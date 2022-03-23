import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

export default function Categories({ data: { allCategory } }) {
  console.log("allCategory", allCategory);
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
          Categories.
        </h1>
      </section>
      <div className="px-2 pt-2 pb-3 space-y-1">
        {allCategory.nodes.map(({ slug, name }) => (
          <Link
            to={`/categories/${slug}`}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            {name}
          </Link>
        ))}
      </div>
    </>
  );
}

export const query = graphql`
  {
    allCategory: allDatoCmsCategory {
      nodes {
        name
        slug
      }
    }
  }
`;
