'use client';

import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
	min: number;
	max: number;
	defaultVal: number;
	value: number;
	step: number;
	onChange: (value: any) => void;
	className?: string;
}

const Slider: React.FC<SliderProps> = ({ step, min, max, defaultVal, value, onChange, className }) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0]);
	}

	return (
		<RadixSlider.Root defaultValue={[defaultVal]} value={[value]} onValueChange={handleChange} max={max} min={min} step={step}
			aria-label='Slider'
			className={twMerge('relative flex items-center select-none touch-none w-full', className)}>
			<RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
				<RadixSlider.Range className='absolute bg-white rounded-full h-full' />
			</RadixSlider.Track>
			<RadixSlider.Thumb className={`block opacity-0 hover:opacity-100 w-[8px] h-[8px] rounded-full bg-white shadow-lg transition
				focus:outline-none`} aria-label='Slider Thumb' />
		</RadixSlider.Root>
	);
};

export default Slider;
