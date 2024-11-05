// src/App.js
import React from "react";

const App = () => {
	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Left Sidebar */}
			<aside className="w-64 bg-white shadow-md h-screen p-4 fixed">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">
					My Blog
				</h1>
				<nav>
					<ul className="space-y-4">
						<li>
							<a
								href="#home"
								className="text-gray-600 hover:text-blue-500"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#about"
								className="text-gray-600 hover:text-blue-500"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#posts"
								className="text-gray-600 hover:text-blue-500"
							>
								Posts
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="text-gray-600 hover:text-blue-500"
							>
								Contact
							</a>
						</li>
					</ul>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="ml-64 flex-1 p-6">
				<header className="bg-white shadow-md py-4 px-6 mb-6">
					<h2 className="text-2xl font-bold text-gray-800">
						Welcome to My Blog
					</h2>
				</header>

				<main>
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<article className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">
								Blog Post 1
							</h3>
							<p className="text-gray-600">
								This is a sample blog post description. It gives
								a brief overview of the content.
							</p>
						</article>

						<article className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">
								Blog Post 2
							</h3>
							<p className="text-gray-600">
								This is another blog post description. It
								provides more insights and details.
							</p>
						</article>

						<article className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">
								Blog Post 3
							</h3>
							<p className="text-gray-600">
								This post talks about interesting topics related
								to web development.
							</p>
						</article>
					</section>
				</main>

				<footer className="text-center text-gray-600 mt-8">
					© 2024 My Blog. All rights reserved.
				</footer>
			</div>
		</div>
	);
};

export default App;
