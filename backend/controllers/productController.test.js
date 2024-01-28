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
describe("Product Controller", () => {});
