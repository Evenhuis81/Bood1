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

      <template v-slot:cell(price)="data">€ {{ data.value.toFixed(2) }}</template>

      <template v-slot:cell(amount)="data">
        <input type="number" min="0" max="99" v-model="data.item.amount" />
      </template>

      <template v-slot:cell(subtotal)="data">€ {{ (data.item.amount * data.item.price).toFixed(2) }}</template>

      <template v-slot:cell(delete)="data">
        <div @mouseover="cellhover=true" @mouseleave="cellhover=false">
          <b-icon-trash
            @click="deleteRow(data.item.id)"
            :style="{ color: (cellhover && isHovered(data.item)) ? 'red' : '' }"
          ></b-icon-trash>
        </div>
      </template>

      <template v-slot:custom-foot>
        <b-tr>
          <b-td></b-td>
          <b-td>
            <p class="text-center">
              <b-button variant="warning" @click="setToZero()">Set amounts to 0</b-button>
              <b-button variant="danger" @click="clearChanges()" class="mx-5">Clear changes</b-button>
              <b-button variant="success" @click="saveTable()">Save table</b-button>
            </p>
          </b-td>
          <b-td style="color: green">
            <b>Total</b>
          </b-td>
          <b-td style="color: green">
            <b>€ {{ total.toFixed(2) }}</b>
          </b-td>
        </b-tr>
      </template>

    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      cellhover: false,
      hoveredRow: null,
      transProps: {
        name: "flip-list"
      },
      delete: [],
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
    ...mapActions(["persistTable"]),
    addRow() {
      //
    },
    deleteRow(id) {
      // remove row from table array and set id (id gets used in backend to delete from DB)
      let index = this.groceries.findIndex(grocery => grocery.id === id);
      this.groceries.splice(index, 1);
      this.delete.push(id);
      // subTotal refresh (why not reactive?)
      this.$refs.table.refresh();
    },
    setToZero() {
      this.groceries.map(grocery => (grocery.amount = "0"));
    },
    rowHovered(item) {
      this.hoveredRow = item;
      this.$refs.table.refresh();
    },
    isHovered(item) {
      return item == this.hoveredRow;
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    saveTable() {
      // check if input has changed (won't work if delete and add the exact same row)
      if (
        JSON.stringify(this.groceries) === JSON.stringify(this.getGroceries)
      ) {
        window.alert("You haven't changed anything!");
        return;
      }
      // check amount changes: 1st get only db rows (none newly added)
      let dbRows = this.groceries.filter(grocery => !grocery.new)
      // 2nd compare amounts from table with db (db = groceries from store)
      var amounts = []
      dbRows.forEach(row => {
        let index = this.getGroceries.findIndex(grocery => grocery.id === row.id)
        if (row.amount !== this.getGroceries[index].amount) {
          amounts.push({ id: row.id, amount: row.amount })
        }
      })
      // create payload (deletes and/or amounts)
      var payload = { amounts, deletes: this.delete }

      this.persistTable(payload)
    },
    clearChanges() {
      // copy groceries array from store to table array (=reset)
      this.groceries = this.getGroceries.map(a => ({ ...a }));
      // clear deleted rows
      this.delete = [];
    }
  },
  created() {
    // copy fields array to add alignment then copy over fields array
    const fieldsAdd = this.fields.map(b => ({ ...b, tdClass: "align-middle" }));
    this.fields = fieldsAdd;
    // copy groceries array from store to table array
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