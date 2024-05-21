import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './../app/(site)/page';

describe('Home', () => {
	it('renders all its child components', () => {
		render(<Home />);

		const header = screen.getByTestId('header');
		const userLabel = screen.getByTestId('user-label');
		const liked = screen.getByTestId('liked');
		const controls = screen.getByTestId('controls');
		const newHeader = screen.getByTestId('new');
		const newSongs = screen.getByTestId('new-songs');

		expect(header).toBeInTheDocument();
		expect(userLabel).toBeInTheDocument();
		expect(liked).toBeInTheDocument();
		expect(controls).toBeInTheDocument();
		expect(newHeader).toBeInTheDocument();
		expect(newSongs).toBeInTheDocument();

		expect(header).toContainElement(userLabel);
		expect(header).toContainElement(liked);
		expect(header).toContainElement(controls);
	})
});
