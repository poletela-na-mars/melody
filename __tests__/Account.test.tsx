import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Account from './../app/account/page';

describe('Account', () => {
	it('renders all its child components', () => {
		render(<Account />);

		const header = screen.getByTestId('header');
		const accountContent = screen.getByTestId('account-content');
		const h1 = screen.getByRole('heading', { level: 1 });

		expect(header).toBeInTheDocument();
		expect(accountContent).toBeInTheDocument();
		expect(h1).toBeInTheDocument();

		expect(h1).toHaveTextContent('Настройки аккаунта');
		expect(header).toContainElement(h1);
	})
});
