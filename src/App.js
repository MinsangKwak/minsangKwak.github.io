import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

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
	const [blogPosts, setBlogPosts] = useState([]);
	const [codePosts, setCodePosts] = useState([]);

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

	const uploadBlogPost = async (post) => {
		try {
			const docRef = await addDoc(collection(db, "blogPosts"), post);
			console.log("Blog post written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding blog post: ", e);
		}
	};

	const uploadCodePost = async (post) => {
		try {
			const docRef = await addDoc(collection(db, "referencePosts"), post);
			console.log("Code post written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding code post: ", e);
		}
	};

	const handleAddBlogPost = () => {
		const newBlogPost = {
			slug: "react-new-feature",
			title: "React New Feature Overview",
			subtitle: "A quick look at the new feature in React",
			excerpt:
				"React recently introduced a new feature. In this post, we'll explore what this means for developers.",
			content: "Here is the detailed content of the new feature...",
			created_at: new Date().toISOString(),
		};
		uploadBlogPost(newBlogPost);
	};

	const handleAddCodePost = () => {
		const newCodePost = {
			slug: "html-responsive-tips",
			title: "HTML Responsive Tips",
			memo: "Tips for making HTML content more responsive.",
			content: "<p>Here is some content...</p>",
			created_at: new Date().toISOString(),
		};
		uploadCodePost(newCodePost);
	};

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
			if (post && post.slug) {
				const category = post.slug.split("-")[0];
				(categories[category] = categories[category] || []).push(post);
			}
			return categories;
		}, {});

	const categorizedBlogPosts = categorizePosts(blogPosts);
	const categorizedReferencePosts = categorizePosts(codePosts);

	// Firestore에 모든 블로그 포스트 업로드
	// const uploadAllBlogPosts = async () => {
	// 	try {
	// 		for (const post of blogPostsData) {
	// 			await addDoc(collection(db, "blogPosts"), post);
	// 			console.log(`Blog post '${post.title}' uploaded successfully`);
	// 		}
	// 	} catch (e) {
	// 		console.error("Error uploading blog posts: ", e);
	// 	}
	// };

	// Firestore에 모든 참고 포스트 업로드
	// const uploadAllReferencePosts = async () => {
	// 	try {
	// 		for (const post of referencePostsData) {
	// 			await addDoc(collection(db, "referencePosts"), post);
	// 			console.log(
	// 				`Reference post '${post.title}' uploaded successfully`
	// 			);
	// 		}
	// 	} catch (e) {
	// 		console.error("Error uploading reference posts: ", e);
	// 	}
	// };

	// 두 함수를 실행하여 모든 데이터를 Firestore에 업로드
	// const uploadAllPosts = async () => {
	// 	await uploadAllBlogPosts();
	// 	await uploadAllReferencePosts();
	// };

	// useEffect(() => {
	// 	uploadAllPosts();
	// }, []);

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
					</Routes>
				</div>

				{/* Buttons */}
				<div className="fixed z-50 bottom-0 flex justify-center mt-8 space-x-4">
					<button
						onClick={handleAddBlogPost}
						className="bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
					>
						Add Blog Post
					</button>
					<button
						onClick={handleAddCodePost}
						className="bg-green-500 text-white font-semibold px-4 py-2 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
					>
						Add Code Post
					</button>
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
