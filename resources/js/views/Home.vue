<template>
  <div>
    <b-table
      @row-hovered="rowHovered"
      ref="table"
      no-sort-reset
      id="table-transition"
      :items="groceries"
      :fields="fields"
      primary-key="id"
      :tbody-transition-props="transProps"
    >
      <template v-slot:cell(delete)="data">
        <div @mouseover="cellhover=true" @mouseleave="cellhover=false">
          <b-icon
            @click="deleteRow(data.item.id)"
            :style="{ color: (cellhover && isHovered(data.item)) ? 'red' : '' }"
            icon="trash"
            font-scale="1.5"
          ></b-icon>
        </div>
      </template>
      <template v-slot:cell(subtotal)="data">€ {{ (data.item.amount * data.item.price).toFixed(2) }}</template>
      <template v-slot:cell(price)="data">€ {{ data.value.toFixed(2) }}</template>
      <template v-slot:cell(amount)="data">
        <input type="number" min="0" max="99" v-model="data.item.amount" />
      </template>
      <template v-slot:custom-foot="data">
        <b-tr>
          <b-td :colspan="data.columns / 2"></b-td>
          <b-td style="color: green">
            <b>Total</b>
          </b-td>
          <b-td style="color: green">
            <b>€ {{ total.toFixed(2) }}</b>
          </b-td>
        </b-tr>
      </template>
    </b-table>
    <p class="text-center">
      <b-button variant="warning" @click="setToZero()">Set all to 0</b-button>
      <b-button variant="danger" @click="clearChanges()" class="mx-5">Clear changes</b-button>
      <b-button variant="success" @click="saveTable()">Save table</b-button>
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
      transProps: {
        name: "flip-list"
      },
      changes: {
        delete: []
      },
      fields: [
        {
          key: "name",
          sortable: true,
          footTxt: "Total"
        },
        {
          key: "description"
        },
        {
          key: "price",
          sortable: true
        },
        {
          key: "amount"
        },
        {
          key: "subtotal",
          label: "SubTotal"
        },
        {
          key: "delete"
        }
      ],
      groceries: [],
      amounts: []
    };
  },
  computed: {
    ...mapGetters(["getGroceries"]),
    total() {
      let total = 0;
      this.groceries.map(grocery => {
        total += grocery.amount * grocery.price;
      });
      return total;
    }
  },
  methods: {
    deleteRow(id) {
      let index = this.groceries.findIndex(grocery => grocery.id === id);
      this.groceries.splice(index, 1);
      this.changes.delete.push(id);
    },
    setToZero() {
      this.groceries.map(grocery => (grocery.amount = 0));
    },
    rowHovered(item) {
      this.hoveredRow = item;
      this.$refs.table.refresh();
    },
    isHovered(item) {
      return item == this.hoveredRow;
    },
    info(value) {
      console.log(value);
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    saveTable() {
      // check if input has changed
      if (
        JSON.stringify(this.groceries) === JSON.stringify(this.getGroceries)
      ) {
        window.alert("You haven't changed anything!");
        return;
      }
      console.log(this.groceries);
    },
    clearChanges() {
      this.groceries = this.getGroceries.map(a => ({ ...a }));
      this.changes.delete = [];
    }
  },
  created() {
    const fieldsAdd = this.fields.map(b => ({ ...b, tdClass: "align-middle" }));
    this.fields = fieldsAdd;
    this.$store.dispatch("groceries").then(groceries => {
      this.groceries = groceries.map(a => ({ ...a }));
    });
  }
};
</script>

<style>
table#table-transition .flip-list-move {
  transition: transform 1s;
}
</style>