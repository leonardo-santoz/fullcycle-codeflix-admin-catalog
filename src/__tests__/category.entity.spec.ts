import { Category } from "../category/domain/category.entity";
import { Uuid } from "../shared/domain/value-objects/uuid-vo";

describe("Category Unit Tests", () => {
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
  });

  it("should change description", () => {
    const category = Category.create({ name: "Movie" });
    category.changeDescription("New Description");

    expect(category.description).toBe("New Description");
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
