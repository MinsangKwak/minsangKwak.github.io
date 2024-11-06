// src/Home.js
import React from "react";
import ConvexGeometryComponent from "./ConvexGeometry";

const Home = () => {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			{/* 다각형 컴포넌트 */}
			<div className="flex justify-center items-center">
				<ConvexGeometryComponent />
			</div>

			{/* 텍스트 콘텐츠 */}
			<p className="text-gray-600 mt-4 text-center max-w-md">
				Welcome to my blog! Here, you’ll find insights on software
				development, tutorials, and guides that I’ve gathered from my
				journey in tech. Dive in and explore!
			</p>
		</main>
	);
};

export default Home;
