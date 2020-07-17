<template>
  <b-container v-if="groceries.length" class="bv-example-row">
    <b-row class="justify-content-md-center">
      <h1>Boodschappenlijst:</h1>
    </b-row>
    <hr />
    <b-row class="justify-content-md-center">
      <b-card
        v-for="grocery in groceries"
        :key="grocery.id"
        no-body
        class="overflow-hidden"
        style="width: 1000px"
      >
        <b-row no-gutters>
          <b-col md="2" class="border-right">
            <b-card-img :src="grocery.image" style="width: 150px;" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="my-auto border-right">
            <b-card-body :title="grocery.name">
              <b-card-text>{{ grocery.description }}</b-card-text>
            </b-card-body>
          </b-col>
          <b-col md="1" class="ma-auto text-center border-right">
            <p>
              <b>Price:</b>
            </p>
            <p>€ {{ grocery.price.toFixed(2) }}</p>
          </b-col>
          <b-col md="1" class="my-auto border-right text-center">
            <p>
              <b>Amount:</b>
            </p>
            <b-form-input v-model="grocery.amount" type="number" min="0"></b-form-input>
          </b-col>
          <b-col md="1" class="my-auto text-center border-right">
            <p>
              <b>
                <b>Subtotal:</b>
              </b>
            </p>
            <p>€ {{ (grocery.amount * grocery.price).toFixed(2) }}</p>
          </b-col>

          <b-col md="1" class="my-auto text-center">
            <b-button
              @click="deleteGrocery(grocery.id)"
              v-b-tooltip.hover
              title="Delete Grocery from list"
            >X</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="auto">
        <b>Total Total: €</b>
        {{ totalTotal.toFixed(2) }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
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
