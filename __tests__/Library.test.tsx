import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Library from './../app/library/page';

describe('Library', () => {
	it('renders all its child components', () => {
		render(<Library searchParams={{ title: '' }} />);

		const header = screen.getByTestId('header');
		const libraryContent = screen.getByTestId('library-content');
		const libraryInput = screen.getByTestId('input');
		const h1 = screen.getByRole('heading', { level: 1 });

		expect(header).toBeInTheDocument();
		expect(libraryContent).toBeInTheDocument();
		expect(libraryInput).toBeInTheDocument();
		expect(h1).toBeInTheDocument();

		expect(h1).toHaveTextContent('Ваша Библиотека');
		expect(header).toContainElement(h1);
		expect(header).toContainElement(libraryInput);
	})
});
