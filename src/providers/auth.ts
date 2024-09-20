import type { AuthProvider } from "@refinedev/core";

// import type { User } from "@/graphql/schema.types";

import { API_BASE_URL, API_URL } from "./data";
import dataProvider from "@refinedev/simple-rest";

/**
 * For demo purposes and to make it easier to test the app, you can use the following credentials:
 */

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await dataProvider(`${API_URL}`).create({
        resource: 'referrers/login', // Specify the resource here
        variables: {
          email, password
        },
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("referrerId", data.user.id);
      return {
        authenticated: true,
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;
      console.log(e)
      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  register: async ({ email, password ,firstName,lastName,country}) => {
    try {
      const { data } = await dataProvider(`${API_URL}`).create({
        resource: 'referrers/registration',
        variables: {
          email, password,firstName,lastName,country
        },
      });

      return {
        success: true,
        redirectTo: '/login',
        successNotification: {
          message: "Successful",
          description: "Instruction send to your email!",
        }
      };
    } catch (e) {
      const error = e as Error;
      console.log(e)
      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "Invalid email or password",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("referrerId");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
      };
    }

    return { error };
  },
  forgotPassword: async ({ email }): Promise<any> => {
    try {
      const { data } = await dataProvider(`${API_URL}`).create({
        resource: 'referrers/forgot-password',
        variables: {
          email,
        },
      });
      return {
        success: true,
        redirectTo: '/login',
        successNotification: {
          message: "Successful",
          description: "Instruction send to your email!",
        }
      }

    } catch (error: any) {
      return {
        success: false,
        errorNotification: {
          message: "Error",
          description: "Password reset failed"
        }
      }
    }
  },

  check: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        return {
          authenticated: true,
          redirectTo: "/",
        };
      } else {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/error", // Или любой другой путь для обработки ошибки
      };
    }
  },
  getIdentity: async () => {
    const userId = localStorage.getItem("referrerId");
    try {
      const { data } = await dataProvider(`${API_BASE_URL}`).getOne({
        resource: 'referrers',
        id: userId ? userId : ''
      });
      return data;
    } catch (error) {
      console.log("error,", error)
    }
  },
};
