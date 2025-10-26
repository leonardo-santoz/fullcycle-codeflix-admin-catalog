import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(public value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  it("should  be equals", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test");
    expect(valueObject1.equals(valueObject2)).toBeTruthy();

    const complexity1 = new ComplexValueObject("value", 123);
    const complexity2 = new ComplexValueObject("value", 123);
    expect(complexity1.equals(complexity2)).toBeTruthy();
  });

  it("should not be equals", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test2");
    expect(valueObject1.equals(valueObject2)).toBeFalsy();

    expect(valueObject1.equals(null as any)).toBeFalsy();
    expect(valueObject1.equals(undefined as any)).toBeFalsy();

    const complexyValueObject1 = new ComplexValueObject("value", 123);
    const complexyValueObject2 = new ComplexValueObject("value2", 456);
    expect(complexyValueObject1.equals(complexyValueObject2)).toBeFalsy();

    expect(complexyValueObject1.equals(null as any)).toBeFalsy();
    expect(complexyValueObject2.equals(undefined as any)).toBeFalsy();
  });
});
