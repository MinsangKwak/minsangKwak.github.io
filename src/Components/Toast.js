import React, { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Toast = ({ isVisible, onClose }) => {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true); // Toast를 렌더링
        } else {
            // Toast 닫힘 애니메이션 실행 후 언마운트
            const timer = setTimeout(() => setShouldRender(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed bottom-4 w-full px-6 z-50 ${
                isVisible ? "animate-fade-in" : "animate-fade-out"
            }`}
        >
            <div className="bg-black/40 max-w-3xl mx-auto shadow-lg rounded-lg p-4 backdrop-blur-md border flex justify-between items-center">
                <p className="text-white text-sm sm:text-base">
                    요청사항 건의하기
                </p>
                <a
                    href="mailto:kmsdevwork@gmail.com"
                    className="text-white flex items-center text-xs px-2 py-1 rounded border border-white/20 shadow-md"
                    onClick={onClose}
                >
                    <EnvelopeIcon className="w-6 h-6" />
                </a>
            </div>
        </div>
    );
};

export default Toast;
