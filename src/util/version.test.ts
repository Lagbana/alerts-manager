import { isVersion, getVersion, VERSIONS } from "./version";

describe("Handler Versioning", () => {
  describe("isVersion", () => {
    it("should return true for a valid version", () => {
      expect(isVersion("1.0.0")).toBe(true);
    });

    it("should return false for an invalid version", () => {
      expect(isVersion("2.0.0")).toBe(false);
    });
  });

  describe("getVersion", () => {
    it("should return the mapped version for a valid input", () => {
      expect(getVersion("1.0.0")).toBe(VERSIONS.V1);
    });

    it("should return undefined for an invalid input", () => {
      expect(getVersion("2.0.0")).toBeUndefined();
    });
  });
});
