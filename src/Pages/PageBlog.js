import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PageBlog = ({ posts = [], isBlogLoading }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      const foundPost = posts.find((post) => post.id === parseInt(postId));
      setSelectedPost(foundPost || null);
    } else if (posts.length > 0) {
      setSelectedPost(posts[0]);
    }
  }, [postId, posts]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (isBlogLoading) {
    return <Skeleton />; // 로딩 중일 때 Skeleton 컴포넌트 렌더링
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-rainbow">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white/20 backdrop-blur-md shadow-md h-16 px-4 border-b border-white/10">
        <h1 className="text-gray-900 font-bold">Blog</h1>
        <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none">
          Posts
        </button>
      </header>

      {/* Sidebar with Post Titles */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white/20 backdrop-blur-md text-gray-800 transform transition-transform duration-300 z-20 shadow-lg border border-white/10 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } rounded-l-lg`}
      >
        <nav className="p-4 mt-16 flex-grow">
          <h2 className="text-lg font-bold text-gray-800">Blog Posts</h2>
          {posts.length > 0 ? (
            <ul className="space-y-1 mt-4">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/blog/${post.id}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left py-2 px-4 rounded ${
                      selectedPost?.id === post.id
                        ? "bg-gray-700 text-white"
                        : "hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">포스트가 없습니다.</p>
          )}
        </nav>
      </aside>

      {/* Overlay Background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 mt-16 p-6">
        {selectedPost ? (
          <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10 text-gray-800">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {selectedPost.title}
            </h2>
            <h3 className="text-2xl text-gray-700 mb-4">
              {selectedPost.subtitle}
            </h3>
            <p className="leading-relaxed mb-8">{selectedPost.content}</p>

            {/* Additional Sections for a Learning Path Style */}
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              더 알아보기
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
              <li>React의 Virtual DOM 개념</li>
              <li>React의 상태 관리와 Context API</li>
              <li>Hooks의 발전: useEffect와 useReducer</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              관련 학습 항목
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>JavaScript 기본 개념</li>
              <li>ES6 및 최신 JavaScript 기능</li>
              <li>React 컴포넌트와 JSX의 이해</li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-700">포스트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PageBlog;
