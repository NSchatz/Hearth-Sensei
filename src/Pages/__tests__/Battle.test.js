import { render, screen } from '@testing-library/react';
import Battle from '../Battle';

const mockResponse = [{}, {}];

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse)
  })
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders loading spinner', () => {
  render(<Battle />);
  const loadingElement = screen.getByText("Loading...");
  expect(loadingElement).toBeInTheDocument();
});

test('expects fetch to be called', async () => {
  render(<Battle />);
  await expect(fetch).toHaveBeenCalledTimes(1);
});
