import CNPJ from "../vo/CNPJ";
import UUID from "../vo/UUID";

export default class Market {
  private id: UUID;
  private cnpj: CNPJ;

  constructor(id: string, readonly description: string, cnpj: string, readonly address: string) {
    this.id = new UUID(id);
    this.cnpj = new CNPJ(cnpj);
    this.description = description;
  }

  static create(description: string, cnpj: string, address: string) {
    const id = crypto.randomUUID();

    return new Market(id, description, cnpj, address);
  }

  getValues() {
    return {
      id: this.id.getValue(),
      description: this.description,
      cnpj: this.cnpj.format(),
      address: this.address,
    };
  }
}
