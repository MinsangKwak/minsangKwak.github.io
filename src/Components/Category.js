import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category, posts, basePath, isActive, onClick, onPostClick }) => (
	<div className="mb-2">
		<div
			className="flex items-center justify-between text-md font-semibold cursor-pointer bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
			onClick={() => onClick(category)}
		>
			<span>{category}</span>
		</div>
		{isActive && (
			<ul className="mt-1 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
				{posts.map((post) => (
					<li key={post.id}>
						<Link
							to={`/${basePath}/${post.id}`} // basePath로 블로그와 레퍼런스 경로를 구분
							onClick={onPostClick}
							className="block w-full text-left py-2 px-4 rounded hover:bg-white/30 text-black"
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
