import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerOptions = (url) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hotel Booking API",
        version: "1.0.0",
        description: "Hotel Booking API",
      },
      servers: [
        {
          url: `${url}`,
        },
      ],
    },
    // Path to the API docs
    apis: [path.join(__dirname, "..", "..", "docs", "*.yaml")],
  };

  return options;
};
