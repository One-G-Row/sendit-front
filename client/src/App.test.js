import { render, screen } from "@testing-library/react";
import App from "./components/App"; // Adjusted path to App.js
import { MemoryRouter } from "react-router-dom";

test('renders homepage with welcome message', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
