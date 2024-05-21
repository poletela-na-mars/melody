import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Stat from './../app/stat/page';

describe('Stat', () => {
	it('renders all its child components', () => {
		render(<Stat />);

		const header = screen.getByTestId('header');
		const statContent = screen.getByTestId('stat-content');
		const h1 = screen.getByRole('heading', { level: 1 });

		expect(header).toBeInTheDocument();
		expect(statContent).toBeInTheDocument();
		expect(h1).toBeInTheDocument();

		expect(h1).toHaveTextContent('Статистика по прослушанной Вами музыке');
		expect(header).toContainElement(h1);
	})
});
