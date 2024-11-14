// Pages/PageJoin.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const PageJoin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage("");

		try {
			await createUserWithEmailAndPassword(auth, email, password);
			setSuccessMessage(
				"회원가입이 완료되었습니다! 이제 로그인해 주세요."
			);
			setEmail("");
			setPassword("");
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				setError(
					"이 이메일은 이미 사용 중입니다. 다른 이메일을 사용해 주세요."
				);
			} else if (err.code === "auth/invalid-email") {
				setError(
					"유효하지 않은 이메일 주소입니다. 올바른 이메일을 입력해 주세요."
				);
			} else if (err.code === "auth/weak-password") {
				setError("비밀번호는 최소 6자리 이상이어야 합니다.");
			} else {
				setError("회원가입에 실패했습니다. 다시 시도해주세요.");
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-80">
				<h2 className="text-2xl font-semibold text-center mb-4">
					회원가입
				</h2>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
				{successMessage && (
					<p className="text-green-500 text-sm mb-2">
						{successMessage}
					</p>
				)}
				<form onSubmit={handleSignUp}>
					<input
						type="email"
						placeholder="이메일을 입력 해주세요"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="text-sm w-full p-2 mb-4 rounded bg-gray-100 placeholder-gray-500 focus:outline-none border border-gray-300"
					/>
					<input
						type="password"
						placeholder="비밀번호를 입력 해주세요"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="text-sm w-full p-2 mb-4 rounded bg-gray-100 placeholder-gray-500 focus:outline-none border border-gray-300"
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
					>
						회원가입
					</button>
				</form>
			</div>
		</div>
	);
};

export default PageJoin;
