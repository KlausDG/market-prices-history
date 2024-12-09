import URL from "../../../src/domain/vo/URL";

describe("URL", () => {
  it("deve criar uma URL válida", () => {
    const validUrl = "https://example.com";
    const url = new URL(validUrl);

    expect(url.getValue()).toBe(validUrl);
  });

  it("deve lançar um erro para uma URL inválida", () => {
    const invalidUrl = "invalid-url";

    expect(() => new URL(invalidUrl)).toThrow(`Invalid URL: ${invalidUrl}`);
  });
});
