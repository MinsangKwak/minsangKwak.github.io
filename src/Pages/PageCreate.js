import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const PageCreate = () => {
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("react");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const slug = title.toLowerCase().replace(/\s+/g, "-");
		const newPost = {
			slug,
			title,
			subtitle,
			content,
			created_at: new Date().toISOString(),
		};

		try {
			await addDoc(collection(db, "blogPosts"), newPost);
			alert("글이 성공적으로 작성되었습니다!");
			navigate("/blog");
		} catch (error) {
			console.error("Error adding document: ", error);
			alert("글 작성에 실패했습니다. 다시 시도해주세요.");
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
				<h2 className="text-2xl font-semibold text-center mb-6">
					글 작성하기
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-outline mb-1">
							제목
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="text-outline text-sm w-full p-2 rounded placeholder-gray-500 focus:outline-none border border-gray-300"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-outline mb-1">
							부제목
						</label>
						<input
							type="text"
							value={subtitle}
							onChange={(e) => setSubtitle(e.target.value)}
							className="text-outline text-sm w-full p-2 rounded placeholder-gray-500 focus:outline-none border border-gray-300"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-outline mb-1">
							카테고리
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="text-outline text-sm w-full p-2 rounded focus:outline-none border border-gray-300"
						>
							<option value="react">React</option>
							<option value="internet">Internet</option>
						</select>
					</div>
					<div className="mb-6">
						<label className="block text-sm font-medium text-outline mb-1">
							내용
						</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
							className="text-outline text-sm w-full p-2 rounded placeholder-gray-500 focus:outline-none border border-gray-300 h-40"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
					>
						글 작성하기
					</button>
				</form>
			</div>
		</div>
	);
};

export default PageCreate;
