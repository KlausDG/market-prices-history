export default class CNPJ {
  private static readonly LENGTH = 14;
  private static readonly INVALID_PATTERN = /^(\d)\1+$/;
  private static readonly FIRST_VERIFIER_POSITION = 12;
  private static readonly SECOND_VERIFIER_POSITION = 13;
  private static readonly BASE_MODULE = 11;

  private readonly value: string;

  constructor(cnpj: string) {
    const sanitizedCNPJ = this.sanitize(cnpj);
    if (!this.isValid(sanitizedCNPJ)) throw new Error("Invalid CNPJ");
    this.value = cnpj;
  }

  private sanitize(cnpj: string): string {
    return cnpj?.replace(/\D/g, "");
  }

  private isValid(cnpj: string): boolean {
    if (!cnpj || cnpj.length !== CNPJ.LENGTH || CNPJ.INVALID_PATTERN.test(cnpj)) {
      return false;
    }

    return (
      this.calculateDigit(cnpj, CNPJ.FIRST_VERIFIER_POSITION) === parseInt(cnpj[CNPJ.FIRST_VERIFIER_POSITION], 10) &&
      this.calculateDigit(cnpj, CNPJ.SECOND_VERIFIER_POSITION) === parseInt(cnpj[CNPJ.SECOND_VERIFIER_POSITION], 10)
    );
  }

  private calculateDigit(cnpj: string, position: number): number {
    const FACTOR_START = position - 7;

    let sum = 0;

    for (let i = 0, factor = FACTOR_START; i < position; i++, factor--) {
      if (factor < 2) factor = 9;
      sum += parseInt(cnpj[i], 10) * factor;
    }

    const remainder = sum % CNPJ.BASE_MODULE;
    return remainder < 2 ? 0 : CNPJ.BASE_MODULE - remainder;
  }

  public format() {
    return this.value?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }

  public getValue() {
    return this.value;
  }

  public equals(other: CNPJ) {
    return this.value === other.value;
  }
}
