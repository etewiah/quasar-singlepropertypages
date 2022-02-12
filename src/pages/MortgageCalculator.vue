<template>
  <q-page class="container">
    <div class="col-xs-12">
      <h4
        class="font-medium text-center title-font text-gray-900 q-mb-sm pt-10"
      >
        Mortgage Calculator
      </h4>
    </div>
    <div class="col-xs-12">
      <q-card class="q-my-xl text-black">
        <q-card-section class="q-gutter-md">
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <!-- inputs -->
              <div id="inputs" :class="{ visible: visible }" v-cloak>
                <div class="q-pt-lg">
                  <q-input
                    id="home-price"
                    v-model="price"
                    label="Home Price"
                    required
                    autofocus
                    @keyup="checkPrice"
                    @blur="onBlurPrice"
                  />
                </div>
                <!-- <div id="price" class="input-group">
                  <label for="price">Home price</label>
                  <input
                    type="text"
                    v-model="price"
                    @keyup="checkPrice"
                    @blur="onBlurPrice"
                  />
                </div> -->
                <div class="q-pt-lg">
                  <q-badge color="secondary">
                    Down payment ({{ upfront }}%)
                  </q-badge>

                  <q-slider
                    v-model="upfront"
                    :min="0"
                    :max="100"
                    :step="10"
                    color="green"
                  />
                </div>
                <!-- <div id="upfront" class="input-group">
                  <label for="upfront">Down payment ({{ upfront }}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    v-model="upfront"
                  />
                </div> -->
                <div class="q-pt-md">
                  <q-input
                    id="interest-rate"
                    label="Interest Rate"
                    type="text"
                    v-model.lazy="rate"
                    @keyup.enter="checkRate"
                    @blur="checkRate"
                  />
                </div>
                <!-- <div id="rate" class="input-group">
                  <label for="rate">Interest rate</label>
                  <div>
                    <input
                      type="text"
                      v-model.lazy="rate"
                      @keyup.enter="checkRate"
                      @blur="checkRate"
                    />
                  </div>
                </div> -->
                <div class="q-pt-md">
                  <div id="term" class="input-group">
                    <q-select
                      v-model="term"
                      :options="terms"
                      emit-value
                      option-value="value"
                      option-label="text"
                      label="Loan Term"
                    />
                    <!-- <label for="term">Loan term</label>
                  <div>
                    <select v-model="term">
                      <option
                        v-for="(term, i) in terms"
                        :key="i"
                        :value="term.value"
                      >
                        {{ term.text }}
                      </option>
                    </select>
                  </div> -->
                  </div>
                </div>
                <div id="save" class="input-group q-pt-lg">
                  <q-btn @click="saveSettings">{{ button }}</q-btn>
                </div>
              </div>
              <!-- #inputs -->
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="q-px-lg q-mx-lg" style="">
                <div id="calculator">
                  <!-- results -->
                  <div id="results" :class="{ visible: visible }" v-cloak>
                    <q-list>
                      <q-item>
                        <q-item-section>
                          <h5 class="q-mt-md q-mb-sm">Monthly payment*</h5>
                          <div
                            class="text-h4"
                            v-html="toCurrency(payment)"
                          ></div>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <h6 class="q-mt-md q-mb-sm">Total payments</h6>
                          <div class="text-h5 q-pl-lg">
                            <div v-if="priceInt">
                              {{ months }} monthly payments
                            </div>
                            <div v-else>&ndash;&ndash;</div>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <h6 class="q-mt-md q-mb-sm">
                            Down payment ({{ upfront }}%)
                          </h6>
                          <div class="text-h5 q-pl-lg">
                            <div v-html="toCurrency(down, 0)"></div>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <h6 class="q-mt-md q-mb-sm">Principal</h6>
                          <div class="text-h5 q-pl-lg">
                            <div v-html="toCurrency(loan, 0)"></div>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <h6 class="q-mt-md q-mb-sm">Total interest paid</h6>
                          <div class="text-h5 q-pl-lg">
                            <div v-html="toCurrency(interest, 0)"></div>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <h6 class="q-mt-md q-mb-sm">Total mortgage cost*</h6>
                          <div class="text-h5 q-pl-lg">
                            <div v-html="toCurrency(total, 0)"></div>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <div>*Estimated, not including taxes and insurance.</div>
                    <div id="chart">
                      <div>
                        <!-- <pie-chart :data="chartData" :animate="animate"></pie-chart> -->
                      </div>
                    </div>
                  </div>
                  <!-- #results -->
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
// import HtmlSppCreator from "src/components/HtmlSppCreator.vue"
export default defineComponent({
  name: "MortgageCalculator",
  components: {
    // HtmlSppCreator,
  },

  // calculations
  computed: {
    // price as int (remove currency formatting)
    priceInt: function () {
      var price = parseFloat(String(this.price).replace(/[^0-9.]/g, ""))
      return isNaN(price) ? 0 : price
    },

    // down payment = price * (upfront / 100)
    down: function () {
      return this.priceInt * (parseInt(this.upfront) / 100)
    },

    // loan amount = price - down payment
    loan: function () {
      return this.priceInt - this.down
    },

    // months = term * 12
    months: function () {
      return this.term * 12
    },

    // monthly payment calc
    payment: function () {
      var P = this.loan
      var r = parseFloat(this.rate / 1200)
      var N = parseInt(this.months)
      return r == 0
        ? P / N
        : (P * (r * Math.pow(1 + r, N))) / (Math.pow(1 + r, N) - 1)
    },

    // total mortgage cost = months * monthly payment + down payment
    total: function () {
      return this.months * this.payment + this.down
    },

    // total interest payable = total cost - down payment - loan amount
    interest: function () {
      return this.total - this.down - this.loan
    },

    // define chart data
    chartData: function () {
      // if price is zero
      if (this.priceInt == 0) {
        var data = [100, 0, 0]
        var colors = "#f0f0f0"
      }

      // else if price > zero
      else {
        var data = [this.down, this.loan, this.interest]
        var colors = ["#29b6f6", "#b3e5fc", "#01579b"]
      }

      // return chart data
      return {
        labels: ["Down payment", "Principal", "Interest"],
        datasets: [
          {
            backgroundColor: colors,
            borderColor: "#fff",
            borderWidth: 4,
            hoverBackgroundColor: colors,
            hoverBorderColor: "#fff",
            hoverBorderWidth: 4,
            data: data,
          },
        ],
      }
    },
  },
  data() {
    return {
      price: "$300,000",
      upfront: 20,
      rate: 4.5,
      term: 30,
      terms: [
        { text: "15 year fixed", value: 15 },
        { text: "20 year fixed", value: 20 },
        { text: "30 year fixed", value: 30 },
      ],
      visible: false,
      animate: false,
      button: "Save Settings",
    }
  },

  // methods
  methods: {
    // format value to currency
    toCurrency(value, cents = 2) {
      // if invalid, return two en dashes
      if (isNaN(value) || !isFinite(value)) return "&ndash;&ndash;"

      // else make it pretty and return
      return (
        "$" + value.toFixed(cents).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      )
    },

    // validate the rate
    checkRate() {
      // remove non numeric chars (except decimal)
      var value = String(this.rate).replace(/[^0-9.]/g, "")

      // if value is empty or invalid, set to 0
      if (value == "" || isNaN(value)) value = "0"

      // if first char is decimal, add a leading zero
      if (value.charAt(0) == ".") value = "0" + value

      // update the value (max is 100)
      this.rate = value < 100 ? value : "100"
    },

    // validate the price
    checkPrice() {
      // remove leading zeros and non numeric chars (except decimal)
      var value = String(this.price)
        .replace(/[^0-9.]/g, "")
        .replace(/^0+/, "")

      // limit to no more than 2 decimal places
      if (value.includes(".")) {
        if (value.split(".")[1].length > 2) value = value.slice(0, -1)
      }

      // if the value is invalid, just display dollar sign and return
      if (value == "" || isNaN(value)) {
        this.price = "$"
        return
      }

      // else make it pretty
      this.price = "$" + String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    },

    // check price when the field loses focus
    onBlurPrice() {
      // if value is less than two chars, set it to '$0'
      if (this.price.length < 2) this.price = "$0"
    },

    // reveal the app when ready
    reveal() {
      // if the app is already visible, return
      if (this.visible) return

      // set to visible
      this.visible = true

      // trigger chart animation
      this.animate = true

      // reset animation back to false so it doesn't fire again
      var that = this
      setTimeout(function () {
        that.animate = false
      }, 1000)
    },

    // save user settings
    saveSettings() {
      // TODO
      // var data = {
      //   amount: this.priceInt,
      //   rate: this.rate / 100,
      //   amortization_period_years: this.term,
      //   down_payment_percent: this.upfront,
      // }
    },
  },
})
</script>
