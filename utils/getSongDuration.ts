export const getSongDuration = (duration: number) => {
	const sec = duration / 1000;
	const min = Math.floor(sec / 60);
	const secRemain = Math.floor(sec % 60);
	const time = {
		min: min,
		sec: secRemain
	};

	return time;
};
