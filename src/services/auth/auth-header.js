import { Cookies } from "quasar"
// import currentUser from "src/services/auth/current-user"
export default function authHeader() {
  const sppUserToken = Cookies.get("spp_user_token")
  if (sppUserToken) {
    return { Authorization: "Bearer " + sppUserToken }
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {}
  }
}
