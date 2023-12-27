export const upperCaseArrayElems = <T extends string>(array: T[]) => {
	return array.map((elem) => elem[0].toUpperCase() + elem.slice(1));
};
