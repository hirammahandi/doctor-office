import Cookies, { CookieChangeListener } from "universal-cookie";
import { TOKEN_EXPIRES, TOKEN_NAME } from "../shared";

const cookies = new Cookies();

export const setCookie = (value: string) => {
  return cookies.set(TOKEN_NAME, value, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: TOKEN_EXPIRES,
    path: "/",
  });
};

export const getAllCookies = () => cookies.getAll();

export const getToken = (): string | undefined => cookies.get(TOKEN_NAME);

export const removeToken = () =>
  cookies.remove(TOKEN_NAME, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
    path: "/",
  });

export const removeCookieListener = (cb: CookieChangeListener) =>
  cookies.removeChangeListener(cb);

export const addCookieListener = (cb: CookieChangeListener) =>
  cookies.addChangeListener(cb);
