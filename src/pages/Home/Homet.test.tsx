import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./Home";
import { MemoryRouter, Routes, Route } from "react-router";

const user = userEvent.setup();
describe("Home component Tests", () => {
  it("Home is rendering ", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /spis/i })).toBeInTheDocument();
  });
  it("render link with attribute", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /Link do Repozytorium/i })
    ).toHaveAttribute(
      "href",
      "https://github.com/sabaudianin/Tablica-Validacja-Api"
    );
  });
  it("there are 3 links ", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /LITEROPRZESTAWIACZ/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /PESELCHECKER/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /API CRUD/i })).toBeInTheDocument();
  });

  it("click in link change navigation", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/api"
            element={<div>API PAGE</div>}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByText(/api page/i)).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: /API CRUD/i });
    await user.click(link);

    expect(screen.getByText(/api page/i)).toBeInTheDocument();
  });
});
