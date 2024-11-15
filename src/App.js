import React, { useState, useEffect } from "react";
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

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const loadData = async () => {
      setIsBlogLoading(true);
      setIsCodeLoading(true);
  
      // 인위적인 지연을 추가합니다 (예: 2초).
      // await new Promise((resolve) => setTimeout(resolve, 20000));
  
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
  
      setIsBlogLoading(false); // 블로그 데이터 로드 완료 시
      setIsCodeLoading(false); // 레퍼런스 데이터 로드 완료 시
    };
  
    loadData();
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

  useEffect(() => {
    console.log("Blog Loading:", isBlogLoading);
    console.log("Code Loading:", isCodeLoading);
  }, [isBlogLoading, isCodeLoading]);

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
          user={user}
        />
        {/* Main Content */}
        <div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route
              path="/blog"
              element={
                isBlogLoading ? <Skeleton /> : <PageBlog posts={blogPosts} isBlogLoading={isBlogLoading} />
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
          onClose={closeLoginModal}
          isFadingOut={isFadingOut}
        />
        <Wave />
      </div>
    </Router>
  );
};

export default App;
