import crypto from "crypto";
import UUID from "../vo/UUID";

export default class Product {
  private id: UUID;
  private measurementUnitId: UUID;
  private description: string;
  private code: number;

  constructor(id: string, measurementUnitId: string, description: string, code: number) {
    this.id = new UUID(id);
    this.measurementUnitId = new UUID(measurementUnitId);
    this.description = description;
    this.code = code;
  }

  static create(description: string, code: number, measurementUnitId: string) {
    const id = crypto.randomUUID();

    return new Product(id, measurementUnitId, description, code);
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getCode() {
    return this.code;
  }

  getMeasurementUnit() {
    return this.measurementUnitId;
  }
}
