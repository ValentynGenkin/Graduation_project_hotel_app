import jwt from "jsonwebtoken";

export const isTokenIncluded = (req) => {
  return req.cookies.customer_access_token
    ? req.cookies.customer_access_token
    : false;
};

export const verifyUserToken = (token) => {
  const { JWT_SECRET_KEY } = process.env;
  const result = jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    };
  });
  return result;
};

export const isAdminTokenIncluded = (req) => {
  return req.cookies.admin_access_token
    ? req.cookies.admin_access_token
    : false;
};
