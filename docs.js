const date_today = new Date();
const date_future = new Date();

date_future.setFullYear(2025, 1, 1);
date_today.setHours(0, 0, 0, 0);
date_future.setHours(0, 0, 0, 0);

module.exports = {
	swagger: '2.0',
	info: {
		title: "Arbitrage Betting API",
		version: "2.0.1",
		description: '',
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
		{name: "Auth"},
		{name: "Users"}
	],
	paths: {
		"/api/auth/signin": {
			post: {
				tags: [ "Auth" ],
				summary: "Sign In user",
				description: "Method for authorizing an already existing user",
				consumes: [ "application/json" ],
				deprecated: false,
				parameters: [
					{
						in: "body",
						name: "body",
						required: true,
						schema: {
							type: "object",
							properties: {
								email: {type: "string", required: true},
								password: {type: "string", required: true},
							}
						}
					}
				],
				responses: {
					200: {description: "Success. Gives out user `token`"},
					422: {description: "Failed! Not all fields has filled"},
					404: {description: "Failed! User is not found"},
					500: {description: "Failed! Unexpected server error"}
				}
			}
		},

		"/api/auth/signup": {
			post: {
				tags: [ "Auth" ],
				summary: "Sign Up user",
				description: "Method for creating a new user",
				consumes: [ "application/json" ],
				deprecated: false,
				parameters: [
					{
						in: "body",
						name: "body",
						required: true,
						schema: {
							type: "object",
							properties: {
								fname: {type: "string", required: true},
								lname: {type: "string", required: true},
								email: {type: "string", required: true},
								password: {type: "string", required: true},
							}
						}
					}
				],
				responses: {
					200: {description: "Success. Gives out user `token`"},
					422: {description: "Failed! Not all fields has filled"},
					404: {description: "Failed! User already exist"},
					500: {description: "Failed! Unexpected server error"}
				}
			}
		},
		"/api/users": {
			get: {
				tags: [ "Users" ],
				summary: "Get current user settings",
				description: "Method for getting current user info (all settings)",
				security: [{Bearer: []}],
 				responses: {
					200: {description: "Success. Gives out `user` and `stats`"},
					404: {description: "Failed! User not found"},
					500: {description: "Failed! Unexpected server error"}
				},
			},
		},
		"/api/users/{id}": {
			get: {
				tags: [ "Users" ],
				summary: "Get one user info",
				description: "Method for getting info about one user",
 				responses: {
					200: {description: "Success. Gives out `user` and `stats`"},
					500: {description: "Failed! Unexpected server error"}
				},
				parameters: [{
					name: "id",
					in: "path",
					type: "string",
					required: true
				}], 
			}
		},

		"/api/users/settings": {
			post: {
				tags: [ "Users" ],
				summary: "Update current user settings",
				description: "Method for updating current user settings (info)<br><br>`All fields is not required!`",
				consumes: [ "multipart/form-data" ],
				security: [{Bearer: []}],
				parameters: [{
					in: "formData",
					name: "fname",
					type: "string",
					description: "FirstName"
				},{
					in: "formData",
					name: "lname",
					type: "string",
					description: "LastName"
				},{
					in: "formData",
					name: "email",
					type: "string",
					format: "email",
					description: "User email"
				},{
					in: "formData",
					name: "password",
					type: "string",
					format: "password",
					description: "User Password"
				}],
				responses: {
					200: {description: "Success."},
					422: {description: "Failed! Not all fields has filled"},
					500: {description: "Failed! Unexpected server error"}
				}
			}
		},
	}
};