import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCheckPesel } from "./useCheckPesel";

const peselOk = "90122412342";
const peselBad = "90122412341";
const peselVeryBad = "00000000000";
describe("Test Hooka useCheckPesel", () => {
  it("Zwraca valid true dla prawidłowego peselu", () => {
    const { result, rerender } = renderHook(() => useCheckPesel());

    act(() => {
      result.current.setPesel(peselOk);
    });
    rerender();
    act(result.current.handleCheck);

    expect(result.current.result).toEqual({
      valid: true,
      birth: "1990-12-24",
      sex: "F",
    });
  });

  it("Zwraca valid false i error istnieje dla nieprawidłowego peselu", () => {
    const { result } = renderHook(() => useCheckPesel());

    act(() => {
      result.current.setPesel(peselBad);
    });
    act(result.current.handleCheck);
    expect(result.current.result?.valid).toBe(false);
    expect(result.current.result?.error).toBeTruthy();
  });

  it("Zwraca Nieprawidłowa data urodzenia przy błędnym peselu", () => {
    const { result } = renderHook(() => useCheckPesel());

    act(() => {
      result.current.setPesel(peselVeryBad);
    });
    act(result.current.handleCheck);
    expect(result.current.result).toEqual({
      valid: false,
      error: "Nieprawidłowa data urodzenia",
    });
  });
});
