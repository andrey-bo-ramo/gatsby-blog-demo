import React from "react";
import { Link } from "gatsby";

export default function Nav() {
  return (
    <nav className="flex items-center justify-end px-2 pt-2 pb-3 space-x-1">
      <Link
        to={`/`}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      >
        Home
      </Link>
      <Link
        to={`/categories`}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      >
        Categories
      </Link>
      <Link
        to={`/posts`}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      >
        All Posts
      </Link>
    </nav>
  );
}
