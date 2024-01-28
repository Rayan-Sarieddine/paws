const supertest = require("supertest");
const Product = require("../models/product.model");
const request = supertest("http://127.0.0.1:8000");
async function loginAndGetToken() {
  const loginResponse = await request.post("/auth/login").send({
    email: "usera@gmail.com",
    password: "usera1234",
  });

  return loginResponse.body.token;
}
describe("Product Controller", () => {
  let token;
  beforeAll(async () => {
    token = await loginAndGetToken();
  });
  describe("addProduct Endpoint", () => {
    it("should create a product and return status 200", async () => {
      const productData = {
        barcode: "123456",
        name: "Test Product",
        price: 100,
        description: "This is a test product",
        details: "More details about the product",
        stock: 10,
      };

      const response = await request
        .post("/products/")
        .set("Authorization", `Bearer ${token}`)
        .send(productData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("status", "success");
      expect(response.body).toHaveProperty("product");
    });
  });
  describe("getAllProducts Endpoint", () => {
    it("should retrieve all products and return status 200", async () => {
      const response = await request
        .get("/products/")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.products)).toBe(true);
    });
  });

  describe("getProduct Endpoint", () => {
    let createdProductBarcode;

    beforeEach(async () => {
      const productData = {
        barcode: "12345679",
        name: "Get Test Product",
        price: 150,
        description: "This is a product for get testing",
        details: "More details about the get test product",
        stock: 5,
      };

      const response = await request
        .post("/products/")
        .set("Authorization", `Bearer ${token}`)
        .send(productData);

      createdProductBarcode = productData.barcode;
    });

    it("should retrieve a single product by barcode and return status 200", async () => {
      const response = await request
        .get(`/products/${createdProductBarcode}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.product).toHaveProperty(
        "barcode",
        createdProductBarcode
      );
    });
  });
});
