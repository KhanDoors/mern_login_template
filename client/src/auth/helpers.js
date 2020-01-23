import cookie from "js-cookie";

// set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

//remove from cookie
export const removeCookie = key => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1
    });
  }
};

//get from cookie
export const getCookie = (key, value) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage

//authenticate user from localstorage and cookie

//access user from localstorage
