<template>
  <div>
    <b-table id="table-transition" :items="groceries" :fields="fields" primary-key="id" :tbody-transition-props="transProps">
      <template v-slot:cell(subtotal)="data">€ {{ (data.item.amount * data.item.price).toFixed(2) }}</template>
      <template v-slot:cell(price)="data">€ {{ data.value.toFixed(2) }}</template>
      <template v-slot:cell(amount)="data">
        <input type="number" min="0" max="99" v-model="data.item.amount" />
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      transProps: {
        name: 'flip-list'
      },
      fields: [
        "id",
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
          label: "SubTotaal"
        }
      ],
      groceries: [],
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