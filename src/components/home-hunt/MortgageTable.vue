<template>
  <div class="q-py-md q-ma-sm">
    <div class="row">
      <div class="col-xs-4">
        <div class="q-ma-md">
          <q-badge color="secondary">
            Down payment ({{ downPaymentPercent }}%)
          </q-badge>
          <q-slider
            v-model="downPaymentPercent"
            :min="0"
            :max="100"
            :step="10"
            color="green"
          />
        </div>
      </div>
      <div class="col-xs-4">
        <div class="q-ma-md">
          <div id="term" class="input-group">
            <q-select
              v-model="term"
              :options="terms"
              emit-value
              option-value="value"
              option-label="text"
              label="Loan Term"
            />
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <div class="q-ma-md">
          <q-input
            id="interest-rate"
            label="Interest Rate"
            type="text"
            v-model.lazy="interestRate"
            @keyup.enter="checkRate"
            @blur="checkRate"
          />
        </div>
      </div>
    </div>
  </div>
  <q-table
    title=""
    :columns="mortgageListingColumns"
    :rows="propertyBoardItems"
    row-key="name"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-italic text-purple"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <MortgageTableRow
        :downPaymentPercent="downPaymentPercent"
        :paymentMonths="paymentMonths"
        :interestRate="interestRate"
        :incomingProps="props"
      ></MortgageTableRow>
    </template>
  </q-table>
</template>
<script>
import MortgageTableRow from "components/home-hunt/MortgageTableRow.vue"
export default {
  components: {
    MortgageTableRow,
  },
  methods: {
    checkRate() {
      // remove non numeric chars (except decimal)
      var value = String(this.interestRate).replace(/[^0-9.]/g, "")
      // if value is empty or invalid, set to 0
      if (value == "" || isNaN(value)) value = "0"

      // if first char is decimal, add a leading zero
      if (value.charAt(0) == ".") value = "0" + value

      // update the value (max is 100)
      this.interestRate = value < 100 ? value : "100"
    },
  },
  data() {
    return {
      downPaymentPercent: 20,
      interestRate: 5,
      // paymentMonths: 360,
      term: 20,
      terms: [
        { text: "10 year fixed", value: 10 },
        { text: "15 year fixed", value: 15 },
        { text: "20 year fixed", value: 20 },
        { text: "25 year fixed", value: 25 },
        { text: "30 year fixed", value: 30 },
        { text: "35 year fixed", value: 35 },
      ],
    }
  },
  computed: {
    paymentMonths() {
      return this.term * 12
    },
    mortgageListingColumns() {
      let listingColumns = [
        {
          name: "title",
          align: "left",
          label: "Title",
          field: "title",
          sortable: true,
        },
        {
          name: "price",
          align: "left",
          label: "Price",
          field: "price",
          sortable: true,
        },
        {
          name: "deposit",
          align: "left",
          label: "Deposit",
          field: "Deposit",
          sortable: true,
        },
        {
          name: "principal",
          align: "left",
          label: "Principal",
          field: "Principal",
          sortable: true,
        },
        {
          name: "monthlyPayment",
          align: "left",
          label: "Monthly Payment",
          field: "monthlyPayment",
          sortable: true,
        },
        {
          name: "totalInterest",
          align: "left",
          label: "Total Interest",
          field: "totalInterest",
          sortable: true,
        },
        {
          name: "totalMortgageCost",
          align: "left",
          label: "Total Mortgage Cost",
          field: "totalMortgageCost",
          sortable: true,
        },
      ]
      return listingColumns
    },
  },
  props: {
    propertyBoardItems: {
      type: Array,
      default: () => [],
    },
    // listingColumns: {
    //   type: Array,
    //   default: () => [],
    // },
    isOverview: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
