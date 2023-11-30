import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge';

const Button = ({
	className,
	children,
	disabled,
	type = 'button',
	...props
}: ComponentProps<'button'>) => {
	return (
		<button type={type} className={twMerge(`w-full rounded-full bg-mainBlue
			border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50
			text-black font-bold hover:opacity-75 transition`, className)} disabled={disabled} {...props}>
			{children}
		</button>
	)
};

Button.displayName = 'Button';

export default Button;
