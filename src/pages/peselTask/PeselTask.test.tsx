import { describe, expect, afterEach, test, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PeselTask } from "./PeselTask";

afterEach(cleanup);

const setup = () => {
  const user = userEvent.setup();
  render(<PeselTask />);
  const btn = screen.getByRole("button");
  const inp = screen.getByRole("textbox");
  return { user, btn, inp };
};

const peselOk = "90122412342";
const peselBad = "90122412341";

describe("PeselTask tests", () => {
  test("Pokazuje Date urodzenia i płeć po podaniu poprawnego peselu", async () => {
    const { user, btn, inp } = setup();

    await user.type(inp, peselOk);
    await user.click(btn);

    expect(await screen.findByText("PESEL PRAWIDŁOWY")).toBeInTheDocument();
    expect(screen.getByText("DATA URODZENIA: 1990-12-24")).toBeInTheDocument();
    expect(screen.getByText("PŁEĆ: F")).toBeInTheDocument();
  });

  it("Pokazuje Błąd po wpisaniu nieprawidłowego Peselu", async () => {
    const { user, btn, inp } = setup();

    await user.type(inp, peselBad);
    await user.click(btn);

    expect(
      await screen.findByText("BŁĄD Nieprawidłowa suma kontrolna !!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/BŁĄD .*suma kontrolna/i)
    ).toBeInTheDocument();
  });
});
