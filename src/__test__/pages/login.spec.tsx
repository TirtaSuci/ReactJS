import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/auth/login';

// Mock komponen LoginView
jest.mock('@/view/auth/login', () => () => <div data-testid="login-view">Login View</div>);

describe('LoginPage', () => {
    it('should render LoginView component', () => {
        render(<LoginPage />);
        const loginView = screen.getByTestId('login-view');
        expect(loginView).toBeInTheDocument();
    });
});
