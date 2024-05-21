import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Search from './../app/search/page';

describe('Search', () => {
	it('renders all its child components', () => {
		render(<Search searchParams={{ title: '' }} />);

		const header = screen.getByTestId('header');
		const searchContent = screen.getByTestId('search-content');
		const searchInput = screen.getByTestId('input');
		const h1 = screen.getByRole('heading', { level: 1 });

		expect(header).toBeInTheDocument();
		expect(searchContent).toBeInTheDocument();
		expect(searchInput).toBeInTheDocument();
		expect(h1).toBeInTheDocument();

		expect(h1).toHaveTextContent('Поиск');
		expect(header).toContainElement(h1);
		expect(header).toContainElement(searchInput);
	})
});
