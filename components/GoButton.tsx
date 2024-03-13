import React from 'react';

import { TiArrowForward } from 'react-icons/ti';

const GoButton = () => {
	return (
		<button className={`transition opacity-0 rounded-full flex items-center bg-mainGreen
			p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110`}>
			<TiArrowForward className='text-black' size={24} />
		</button>
	);
};

export default GoButton;
