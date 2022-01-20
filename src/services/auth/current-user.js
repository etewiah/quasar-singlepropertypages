import { Cookies } from "quasar"
export default function currentUser() {
  // let user = JSON.parse(LocalStorage.getItem("user"))
  const sppUser = Cookies.get("spp_user")
  return sppUser
}
