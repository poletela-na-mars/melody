export const convertSecToTime = (seconds: number) => {
	const min = Math.floor(seconds / 60);
	const sec = Math.floor(seconds % 60);

	return {
		min: min,
		sec: sec,
	}
};
