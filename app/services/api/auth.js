
import { signOut } from "next-auth/react";
import axiosClient from "../axiosClient";
import { cookieClient } from "../cookieClient";

const LOGIN_API_URI = `/login`;
const VERIFY_AUTH_API_URI = `/verify_auth`;
const SIGNUP_AUTH_API_URI = `/users`;
const LOGOUT_AUTH_API_URI = `/logout`;

export const login = async (user) => {
  const res = await axiosClient.post(LOGIN_API_URI, {
    email: user.email,
    password: user.password,
    role: "user",
  });

  return res
};

const signup = async (newUser) => {
  let signUpBody = {
    civilian_id: newUser.civilianId,
    phone: newUser.phoneNumber,
    email: newUser.email,
    name: newUser.name,
    type: newUser.type,
    role: newUser.role,
    group: newUser.group ? newUser.group : "",
    password: newUser.password,
  }
  const res = await axiosClient.post(SIGNUP_AUTH_API_URI, signUpBody);
  return res.data;
};

const logout = async (refreshToken) => {
  const res = await axiosClient.post(LOGOUT_AUTH_API_URI, {
    refresh_token: refreshToken,
  });

  if (res.status === 200) {
    cookieClient.eraseCookie("access_token");
    cookieClient.eraseCookie("refresh_token");
  }
  return res.data;
};

const verifyAuth = async () => {
  const res = await axiosClient.get(VERIFY_AUTH_API_URI);
  return res.data;
};

export { signup, logout, verifyAuth };
