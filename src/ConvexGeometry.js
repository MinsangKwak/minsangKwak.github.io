// src/ConvexGeometry.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils";

const ConvexGeometryComponent = () => {
	const mountRef = useRef(null);

	useEffect(() => {
		let camera, scene, renderer, group;

		function init() {
			// Scene and Renderer
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(300, 300); // 작은 크기로 설정
			mountRef.current.appendChild(renderer.domElement);

			// Camera
			camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
			camera.position.set(15, 20, 30);
			scene.add(camera);

			// Orbit Controls
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.minDistance = 20;
			controls.maxDistance = 50;
			controls.maxPolarAngle = Math.PI / 2;

			// Ambient Light
			scene.add(new THREE.AmbientLight(0x666666));

			// Point Light
			const light = new THREE.PointLight(0xffffff, 3, 0, 0);
			camera.add(light);

			// Geometry and Group
			group = new THREE.Group();
			scene.add(group);

			// Dodecahedron Geometry
			let dodecahedronGeometry = new THREE.DodecahedronGeometry(10);
			dodecahedronGeometry.deleteAttribute("normal");
			dodecahedronGeometry.deleteAttribute("uv");
			dodecahedronGeometry = mergeVertices(dodecahedronGeometry);

			// Vertices
			const vertices = [];
			const positionAttribute =
				dodecahedronGeometry.getAttribute("position");

			for (let i = 0; i < positionAttribute.count; i++) {
				const vertex = new THREE.Vector3();
				vertex.fromBufferAttribute(positionAttribute, i);
				vertices.push(vertex);
			}

			// Points Material
			const pointsMaterial = new THREE.PointsMaterial({
				color: 0x0080ff,
				size: 0.5,
			});

			const pointsGeometry = new THREE.BufferGeometry().setFromPoints(
				vertices
			);
			const points = new THREE.Points(pointsGeometry, pointsMaterial);
			group.add(points);

			// Convex Hull
			const meshMaterial = new THREE.MeshLambertMaterial({
				color: 0xffffff,
				opacity: 0.5,
				side: THREE.DoubleSide,
				transparent: true,
			});

			const meshGeometry = new ConvexGeometry(vertices);
			const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
			group.add(mesh);

			// Animation Loop
			const animate = () => {
				requestAnimationFrame(animate);
				group.rotation.y += 0.005;
				renderer.render(scene, camera);
			};
			animate();
		}

		// Window resize handler
		const onWindowResize = () => {
			if (camera && renderer) {
				camera.aspect = 1;
				camera.updateProjectionMatrix();
				renderer.setSize(300, 300);
			}
		};

		// Initialize scene
		init();

		// Event listener and cleanup
		window.addEventListener("resize", onWindowResize);

		return () => {
			if (mountRef.current && renderer) {
				mountRef.current.removeChild(renderer.domElement);
			}
			renderer.dispose();
			window.removeEventListener("resize", onWindowResize);
		};
	}, []);

	return <div ref={mountRef} style={{ width: "300px", height: "300px" }} />;
};

export default ConvexGeometryComponent;
