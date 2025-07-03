import ky from "ky";

export const request = ky.extend({
  credentials: "include",
  timeout: 30000,
  retry: 1,
});
