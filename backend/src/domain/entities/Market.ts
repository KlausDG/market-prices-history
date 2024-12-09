import CNPJ from "../vo/CNPJ";
import UUID from "../vo/UUID";

export default class Market {
  private id: UUID;
  private cnpj: CNPJ;

  constructor(id: string, readonly description: string, cnpj: string, readonly address?: string) {
    this.id = new UUID(id);
    this.cnpj = new CNPJ(cnpj);

    if (!description) {
      throw new Error("Description must not be empty.");
    }
  }

  getId() {
    return this.id.getValue();
  }

  getDescription() {
    return this.description;
  }

  getCnpj() {
    return this.cnpj.format();
  }

  getAddress() {
    return this.address || "";
  }

  get getValues() {
    return {
      id: this.id.getValue(),
      description: this.description,
      cnpj: this.cnpj.format(),
      address: this.address,
    };
  }
}
