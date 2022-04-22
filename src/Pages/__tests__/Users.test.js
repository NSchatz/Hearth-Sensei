import { render, screen } from '@testing-library/react';
import Users from '../Users';

test('renders empty page if no profile is selected', () => {
    render(<Users />);
    const titleElement = screen.getByText("Profile not selected");
    expect(titleElement).toBeInTheDocument();
});

test('checks if label and button display correctly', () => {
    render(<Users />);
    const labelElement = screen.getByTestId('users-test');
    const buttonElement = screen.getByText("Load Profile");
    expect(buttonElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
});
