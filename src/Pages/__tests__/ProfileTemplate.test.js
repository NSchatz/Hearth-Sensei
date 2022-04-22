import { render, screen } from '@testing-library/react';
import ProfileTemplate from '../ProfileTemplate';

const mockResponse = [{
    id: "100",
    card1: "Custom",
    card1_attack: 10,
    card1_health: 5,
    card2: "Chicken",
    card2_attack: 3,
    card2_health: 4,
    winner: "Tester",
}, {}];

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
    })
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('renders profile template', () => {
    render(<ProfileTemplate />);
    const titleElement = screen.getByText("Player Card");
    expect(titleElement).toBeInTheDocument();
});

test('renders delete all button when user is looking at their own profile', () => {
    render(<ProfileTemplate name={{ user: 'Tester' }} value={{ isMainProfile: true }} />);
    const buttonElement = screen.getByDisplayValue("Delete All Entries");
    expect(buttonElement).toBeInTheDocument();
});

test('expects fetch to be called', async () => {
    render(<ProfileTemplate name={{ user: 'Tester' }} value={{ isMainProfile: true }} />);
    await expect(fetch).toHaveBeenCalledTimes(1);
});
