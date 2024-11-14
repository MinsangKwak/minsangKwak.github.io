// src/uploadDataToFirestore.js
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import blogPostsData from "./data/blogPosts.json";
import codePostsData from "./data/codePosts.json";

const uploadDataToFirestore = async () => {
	try {
		// blogPosts 컬렉션에 데이터 추가
		const blogPostsCollectionRef = collection(db, "blogPosts");
		for (const post of blogPostsData) {
			await addDoc(blogPostsCollectionRef, post);
			console.log(`Uploaded blog post with id: ${post.id}`);
		}

		// codePosts 컬렉션에 데이터 추가
		const codePostsCollectionRef = collection(db, "codePosts");
		for (const post of codePostsData) {
			await addDoc(codePostsCollectionRef, post);
			console.log(`Uploaded code post with id: ${post.id}`);
		}

		console.log("All data uploaded successfully!");
	} catch (error) {
		console.error("Error uploading data to Firestore:", error);
	}
};

export default uploadDataToFirestore;
