<template>
  <q-layout view="lhh LpR ffr">
    <q-page
      class="login-page bg-light-green window-height window-width row justify-center items-center"
    >
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">
            SinglePropertyPage Builder
          </h5>
        </div>
        <div class="row">
          <form v-on:submit.prevent="onSubmit()">
            <q-card
              square
              class="flex-center text-center"
              style="width: 400px; padding: 50px"
            >
              <q-card-section class="text-center q-pa-none">
                <h5 class="text-grey-6">Please sign in</h5>
              </q-card-section>
              <q-card-section class="text-center q-pa-none">
                <p class="">
                  This is a demo site. You can sign in as spp@example.com with
                  the password spp123456.
                </p>
              </q-card-section>

              <q-separator />
              <div class="text-left">
                <q-input
                  id="email"
                  type="email"
                  v-model.trim="form.email"
                  label="Email"
                  required
                  autofocus
                />
                <q-input
                  id="password"
                  type="password"
                  v-model="form.password"
                  label="Password"
                  required
                /><br />
              </div>
              <q-card-actions>
                <q-btn type="submit" class="fit" color="primary">Login</q-btn>
              </q-card-actions>
              <!-- <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="light-green-7"
                size="lg"
                class="full-width"
                label="Login"
              />
            </q-card-actions> -->
              <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">
                  If you are the owner of this site, please create an account at
                  <a href="https://propertywebbuilder.com/">https://propertywebbuilder.com</a> for a private instance.
                </p>
              </q-card-section>
            </q-card>
          </form>
          <!-- <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="password"
              />
            </q-form>
          </q-card-section>
        </q-card> -->
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<style></style>
<script>
// https://raw.githubusercontent.com/neatpro/Quasar-JWT/master/src/pages/login.vue
import { useQuasar, Cookies } from "quasar"
export default {
  data() {
    // const schema = yup.object().shape({
    //   email: yup.string().required("email is required!"),
    //   password: yup.string().required("Password is required!"),
    // })

    return {
      loading: false,
      // message: "",
      // schema,
      // drawerState: true,
      rememberMe: true,
      form: {
        email: "",
        password: "",
      },
    }
  },
  setup() {
    // const { locale } = useI18n({ useScope: "global" })
    const $q = useQuasar()
    return { qNotify: $q.notify }
  },
  computed: {
    loggedIn() {
      let sppUser = null
      if (process.env.CLIENT) {
        // user = JSON.parse(localStorage.getItem("user"))
        sppUser = this.$q.cookies.get("spp_user")
      }
      if (sppUser) {
        return true
      } else {
        return false
      }
      // Jan 2022 - below does not work
      // return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "rHomePage" })
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      let userParams = this.form
      // https://www.bezkoder.com/vue-3-authentication-jwt/#Authentication_service
      this.$store.dispatch("auth/login", userParams).then(
        (user) => {
          if (user.accessToken) {
            // let sppUserString = JSON.stringify(user)
            // this.$q.cookies.set("spp_user", sppUserString)
            // Saving raw json or json string in a cookie as above
            // results in not being able to read it on quasar server
            // side so using simple string below
            this.$q.cookies.set("spp_user_token", user.accessToken)
            this.$router.push({ name: "rHomePage" })
          } else {
            this.qNotify({
              color: "negative",
              position: "top",
              message: "Sorry, unknown error",
              icon: "report_problem",
            })
          }
        },
        (error) => {
          this.loading = false
          let errorMessage = error.message || error.toString()
          if (error.response) {
            errorMessage =
              error.response.data.error ||
              (error.response &&
                error.response.data &&
                error.response.data.message)
          }
          this.qNotify({
            color: "negative",
            position: "top",
            message: errorMessage,
            icon: "report_problem",
          })
        }
      )
    },
  },
}
</script>
