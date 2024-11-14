// Components/LoginModal.js
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConvexGeometryComponent from "./ConvexGeometry";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginModal = ({ isVisible, onClose, isFadingOut }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	if (!isVisible) return null;

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			onClose();
			alert("로그인에 성공했습니다!");
		} catch (err) {
			setError(
				"로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
			);
		}
	};

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 bg-gradient-rainbow ${
				isFadingOut ? "animate-fade-out" : "animate-fade-in-background"
			} backdrop-blur-sm`}
		>
			<div
				className={`relative bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg w-80 border border-white/20 ${
					isFadingOut ? "" : "animate-slide-up"
				}`}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
					aria-label="Close"
				>
					<XMarkIcon className="w-5 h-5" />
				</button>
				<div className="flex items-center justify-center mb-4">
					<ConvexGeometryComponent />
				</div>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="이메일을 입력 해주세요"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="text-sm w-full p-2 mb-4 rounded bg-white/30 placeholder-gray-500 focus:outline-none border border-gray-300"
					/>
					<input
						type="password"
						placeholder="비밀번호를 입력 해주세요"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="text-sm w-full p-2 mb-4 rounded bg-white/30 placeholder-gray-500 focus:outline-none border border-gray-300"
					/>
					<button
						type="submit"
						className="w-full bg-blue-500/80 hover:bg-blue-600 text-white rounded px-4 py-2"
					>
						로그인
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginModal;
