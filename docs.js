const date_today = new Date();
const date_future = new Date();

date_future.setFullYear(2025, 1, 1);
date_today.setHours(0, 0, 0, 0);
date_future.setHours(0, 0, 0, 0);

module.exports = {
  swagger: "2.0",
  info: {
    title: "Arbitrage Betting API",
    version: "2.0.1",
    description: ""
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "The value should be: `Bearer: ACCESS_TOKEN`",
      default: "Bearer "
    }
  },
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Providers" },
    { name: "History" }
  ],
  paths: {
    "/api/auth/signin": {
      post: {
        tags: ["Auth"],
        summary: "Sign In user",
        description: "Method for authorizing an already existing user",
        consumes: ["application/json"],
        deprecated: false,
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: { type: "string", required: true },
                password: { type: "string", required: true }
              }
            }
          }
        ],
        responses: {
          200: { description: "Success. Gives out user `token`" },
          422: { description: "Failed! Not all fields has filled" },
          404: { description: "Failed! User is not found" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },

    "/api/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Sign Up user",
        description: "Method for creating a new user",
        consumes: ["application/json"],
        deprecated: false,
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                fname: { type: "string", required: true },
                lname: { type: "string", required: true },
                email: { type: "string", required: true },
                password: { type: "string", required: true }
              }
            }
          }
        ],
        responses: {
          200: { description: "Success. Gives out user `token`" },
          422: { description: "Failed! Not all fields has filled" },
          404: { description: "Failed! User already exist" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get current user settings",
        description: "Method for getting current user info (all settings)",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success. Gives out `user` and `stats`" },
          404: { description: "Failed! User not found" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get one user info",
        description: "Method for getting info about one user",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success. Gives out `user` and `stats`" },
          500: { description: "Failed! Unexpected server error" }
        },
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true
          }
        ]
      },
      put: {
        tags: ["Users"],
        summary: "Update current user settings",
        description:
          "Method for updating current user settings (info)<br><br>`All fields is not required!`",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "id",
            type: "string",
            description: "UserId"
          },
          {
            in: "formData",
            name: "fname",
            type: "string",
            description: "FirstName"
          },
          {
            in: "formData",
            name: "lname",
            type: "string",
            description: "LastName"
          },
          {
            in: "formData",
            name: "email",
            type: "string",
            format: "email",
            description: "User email"
          },
          {
            in: "formData",
            name: "password",
            type: "string",
            format: "password",
            description: "User Password"
          }
        ],
        responses: {
          200: { description: "Success." },
          422: { description: "Failed! Not all fields has filled" },
          500: { description: "Failed! Unexpected server error" }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Delete User by ID",
        description: "Method for deleting one User by ID",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success." },
          403: { description: "Failed! Forbidden" },
          404: { description: "Failed! User is not exist" },
          500: { description: "Failed! Unexpected server error" }
        },
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true
          }
        ]
      }
    },
    "/api/users/block": {
      post: {
        tags: ["Users"],
        summary: "Block User",
        description: "Action is Required",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "id",
            type: "string",
            description: "UserId"
          },
          {
            in: "formData",
            name: "action",
            type: "boolean",
            description: "Status"
          }
        ],
        responses: {
          200: { description: "Success." },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },
    "/api/users/create": {
      post: {
        tags: ["Users"],
        summary: "Create new user",
        description:
          "Method for creating user (info)<br><br>`All fields is not required!`",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "fname",
            type: "string",
            description: "FirstName"
          },
          {
            in: "formData",
            name: "lname",
            type: "string",
            description: "LastName"
          },
          {
            in: "formData",
            name: "email",
            type: "string",
            format: "email",
            description: "User email"
          },
          {
            in: "formData",
            name: "password",
            type: "string",
            format: "password",
            description: "User Password"
          }
        ],
        responses: {
          200: { description: "Success." },
          422: { description: "Failed! Not all fields has filled" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },
    "/api/providers/{id}": {
      get: {
        tags: ["Providers"],
        summary: "Get one user's provider info",
        description: "Method for getting info about one user's provider",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success. Gives out `provider`" },
          500: { description: "Failed! Unexpected server error" }
        },
        parameters: [
          {
            name: "user_id",
            in: "path",
            type: "string",
            description: "UserId",
            required: true
          }
        ]
      },
      put: {
        tags: ["Providers"],
        summary: "Update current provider",
        description:
          "Method for updating current provider (info)<br><br>`All fields is not required!`",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "id",
            type: "string",
            description: "ProviderId"
          },
          {
            in: "formData",
            name: "user_id",
            type: "string",
            description: "UserId"
          },
          {
            in: "formData",
            name: "name",
            type: "string",
            description: "Name"
          },
          {
            in: "formData",
            name: "url",
            type: "string",
            description: "URL"
          }
        ],
        responses: {
          200: { description: "Success." },
          422: { description: "Failed! Not all fields has filled" },
          500: { description: "Failed! Unexpected server error" }
        }
      },
      delete: {
        tags: ["Providers"],
        summary: "Delete Provider by ID",
        description: "Method for deleting one Provider by ID",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success." },
          403: { description: "Failed! Forbidden" },
          404: { description: "Failed! Provider is not exist" },
          500: { description: "Failed! Unexpected server error" }
        },
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true
          }
        ]
      }
    },
    "/api/providers/create": {
      post: {
        tags: ["Providers"],
        summary: "Create new provider",
        description:
          "Method for creating provider (info)<br><br>`All fields is not required!`",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "user_id",
            type: "string",
            description: "UserId"
          },
          {
            in: "formData",
            name: "name",
            type: "string",
            description: "Name"
          },
          {
            in: "formData",
            name: "url",
            type: "string",
            description: "URL"
          }
        ],
        responses: {
          200: { description: "Success." },
          422: { description: "Failed! Not all fields has filled" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },
    "/api/commands/{id}": {
      get: {
        tags: ["Commands"],
        summary: "Get one provider's command info",
        description: "Method for getting info about one provider's command",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success. Gives out `command`" },
          500: { description: "Failed! Unexpected server error" }
        },
        parameters: [
          {
            name: "provider_id",
            in: "path",
            type: "string",
            description: "ProviderId",
            required: true
          }
        ]
      },
      put: {
        tags: ["Commands"],
        summary: "Update current Command",
        description:
          "Method for updating current Command (info)<br><br>`All fields is not required!`",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "id",
            type: "string",
            description: "ProviderId"
          },
          {
            in: "formData",
            name: "step",
            type: "number",
            description: "Step"
          },
          {
            in: "formData",
            name: "command",
            type: "string",
            description: "Command"
          },
          {
            in: "formData",
            name: "screen",
            type: "file",
            description: "ScreenShot"
          }
        ],
        responses: {
          200: { description: "Success." },
          422: { description: "Failed! Not all fields has filled" },
          500: { description: "Failed! Unexpected server error" }
        }
      },
      delete: {
        tags: ["Commands"],
        summary: "Delete Command by ID",
        description: "Method for deleting one command by ID",
        security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success." },
          403: { description: "Failed! Forbidden" },
          404: { description: "Failed! Command is not exist" },
          500: { description: "Failed! Unexpected server error" }
        },
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true
          }
        ]
      }
    },
    "/api/commands/create": {
      post: {
        tags: ["Commands"],
        summary: "Create new command",
        description:
          "Method for creating command (info)<br><br>`All fields is not required!`",
        consumes: ["multipart/form-data"],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: "formData",
            name: "provider_id",
            type: "string",
            description: "ProviderId"
          },
          {
            in: "formData",
            name: "step",
            type: "number",
            description: "Step"
          },
          {
            in: "formData",
            name: "command",
            type: "string",
            description: "Command"
          }
        ],
        responses: {
          200: { description: "Success." },
          422: { description: "Failed! Not all fields has filled" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    },
    "/api/history": {
      get: {
        tags: ["History"],
        summary: "Get historical transactions",
        description: "Method for getting historical transactions",
        // security: [{ Bearer: [] }],
        responses: {
          200: { description: "Success. Gives out" },
          500: { description: "Failed! Unexpected server error" }
        }
      }
    }
  }
};
