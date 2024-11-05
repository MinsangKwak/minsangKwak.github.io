// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import PostDetail from "./PostDetail";

const App = () => {
	return (
		<Router>
			<div className="flex min-h-screen bg-gray-100">
				{/* Left Sidebar */}
				<aside className="w-64 bg-white shadow-md h-screen p-4 fixed">
					<h1 className="text-2xl font-bold text-gray-800 mb-6">
						My Blog
					</h1>
					<nav>
						<ul className="space-y-4">
							<li>
								<Link
									to="/"
									className="text-gray-600 hover:text-blue-500"
								>
									Home
								</Link>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<div className="ml-64 flex-1 p-6">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/post/:id" element={<PostDetail />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
