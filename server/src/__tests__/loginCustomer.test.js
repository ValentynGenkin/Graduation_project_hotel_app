import supertest from "supertest";
import dotenv from "dotenv";

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../__testUtils__/dbMock.js";
import app from "../app.js";

const request = supertest(app);

const testUserBase = {
  firstname: "John",
  lastname: "hasan",
  email: "john@doe.com",
  password: "123123",
  phone: "0685753609",
};

beforeAll(async () => {
  dotenv.config();
  await connectToMockDB();
  await request
    .post("/api/auth/register")
    .send({ ...testUserBase })
    .then((response) => {
      expect(response.status).toBe(201);
    });
});

afterEach(async () => {
  await clearMockDatabase();
});

afterAll(async () => {
  await closeMockDatabase();
});

describe("POST /api/user/create", () => {
  it("Should return a success state if user is registered and credientals are correct", (done) => {
    const testUser = {
      ...testUserBase,
    };
    request
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(!response.headers["set-cookie"]).toBe(false);
        const { body } = response;
        expect(body.success).toBe(true);
        expect(body.customer.firstname).toEqual(testUser.firstname);
        expect(body.customer.email).toEqual(testUser.email);
        expect(body.customer.lastname).toEqual(testUser.lastname);
        expect(body.customer.phone).toEqual(testUser.phone);
        expect(body.customer.role).toEqual("customer");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Should return a bad request if email input is missing", (done) => {
    const testUser = {
      ...testUserBase,
    };
    request
      .post("/api/auth/login")
      .send({ password: testUser.password })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);

        done();
      });
  });
  it("Should return a bad request if password input is missing", (done) => {
    const testUser = {
      ...testUserBase,
    };
    request
      .post("/api/auth/login")
      .send({ email: testUser.email })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);

        done();
      });
  });
  it("Should return a bad request if user credientals does not match", (done) => {
    const testUser = {
      ...testUserBase,
    };
    request
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongPassword" })
      .then((response) => {
        expect(response.status).toBe(401);

        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);

        done();
      });
  });
});
