import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders landing page', () => {
  render(<App />);
  const titleElement = screen.getByText("Welcome to Hearth-Sensei");
  expect(titleElement).toBeInTheDocument();
});
