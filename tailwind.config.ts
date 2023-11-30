import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				mainBlue: '#4DA3CA',
				mainGreen: '#66B272',
				darkGray: '#404040',
			},
		},
	},
	plugins: [],
}
export default config
