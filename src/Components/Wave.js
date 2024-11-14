const Wave = () => {
	const waveCount = 5; // 생성할 wave 개수

	return (
		<div className="wave-container">
			{Array.from({ length: waveCount }).map((_, index) => (
				<div key={index} className={`wave wave${index + 1}`}></div>
			))}
		</div>
	);
};

export default Wave;
