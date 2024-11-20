import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseConfig";

export const useFetchData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogPosts, setBlogPosts] = useState([]);
    const [codePosts, setCodePosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogCollection = collection(db, "blogPosts");
                const codeCollection = collection(db, "referencePosts");

                const [blogSnapshot, codeSnapshot] = await Promise.all([
                    getDocs(blogCollection),
                    getDocs(codeCollection),
                ]);

                setBlogPosts(
                    blogSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
                setCodePosts(
                    codeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { isLoading, blogPosts, codePosts };
};
