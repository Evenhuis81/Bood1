<template>
  <div>
    <b-table @row-hovered="rowHovered" ref="table" no-sort-reset id="table-transition" :items="groceries" :fields="fields" primary-key="id" :tbody-transition-props="transProps">
      <template v-slot:cell(delete)="data">
        <!-- <b-button size="sm">{{ data.field.text }}</b-button> -->
        <!-- <div v-b-hover="handleHover" class="border rounded py-3 px-4"> -->
          <div @mouseover="cellhover=true" @mouseleave="cellhover=false">
        <b-icon v-if="cellhover && isHovered(data.item)" icon="x" animation="throb" font-scale="2">{{ data.value }}</b-icon>
        <b-icon v-else icon="x">{{ data.item.id }}</b-icon>
          </div>
        <!-- </div> -->
      </template>
      <template v-slot:cell(subtotal)="data">€ {{ (data.item.amount * data.item.price).toFixed(2) }}</template>
      <template v-slot:cell(price)="data">€ {{ data.value.toFixed(2) }}</template>
      <template v-slot:cell(amount)="data">
        <input type="number" min="0" max="99" v-model="data.item.amount" />
      </template>
    </b-table>
        <p class="text-center">
          <b-button size="sm" @click="clearChanges()" class="mr-auto">Clear changes</b-button>
          <b-button size="sm" @click="saveTable">Save table</b-button>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      cellhover: false,
      hoveredRow: null,
      // isHovered: false,
      transProps: {
        name: 'flip-list'
      },
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
          label: "SubTotaal"
        },
        {
          key: "delete",
          label: "",
          text: "X",
          tdClass: "p-3"
        }
      ],
      groceries: [],
      amounts: []
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
    rowHovered(item){
      this.hoveredRow = item;
      this.$refs.table.refresh();
    },
    isHovered(item){
      return item == this.hoveredRow;
    },
    info(value) {
      console.log(value)
    },
    handleHover(hovered) {
      this.isHovered = hovered
    },
    saveTable() {
      console.log(this.groceries)
    },
    clearChanges() {
      this.groceries = this.getGroceries.map(a => ({...a}));
    }
  },
  created() {
    this.$store.dispatch("groceries").then(groceries => {
      this.groceries = groceries.map(a => ({...a}));
      // this.amounts = groceries.map(grocery => grocery.amount)
    });
  }
};
</script>

<style>
  table#table-transition .flip-list-move {
    transition: transform 1s;
  }
  .setWidth {
    width: 60px;
  }
</style>