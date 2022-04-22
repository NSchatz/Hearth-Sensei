import { render, screen } from '@testing-library/react';
import CustomBattle from '../customBattle';

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
    render(<CustomBattle />);
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
});

test('expects fetch to be called', async () => {
    render(<CustomBattle />);
    await expect(fetch).toHaveBeenCalledTimes(1);
});
