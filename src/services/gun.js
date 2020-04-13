import Gun from "gun/gun";

let gunUrl = "/gun";
if (typeof location !== "undefined") {
  gunUrl = `${location.origin}/gun`;
}
export const gun = new Gun(gunUrl);
