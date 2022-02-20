<template>
  <q-tr :props="incomingProps">
    <q-td key="title" :props="incomingProps">
      <a :href="editRealtyUrl">
        {{ currentListing.title || "No listing title" }}
      </a>
    </q-td>
    <q-td key="price" :props="incomingProps">
      {{ currentListing.formatted_display_price }}
    </q-td>
    <q-td key="deposit" :props="incomingProps">
      {{ toCurrency(downPaymentFigure) }}
    </q-td>
    <q-td key="principal" :props="incomingProps">
      {{ toCurrency(loanPrincipal) }}
    </q-td>
    <q-td key="principal" :props="incomingProps">
      {{ toCurrency(monthlyPayment) }}
    </q-td>
    <q-td key="totalInterest" :props="incomingProps">
      {{ toCurrency(totalInterest) }}
    </q-td>
    <q-td key="totalMortgageCost" :props="incomingProps">
      {{ toCurrency(totalMortgageCost) }}
    </q-td>
  </q-tr>
</template>
<script>
// import ListingRowCol from "components/home-hunt/ListingRowCol.vue"
export default {
  inject: ["boardEditProvider"],
  components: {
    // ListingRowCol,
  },
  computed: {
    // total interest payable = total cost - down payment - loan amount
    totalInterest: function () {
      return this.totalMortgageCost - this.downPaymentFigure - this.loanPrincipal
    },
    // total mortgage cost = months * monthly payment + down payment
    totalMortgageCost: function () {
      return this.paymentMonths * this.monthlyPayment + this.downPaymentFigure
    },
    downPaymentFigure() {
      // down payment = price * (upfront / 100)
      // debugger
      let downPaymentFigure =
        this.priceFull * (parseInt(this.downPaymentPercent) / 100)
      return downPaymentFigure
    },
    // monthly payment calc
    monthlyPayment: function () {
      var P = this.loanPrincipal
      var r = parseFloat(this.interestRate / 1200)
      var N = parseInt(this.paymentMonths)
      debugger
      return r == 0
        ? P / N
        : (P * (r * Math.pow(1 + r, N))) / (Math.pow(1 + r, N) - 1)
    },
    loanPrincipal() {
      return this.priceFull - this.downPaymentFigure
    },
    priceFull() {
      return this.currentListing.price_sale_current_cents / 100
    },
    overallRatingModel() {
      return this.incomingProps.row.item.rating_overall || 0
    },
    currentListing() {
      return this.incomingProps.row.listing
      // preview_url  count_bathrooms count_bedrooms
    },
    currentBoardItem() {
      return this.incomingProps.row.item || {}
    },
    editRealtyUrl() {
      let routeInputs = {
        name: "rSppEdit",
        params: {
          listing_slug: this.incomingProps.row.listing.listing_uuid,
          listings_grouping: "for-sale",
        },
      }
      let resolvedRouter = this.$router.resolve(routeInputs)
      let newUrl = resolvedRouter.href
      return newUrl
    },
    currencyPrefix() {
      let currencyPrefix = "£"
      if (this.incomingProps.row.listing.currency === "USD") {
        currencyPrefix = "$"
      }
      if (this.incomingProps.row.listing.currency === "EUR") {
        currencyPrefix = "€"
      }
      return currencyPrefix
    },
  },
  props: {
    downPaymentPercent: {
      type: Number,
      default: 0,
    },
    interestRate: {
      type: Number,
      default: 4,
    },
    paymentMonths: {
      type: Number,
      default: 360,
    },
    incomingProps: {
      type: Object,
      default: () => {
        title: ""
      },
    },
  },
  methods: {
    // format value to currency
    toCurrency(value, cents = 2) {
      // if invalid, return two en dashes
      if (isNaN(value) || !isFinite(value)) return "&ndash;&ndash;"

      // else make it pretty and return
      return (
        this.currencyPrefix +
        value.toFixed(cents).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      )
    },
  },
}
</script>
