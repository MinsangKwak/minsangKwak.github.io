import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import PostList from "../Components/PostList";

const PageHome = () => {
    const [visibleBlogPosts, setVisibleBlogPosts] = useState(3);
    const [visibleReferencePosts, setVisibleReferencePosts] = useState(3);
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [codePostsData, setCodePostsData] = useState([]);

    // Firestore 데이터 가져오기 함수
    const fetchData = async (collectionName, setData) => {
        try {
            const collectionRef = collection(db, collectionName);
            const snapshot = await getDocs(collectionRef);
            const dataList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(dataList);
        } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
        }
    };

    // 데이터 로드 useEffect
    useEffect(() => {
        fetchData("blogPosts", setBlogPostsData);
        fetchData("referencePosts", setCodePostsData);
    }, []);

    // 정렬된 데이터
    const sortedBlogPosts = [...blogPostsData].sort((a, b) => b.id - a.id);
    const sortedReferencePosts = [...codePostsData].sort((a, b) => b.id - a.id);

    return (
        <main className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-5xl font-light mt-6 lg:mt-20 mb-6 lg:mb-20">
                <p className="text-3xl lg:text-5xl text-outline">Welcome!</p>
                <p className="text-3xl lg:text-5xl mt-2 lg:mt-16 text-outline">
                    This blog is my personal side project,{" "}
                    <br className="hidden sm:block" />
                    focused mainly on frontend development.
                </p>
                <p className="text-3xl lg:text-5xl mt-2 lg:mt-12 text-outline">
                    If you have any questions or want to know more,{" "}
                    <br className="hidden sm:block" />
                    please feel free to reach out anytime.
                </p>
            </div>

            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-y-8 md:gap-x-8">
                {/* Blog Section */}
                <PostList
                    title="Blog"
                    posts={sortedBlogPosts}
                    visiblePosts={visibleBlogPosts}
                    onLoadMore={() => setVisibleBlogPosts((prev) => prev + 3)}
                    isBlog={true}
                />

                {/* References Section */}
                <PostList
                    title="References"
                    posts={sortedReferencePosts}
                    visiblePosts={visibleReferencePosts}
                    onLoadMore={() => setVisibleReferencePosts((prev) => prev + 3)}
                    isBlog={false}
                />

                {/* Update Section */}
                <section className="w-full md:w-1/3 mt-8 md:mt-0">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-outline">
                            Update soon...
                        </h2>
                    </div>
                    <ul className="space-y-3">
                        <li className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/30 relative">
                            <span className="block pr-[50px] text-gray-900 font-medium hover:underline text-outline">
                                패치노트 게시판
                            </span>
                            <p className="text-gray-500 text-sm mt-1 line-clamp">
                                업데이트 내역을 기록하는 패치노트 게시판이 생성될 예정입니다.
                            </p>
                            <span className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs font-light px-2 py-1 rounded backdrop-blur-md shadow-md border border-white/20">
                                2024.12
                            </span>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default PageHome;
