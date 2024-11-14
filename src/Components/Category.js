import React from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const Category = ({
	category,
	posts,
	basePath,
	isActive,
	onClick,
	onPostClick,
}) => (
	<div className="mb-2">
		<div
			className="flex items-center justify-between text-md font-semibold cursor-pointer bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30 shadow-lg"
			onClick={() => onClick(category)}
			style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.1)" }}
		>
			<span>{category}</span>
			{isActive ? (
				<ChevronUpIcon className="h-5 w-5 text-black" />
			) : (
				<ChevronDownIcon className="h-5 w-5 text-black" />
			)}
		</div>
		{isActive && (
			<>
				{/* <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" />{" "} */}
				{/* 배경 오버레이 */}
				<ul className="relative mt-1 bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/30 shadow-md z-20">
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
			</>
		)}
	</div>
);

export default Category;
