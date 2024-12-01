import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseConfig";

export const useFetchData = () => {
	const [state, setState] = useState({
		isLoading: true,
		blogPosts: [],
		codePosts: [],
		error: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [blogSnapshot, codeSnapshot] = await Promise.all([
					getDocs(collection(db, "blogPosts")),
					getDocs(collection(db, "referencePosts")),
				]);

				setState({
					isLoading: false,
					blogPosts: blogSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})),
					codePosts: codeSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})),
					error: null,
				});
			} catch (error) {
				setState({
					isLoading: false,
					blogPosts: [],
					codePosts: [],
					error: "데이터를 가져오는 중 문제가 발생했습니다.",
				});
			}
		};

		fetchData();
	}, []);

	return state;
};
