import CNPJ from "../../../src/domain/vo/CNPJ";

describe("CNPJ", () => {
  it.each(["50.044.175/0001-79", "99674314000137"])("should validate the CNPJ %s", (cnpj: string) => {
    expect(new CNPJ(cnpj).getValue()).toBe(cnpj);
  });

  it.each([null, undefined, "", "111"])("should fail the validation on the CNPJ %s", (cnpj: any) => {
    expect(() => new CNPJ(cnpj)).toThrow(new Error("Invalid CNPJ"));
  });
});
