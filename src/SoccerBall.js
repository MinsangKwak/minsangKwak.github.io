// src/SoccerBall.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SoccerBall = () => {
	const mountRef = useRef(null);

	useEffect(() => {
		// Scene, Camera, Renderer 설정
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			1, // 축구공 크기를 줄이기 위해 종횡비를 1로 설정
			0.1,
			1000
		);
		camera.position.z = 2.5; // 카메라를 축구공에 더 가깝게 배치

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(100, 100); // 축구공 크기를 줄이기 위해 렌더링 크기를 작게 설정
		mountRef.current.appendChild(renderer.domElement);

		// 조명 추가
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);

		const pointLight = new THREE.PointLight(0xffffff, 0.8);
		pointLight.position.set(10, 10, 10);
		scene.add(pointLight);

		// 축구공 생성
		const soccerBallGeometry = new THREE.SphereGeometry(0.5, 32, 32); // 축구공 반경을 작게 설정
		const soccerBallMaterial = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0.5,
			metalness: 0.1,
		});

		const soccerBall = new THREE.Mesh(
			soccerBallGeometry,
			soccerBallMaterial
		);
		scene.add(soccerBall);

		// 애니메이션
		const animate = () => {
			requestAnimationFrame(animate);
			soccerBall.rotation.y += 0.01;
			renderer.render(scene, camera);
		};
		animate();

		// Clean up
		return () => {
			mountRef.current.removeChild(renderer.domElement);
			renderer.dispose();
		};
	}, []);

	return <div ref={mountRef} />;
};

export default SoccerBall;
