// src/Components/Category.js
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Category = ({ category, posts, isActive, onClick, onPostClick }) => (
   <div className="mb-2">
      <div
         className="flex items-center justify-between text-md font-semibold cursor-pointer bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
         onClick={() => onClick(category)}
      >
         <span>{category}</span>
         <ChevronDownIcon
            className={`w-5 h-5 transition-transform ${isActive ? "rotate-180" : ""}`}
         />
      </div>
      {isActive && (
         <ul className="mt-1 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            {posts.map((post) => (
               <li key={post.id}>
                  <Link
                     to={`/${post.slug.startsWith("blog") ? "blog" : "reference"}/${post.id}`}
                     onClick={onPostClick}
                     className="block w-full text-left py-2 px-4 rounded hover:bg-white/30"
                  >
                     {post.title}
                  </Link>
               </li>
            ))}
         </ul>
      )}
   </div>
);

export default Category;
