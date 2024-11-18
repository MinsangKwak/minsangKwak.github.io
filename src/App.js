import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Firebase 설정 파일
import Header from "./Components/Header";
import Loader from "./Components/Loader"; // 전체 화면 로더 컴포넌트
import PageHome from "./Pages/PageHome";
import PageBlog from "./Pages/PageBlog";
import PageCodePost from "./Pages/PageCodePost";
import PageJoin from "./Pages/PageJoin";
import PageCreate from "./Pages/PageCreate";
import LoginModal from "./Components/LoginModal";
import Toast from "./Components/Toast";

const App = () => {
	const [isLoading, setIsLoading] = useState(true); // 전체 로딩 상태
	const [blogPosts, setBlogPosts] = useState([]); // 블로그 게시글 데이터
	const [codePosts, setCodePosts] = useState([]); // 코드 레퍼런스 데이터
	const [user, setUser] = useState(null); // 로그인한 사용자 정보
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false); // 로그인 모달 상태
	const [isToastVisible, setIsToastVisible] = useState(false); // Toast 상태

	// Firestore 데이터 로드
	useEffect(() => {
		const fetchData = async () => {
			try {
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
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false); // 데이터 로드가 완료되면 로딩 상태 해제
			}
		};

		fetchData();
	}, []);

	// 블로그 게시글 데이터를 카테고리화
	const categorizedBlogPosts = useMemo(() => {
		return blogPosts.reduce((categories, post) => {
			if (post && post.slug) {
				const category = post.slug.split("-")[0];
				(categories[category] = categories[category] || []).push(post);
			}
			return categories;
		}, {}); // 카테고리별 분류
	}, [blogPosts]);

	// 코드 레퍼런스 데이터를 카테고리화
	const categorizedReferencePosts = useMemo(() => {
		return codePosts.reduce((categories, post) => {
			if (post && post.slug) {
				const category = post.slug.split("-")[0];
				(categories[category] = categories[category] || []).push(post);
			}
			return categories;
		}, {}); // 카테고리별 분류
	}, [codePosts]);

	// 새로운 게시글 추가
	const addBlogPost = (newPost) => {
		setBlogPosts((prev) => [newPost, ...prev]);
	};

	// Toast 열기 함수
	const openToast = () => {
		setIsToastVisible(true);
		setTimeout(() => setIsToastVisible(false), 3000); // 3초 후 Toast 닫기
	};

	return (
		<Router>
			{/* 로딩 상태일 때 전체 화면 로더 표시 */}
			{isLoading ? (
				<Loader />
			) : (
				<div className="flex flex-col min-h-screen bg-gradient-rainbow">
					<Header
						user={user}
						openLoginModal={() => setIsLoginModalVisible(true)}
						categorizedBlogPosts={categorizedBlogPosts}
						categorizedReferencePosts={categorizedReferencePosts}
						openToast={openToast} // Toast 열기 함수 전달
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
								element={<PageCreate addBlogPost={addBlogPost} />}
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
					{/* Toast 컴포넌트 */}
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
