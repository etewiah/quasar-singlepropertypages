import currentUser from "src/services/auth/current-user"
export default function authHeader() {
  // debugger
  let ourCurrentUser = currentUser()
  // let currentUser = JSON.parse(localStorage.getItem("user"))

  if (ourCurrentUser && ourCurrentUser.accessToken) {
    return { Authorization: "Bearer " + ourCurrentUser.accessToken } // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {}
  }
}
