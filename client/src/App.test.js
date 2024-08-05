import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test('renders homepage with welcome message', () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  const welcomeMessage = screen.getByText(/Welcome to SendIT/i);
  expect(welcomeMessage).toBeInTheDocument();
});
