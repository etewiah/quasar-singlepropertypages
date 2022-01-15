import { LocalStorage } from "quasar"
export default function currentUser() {
  let user = JSON.parse(LocalStorage.getItem("user"))
  return user
  // if (user && user.accessToken) {
  //   return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
  //   // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  // } else {
  //   return {};
  // }
}
