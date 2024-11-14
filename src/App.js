import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import codePostsData from "./data/codePosts.json";
import blogPostsData from "./data/blogPosts.json";

// Components
import PageCodePost from "./Pages/PageCodePost";
import PageHome from "./Pages/PageHome";
import PageBlog from "./Pages/PageBlog";
import Header from "./Components/Header";
import Wave from "./Components/Wave";
import Toast from "./Components/Toast";
import LoginModal from "./Components/LoginModal";

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	const openToast = () => {
		setIsToastVisible(true);
		setTimeout(() => setIsToastVisible(false), 5000);
	};

	const openLoginModal = () => {
		setIsFadingOut(false);
		setIsLoginModalVisible(true);
	};

	const closeLoginModal = () => {
		setIsFadingOut(true);
		setTimeout(() => setIsLoginModalVisible(false), 500);
	};

	const toggleCategory = (category) => {
		setActiveCategory((prev) => (prev === category ? null : category));
	};

	const categorizePosts = (posts) =>
		posts.reduce((categories, post) => {
			const category = post.slug.split("-")[0];
			(categories[category] = categories[category] || []).push(post);
			return categories;
		}, {});

	const categorizedBlogPosts = categorizePosts(blogPostsData);
	const categorizedReferencePosts = categorizePosts(codePostsData);

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gradient-rainbow">
				<Header
					openSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
					closeSidebar={closeSidebar} // closeSidebar를 Header에 전달
					openToast={openToast}
					openLoginModal={openLoginModal}
					categorizedBlogPosts={categorizedBlogPosts}
					categorizedReferencePosts={categorizedReferencePosts}
					activeCategory={activeCategory}
					toggleCategory={toggleCategory}
				/>

				{/* Main Content */}
				<div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
					<Routes>
						<Route path="/" element={<PageHome />} />
						<Route path="/blog" element={<PageBlog posts={blogPostsData} />} />
						<Route
							path="/blog/:postId"
							element={<PageCodePost posts={blogPostsData} />}
						/>
						<Route
							path="/reference/:postId"
							element={<PageCodePost posts={codePostsData} />}
						/>
					</Routes>
				</div>

				{/* Toast Notification */}
				<Toast isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />

				{/* Login Modal */}
				<LoginModal isVisible={isLoginModalVisible} onClose={closeLoginModal} isFadingOut={isFadingOut} />

				<Wave />
			</div>
		</Router>
	);
};

export default App;
