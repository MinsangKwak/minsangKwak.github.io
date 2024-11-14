import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
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

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);
	const [blogPosts, setBlogPosts] = useState([]);
	const [codePosts, setCodePosts] = useState([]);
	const [user, setUser] = useState(null);

	// 사용자 인증 상태 확인
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	// Firestore에서 데이터 가져오기
	useEffect(() => {
		const fetchBlogPosts = async () => {
			const blogCollection = collection(db, "blogPosts");
			const blogSnapshot = await getDocs(blogCollection);
			const blogList = blogSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setBlogPosts(blogList);
		};

		const fetchCodePosts = async () => {
			const codeCollection = collection(db, "referencePosts");
			const codeSnapshot = await getDocs(codeCollection);
			const codeList = codeSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setCodePosts(codeList);
		};

		fetchBlogPosts();
		fetchCodePosts();
	}, []);

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
		// 현재 활성화된 카테고리가 클릭된 카테고리와 같다면 닫고, 다르다면 해당 카테고리로 변경
		setActiveCategory((prev) => (prev === category ? null : category));
		console.log(
			"Toggling category:",
			category,
			"Active Category:",
			activeCategory
		);
	};

	const categorizePosts = (posts) =>
		posts.reduce((categories, post) => {
			if (post && post.slug) {
				const category = post.slug.split("-")[0];
				(categories[category] = categories[category] || []).push(post);
			}
			return categories;
		}, {});

	const categorizedBlogPosts = categorizePosts(blogPosts);
	const categorizedReferencePosts = categorizePosts(codePosts);

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gradient-rainbow">
				<Header
					openSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
					closeSidebar={closeSidebar}
					openToast={openToast}
					openLoginModal={openLoginModal}
					categorizedBlogPosts={categorizedBlogPosts}
					categorizedReferencePosts={categorizedReferencePosts}
					activeCategory={activeCategory}
					toggleCategory={toggleCategory}
					user={user} // 로그인한 사용자 정보 전달
				/>

				{/* Main Content */}
				<div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
					<Routes>
						<Route path="/" element={<PageHome />} />
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
					onClose={closeLoginModal}
					isFadingOut={isFadingOut}
				/>

				<Wave />
			</div>
		</Router>
	);
};

export default App;
