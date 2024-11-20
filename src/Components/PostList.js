import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const PostList = ({ title, posts, visiblePosts, onLoadMore, isBlog }) => {
    const buttonStyles =
        "flex items-center text-xs text-outline bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md";
    const listItemStyles =
        "bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/30 relative";

    return (
        <section className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-outline">{title}</h2>
                {visiblePosts < posts.length && (
                    <button onClick={onLoadMore} className={buttonStyles}>
                        View
                        <PlusIcon className="w-3 h-3 ml-1" />
                    </button>
                )}
            </div>
            <ul className="space-y-3">
                {posts.slice(0, visiblePosts).map((post, index) => (
                    <li key={post.id} className={listItemStyles}>
                        <Link
                            to={`/${isBlog ? "blog" : "reference"}/${post.id}`}
                            className="block pr-[50px] text-gray-900 font-medium hover:underline text-outline"
                        >
                            {post.title}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1 line-clamp">
                            {isBlog ? post.excerpt : post.memo}
                        </p>
                        {index === 0 && (
                            <span className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs font-light px-2 py-1 rounded backdrop-blur-md shadow-md border border-white/20">
                                NEW
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PostList;
