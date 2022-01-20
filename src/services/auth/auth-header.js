import currentUser from "src/services/auth/current-user"
export default function authHeader() {
  let ourCurrentUser = currentUser()
  if (ourCurrentUser && ourCurrentUser.accessToken) {
    return { Authorization: "Bearer " + ourCurrentUser.accessToken }
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {}
  }
}
