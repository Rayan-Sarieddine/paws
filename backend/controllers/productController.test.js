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
});
