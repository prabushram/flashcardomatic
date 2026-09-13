import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from './App';

test("renders Not Found for an unknown route", () => {
  render(
    <MemoryRouter initialEntries={["/unknown-route"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
