import { InvalidUuidError, Uuid } from "../uuid-vo";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

describe("Uuid Unit Tests", () => {
  it("should throw an error when the UUID is invalid", () => {
    expect(() => {
      new Uuid("invalid-uuid");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a valid uuid", () => {
    const uuid = new Uuid("32eac1e7-a640-40c0-b011-512f4f43680c");
    expect(uuid.id).toBe("32eac1e7-a640-40c0-b011-512f4f43680c");
    expect(validateSpy).toHaveBeenCalled();
  });
});
