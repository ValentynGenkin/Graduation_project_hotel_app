import supertest from "supertest";
import dotenv from "dotenv";

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../__testUtils__/dbMock.js";
import app from "../app.js";
import { findUserInMockDB } from "../__testUtils__/userMocks.js";

const request = supertest(app);

beforeAll(async () => {
  dotenv.config();
  await connectToMockDB();
});

afterEach(async () => {
  await clearMockDatabase();
});

afterAll(async () => {
  await closeMockDatabase();
});

const testUserBase = {
  firstname: "John",
  lastname: "hasan",
  email: "john@doe.com",
  password: "123123",
  phone: "0685753609",
};
describe("POST /api/user/create", () => {
  it("Should return a bad request if no user object is given", (done) => {
    request
      .post("/api/auth/register")
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);
        expect(body.message.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Should return a bad request if the user object does not have a password", (done) => {
    const testUser = { ...testUserBase };
    delete testUser.password;
    request
      .post("/api/auth/register")
      .send({ ...testUser })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Should return a bad request if the user object does not have a email", (done) => {
    const testUser = { ...testUserBase };
    delete testUser.email;
    request
      .post("/api/auth/register")
      .send({ ...testUser })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Should return a bad request if the user object does not have a firstname", (done) => {
    const testUser = { ...testUserBase };
    delete testUser.firstname;
    request
      .post("/api/auth/register")
      .send({ ...testUser })
      .then((response) => {
        expect(response.status).toBe(400);

        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it("Should return a success state if a correct user is given", () => {
    const testUser = { ...testUserBase };

    return request
      .post("/api/auth/register")
      .send({ ...testUser })
      .then((response) => {
        expect(response.status).toBe(201);

        const { body } = response;

        expect(body.success).toBe(true);
        expect(body.customer.firstname).toEqual(testUser.firstname);
        expect(body.customer.email).toEqual(testUser.email);
        expect(body.customer.lastname).toEqual(testUser.lastname);
        expect(body.customer.phone).toEqual(testUser.phone);
        expect(body.customer.role).toEqual("customer");

        // Check that it was added to the DB
        return findUserInMockDB(body.customer._id);
      })
      .then((userInDb) => {
        expect(userInDb.firstname).toEqual(testUser.firstname);
        expect(userInDb.email).toEqual(testUser.email);
        expect(userInDb.lastname).toEqual(testUser.lastname);
        expect(userInDb.phone).toEqual(testUser.phone);
        expect(userInDb.role).toEqual("customer");
      });
  });
  it("Should return a bad request if the provided email is already registered", (done) => {
    const testUser = { ...testUserBase };
    request
      .post("/api/auth/register")
      .send({ ...testUser })
      .then((response) => {
        expect(response.status).toBe(201);
        return request.post("/api/auth/register").send({ ...testUser });
      })
      .then((response) => {
        expect(response.status).toBe(400);
        const { body } = response;
        expect(body.success).toBe(false);

        expect(body.message.length).not.toBe(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
