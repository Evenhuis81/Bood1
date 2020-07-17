<template>
  <div>
    <b-table :items="groceries" :fields="fields">
      <template v-slot:cell(subtotal)="data">€ {{ (data.item.amount * data.item.price).toFixed(2) }}</template>
      <template v-slot:cell(price)="data">€ {{ data.value.toFixed(2) }}</template>
      <template v-slot:cell(amount)="data">
        <input type="number" min="0" max="99" v-model="data.item.amount" />
        <b-button size="sm" @click="saveAmount(data.field)" squared variant="outline-secondary">Save</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          sortable: true
        },
        "description",
        {
          key: "price",
          sortable: true
        },
        "amount",
        {
          key: "subtotal",
          label: "Sub Total"
        }
      ],
      groceries: [],
      selected: [], // Must be an array reference!
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getGroceries"]),
    totalTotal() {
      let total = 0;
      this.groceries.map(grocery => {
        total += grocery.amount * grocery.price;
      });
      return total;
    }
  },
  methods: {
    saveAmount(value) {
      console.log(value);
    },
    deleteGrocery(id) {
      console.log(id);
      return;
      // set load thing
      this.$store
        .dispatch("deleteGrocery")
        .then(() => {
          console.log("succeed");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$store.dispatch("groceries").then(groceries => {
      this.groceries = groceries;
    });
  }
};
</script>
