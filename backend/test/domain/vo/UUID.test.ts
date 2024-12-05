import UUID from "../../../src/domain/vo/UUID";

describe("UUID", () => {
  it("should create a UUID instance with a provided value", () => {
    const uuidValue = "123e4567-e89b-12d3-a456-426614174000";
    const uuid = new UUID(uuidValue);

    expect(uuid.getValue()).toBe(uuidValue);
  });

  it("should throw if provided UUID is invalid", () => {
    const uuidValue = "111111111";

    expect(() => new UUID(uuidValue)).toThrow(new Error("Invalid UUID format"));
  });
});
