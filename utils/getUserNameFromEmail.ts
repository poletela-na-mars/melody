export const getUserNameFromEmail = (email: string | undefined) => {
	if (!email) return;

	const [name] = email.split('@');
	return name;
};
