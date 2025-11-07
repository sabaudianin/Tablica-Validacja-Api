import { describe, it, expect } from "vitest";
import { validatePesel } from "./validatePesel";

const arrayOfGoodPesels = ["99810100013", "90122412342", "03250912345"];
const arrayOfBadPesels = ["99999999999", "00000000000", "03250912346"];

describe("ValidatePesel Tests - Pesele Poprawne", () => {
  arrayOfGoodPesels.map((pesel) => {
    it(`zwraca valid true dla poprawnego peselu ${pesel}`, () => {
      const response = validatePesel(pesel);
      expect(response.valid).toBe(true);
    });
  });
});

describe("ValidatePesel Tests -Pesele Niepoprawne", () => {
  arrayOfBadPesels.map((pesel) => {
    it(`zwraca valid false dla niepoprawnego peselu ${pesel}`, () => {
      const response = validatePesel(pesel);
      expect(response.valid).toBe(false);
    });
  });
});

describe("Validate Pesels - skrajne przypadki", () => {
  it("Nie przyjmuje ciagu nie bedącego stringiem", () => {
    // @ts-expect-error - zly typ dla testu
    const response = validatePesel(123);
    expect(response.valid).toBe(false);
    if (!response.valid) {
      expect(response.error).toMatch(/stringiem/i);
    }
  });
  it("Odrzucane są  znaki niebędące cyframi", () => {
    const response = validatePesel("9012241234X");
    expect(response.valid).toBe(false);
    if (!response.valid) {
      expect(response.error).toMatch(/11 cyfr/i);
    }
  });
  it("Zła suma kontrolna", () => {
    const response = validatePesel("89111407856");
    expect(response.valid).toBe(false);
    if (!response.valid) {
      expect(response.error).toMatch(/suma kontrolna/i);
    }
  });
});
