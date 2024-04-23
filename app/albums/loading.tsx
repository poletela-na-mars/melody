'use client';

import React from 'react';

import Box from '@/components/Box';
import { BounceLoader } from 'react-spinners';

import { theme } from '@/theme';

const Loading = () => {
	return (
		<Box className='h-full flex items-center justify-center'>
			<BounceLoader color={theme.mainBlue} size={40} />
		</Box>
	);
};

export default Loading;
