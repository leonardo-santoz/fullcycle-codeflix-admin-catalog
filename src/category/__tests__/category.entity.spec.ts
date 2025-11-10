import { Category } from "../../category/domain/category.entity";
import { EntityValidationError } from "../../shared/domain/validators/validation-error";
import { Uuid } from "../../shared/domain/value-objects/uuid-vo";

describe("Category Unit Tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  describe("Constructor", () => {
    it("should create a category with default value", () => {
      const category = new Category({ name: "Movie" });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a category with all values", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Movie",
        description: "Movie description",
        is_active: false,
        created_at,
      });

      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });

    it("should create a category with description", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("Create method", () => {
    it("should create a category using default value", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a category with is_active", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    it.each(arrange)("id = j%", ({ category_id }) => {
      const category = new Category({
        category_id: category_id as any,
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);

      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });

  it("should change name", () => {
    const category = Category.create({ name: "Movie" });
    category.changeName("New Movie");

    expect(category.name).toBe("New Movie");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should change description", () => {
    const category = Category.create({ name: "Movie" });
    category.changeDescription("New Description");

    expect(category.description).toBe("New Description");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should activate a category", () => {
    const category = Category.create({ name: "Movie", is_active: false });
    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  it("should deactivate a category", () => {
    const category = Category.create({ name: "Movie", is_active: true });
    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });
});

// describe("Category validator", () => {
//   it("should create an invalid caetegory with name property", () => {
//     expect(() => Category.create({ name: null })).containsErrorMessages({
//       name: [
//         "name should not be empty",
//         "name must be a string",
//         "name must be shorter than or equal 255 characters",
//       ],
//     });
//   });
// }); TODO: review lesson "Criando asserção personalizada para testar as invalidações"
