import jwt from "jsonwebtoken";

export const isTokenIncluded = (req) => {
  return req.cookies.customer_access_token
    ? req.cookies.customer_access_token
    : false;
};

export const verifyCustomerToken = (token) => {
  const { JWT_SECRET_KEY } = process.env;
  const result = jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return {
      id: decoded.id,
      name: decoded.name,
    };
  });
  return result;
};
