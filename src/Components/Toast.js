// Components/Toast.js
import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Toast = ({ isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 w-full px-6 z-50">
			<div className="bg-gradient-rainbow max-w-3xl mx-auto shadow-lg rounded-lg p-4 animate-fade-in-out backdrop-blur-md border flex justify-between items-center">
				<p className="text-white text-sm sm:text-base">
					요청사항 건의하기
				</p>
				<a
					href="mailto:kmsdevwork@gmail.com"
					className="text-white flex items-center text-xs backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md"
					onClick={onClose}
				>
					<EnvelopeIcon className="w-6 h-6" />
				</a>
			</div>
		</div>
	);
};

export default Toast;
