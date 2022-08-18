import axios from "axios";
import config from "./config";

// Helper functions to interact with api
export const helpers = {
  // helper function to make api calls
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const options = {
      method,
      url: config.apiBaseUrl + path,
    };

    if (body) {
      options.body = body;
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers = { Authorization: `Basic ${encodedCredentials}` };
    }

    return axios(options);
  },

  // get user
  async getUser(emailAddress, password) {
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password,
    });
    return response;
  },
};
