import React, { useState, useEffect, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Components
import PageCodePost from "./Pages/PageCodePost";
import PageHome from "./Pages/PageHome";
import PageBlog from "./Pages/PageBlog";
import PageJoin from "./Pages/PageJoin";
import PageCreate from "./Pages/PageCreate";
import Header from "./Components/Header";
import Wave from "./Components/Wave";
import Toast from "./Components/Toast";
import LoginModal from "./Components/LoginModal";
import Skeleton from "./Components/Skeleton";

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);
	const [blogPosts, setBlogPosts] = useState([]);
	const [codePosts, setCodePosts] = useState([]);
	const [user, setUser] = useState(null);
	const [isBlogLoading, setIsBlogLoading] = useState(true);
	const [isCodeLoading, setIsCodeLoading] = useState(true);

	// 사용자 인증 상태 확인
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	// Firestore 데이터 로드
	const fetchData = useCallback(async () => {
		try {
			setIsBlogLoading(true);
			setIsCodeLoading(true);

			const blogCollection = collection(db, "blogPosts");
			const codeCollection = collection(db, "referencePosts");

			const [blogSnapshot, codeSnapshot] = await Promise.all([
				getDocs(blogCollection),
				getDocs(codeCollection),
			]);

			const blogList = blogSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			const codeList = codeSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setBlogPosts(blogList);
			setCodePosts(codeList);
		} catch (error) {
			console.error("Error fetching data: ", error);
		} finally {
			setIsBlogLoading(false);
			setIsCodeLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// 카테고리 분류를 메모이제이션
	const categorizedBlogPosts = useMemo(() => {
		return blogPosts.reduce((categories, post) => {
			if (post && post.slug) {
				const category = post.slug.split("-")[0];
				(categories[category] = categories[category] || []).push(post);
			}
			return categories;
		}, {});
	}, [blogPosts]);

	const categorizedReferencePosts = useMemo(() => {
		return codePosts.reduce((categories, post) => {
			if (post && post.slug) {
				const category = post.slug.split("-")[0];
				(categories[category] = categories[category] || []).push(post);
			}
			return categories;
		}, {});
	}, [codePosts]);

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gradient-rainbow">
				<Header
					openSidebar={() => setIsSidebarOpen((prev) => !prev)}
					isSidebarOpen={isSidebarOpen}
					closeSidebar={() => setIsSidebarOpen(false)}
					openToast={() => setIsToastVisible(true)}
					openLoginModal={() => setIsLoginModalVisible(true)}
					categorizedBlogPosts={categorizedBlogPosts}
					categorizedReferencePosts={categorizedReferencePosts}
					activeCategory={activeCategory}
					toggleCategory={(category) =>
						setActiveCategory((prev) =>
							prev === category ? null : category
						)
					}
					user={user}
				/>

				{/* Main Content */}
				<div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
					<Routes>
						<Route path="/" element={<PageHome />} />
						<Route
							path="/blog"
							element={
								isBlogLoading ? (
									<Skeleton />
								) : (
									<PageBlog posts={blogPosts} />
								)
							}
						/>
						<Route
							path="/blog/:postId"
							element={
								isBlogLoading ? (
									<Skeleton />
								) : (
									<PageCodePost posts={blogPosts} />
								)
							}
						/>
						<Route
							path="/reference/:postId"
							element={
								isCodeLoading ? (
									<Skeleton />
								) : (
									<PageCodePost posts={codePosts} />
								)
							}
						/>
						<Route path="/join" element={<PageJoin />} />
						<Route path="/create" element={<PageCreate />} />
					</Routes>
				</div>

				{/* Toast Notification */}
				<Toast
					isVisible={isToastVisible}
					onClose={() => setIsToastVisible(false)}
				/>

				{/* Login Modal */}
				<LoginModal
					isVisible={isLoginModalVisible}
					onClose={() => setIsLoginModalVisible(false)}
					isFadingOut={isFadingOut}
				/>
				<Wave />
			</div>
		</Router>
	);
};

export default App;
