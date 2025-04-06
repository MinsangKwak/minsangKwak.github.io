import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useFetchData } from "./hooks/useFetchData";
import { categorizePosts } from "./utils/utils";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import PageHome from "./Pages/PageHome";
import PageBlog from "./Pages/PageBlog";
import PageCodePost from "./Pages/PageCodePost";
import PageJoin from "./Pages/PageJoin";
import PageCreate from "./Pages/PageCreate";
import LoginModal from "./Components/LoginModal";
import Toast from "./Components/Toast";

const App = () => {
	const { isLoading, blogPosts, codePosts } = useFetchData();
	const [user, setUser] = useState(null);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isToastVisible, setIsToastVisible] = useState(false);

	const categorizedBlogPosts = useMemo(
		() => categorizePosts(blogPosts),
		[blogPosts]
	);
	const categorizedReferencePosts = useMemo(
		() => categorizePosts(codePosts),
		[codePosts]
	);

	const addBlogPost = (newPost) => {
		setBlogPosts((prev) => [newPost, ...prev]);
	};

	const openToast = () => {
		setIsToastVisible(true);
		setTimeout(() => setIsToastVisible(false), 3000);
	};

	return (
		<Router>
			{isLoading ? (
				<Loader />
			) : (
				<div className="flex flex-col min-h-screen bg-gradient-rainbow">
					<Header
						user={user}
						openLoginModal={() => setIsLoginModalVisible(true)}
						categorizedBlogPosts={categorizedBlogPosts}
						categorizedReferencePosts={categorizedReferencePosts}
						openToast={openToast}
					/>
					<div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
						<Routes>
							<Route
								path="/"
								element={<PageHome blogPosts={blogPosts} />}
							/>
							<Route
								path="/blog"
								element={<PageBlog posts={blogPosts} />}
							/>
							<Route
								path="/blog/:postId"
								element={<PageCodePost posts={blogPosts} />}
							/>
							<Route
								path="/reference/:postId"
								element={<PageCodePost posts={codePosts} />}
							/>
							<Route path="/join" element={<PageJoin />} />
							<Route
								path="/create"
								element={
									<PageCreate addBlogPost={addBlogPost} />
								}
							/>
						</Routes>
					</div>
					{isLoginModalVisible && (
						<LoginModal
							isVisible={isLoginModalVisible}
							onClose={() => setIsLoginModalVisible(false)}
							onLoginSuccess={(loggedInUser) => {
								setUser(loggedInUser);
								setIsLoginModalVisible(false);
							}}
						/>
					)}
					<Toast
						isVisible={isToastVisible}
						onClose={() => setIsToastVisible(false)}
					/>
				</div>
			)}
		</Router>
	);
};

export default App;
