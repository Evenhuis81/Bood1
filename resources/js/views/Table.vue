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
<<<<<<< HEAD
      <template v-slot:cell(price)="data">{{ data.value ? "€ " + data.value.toFixed(2) : "Free" }}</template>
=======
      <!-- TypeError: data.value.toFixed is not a function -->
      <template v-slot:cell(price)="data">€ {{ data.value.toFixed(2) }}</template> 
>>>>>>> 49eaaefb03fb5743b3e84aa128e8c03327c1b9dc

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
              <b-button variant="outline-primary" v-b-modal.modal-prevent-closing>Add grocery</b-button>
              <b-button variant="warning" @click="setToZero()" class="ml-5">Set amounts to 0</b-button>
              <b-button variant="danger" @click="clearChanges()" class="mx-5">Clear changes</b-button>
              <b-button variant="success" @click="saveTable()">Save table</b-button>
              <b-modal id="modal">Hello From My Modal!</b-modal>
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
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add grocery to table"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :busy="loading"
    >
      <form ref="form" @submit.stop.prevent="addRow">
        <b-form-group id="input-group-1" label="Product Name:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.name" placeholder="Enter name" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Description:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.description"
            placeholder="Enter description"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Price:" label-for="input-3">
          <b-form-input type="number" step="0.01" id="input-3" v-model="form.price" required></b-form-input>
        </b-form-group>
        <b-form-text id="input-3-help">format: 1.23</b-form-text>

        <b-form-group id="input-group-4" label="Amount:" label-for="input-4">
          <b-form-input type="number" id="input-4" v-model="form.amount" placeholder="0" required></b-form-input>
          <b-form-text id="input-4-help">max: 99</b-form-text>
        </b-form-group>
      </form>
      <p class="text-right">
        <b-spinner v-if="loading"></b-spinner>
      </p>
    </b-modal>
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
      form: {
        name: "",
        description: "",
        price: 0.0,
        amount: 0
      },
      loading: false,
      delete: [],
      fields: [],
      groceries: []
    };
  },
  computed: {
    ...mapGetters(["getGroceries", "getFields"]),
    total() {
      let total = 0;
      this.groceries.map(grocery => {
        total += grocery.amount * grocery.price;
      });
      return total;
    }
  },
  methods: {
    ...mapActions(["persistTable", "persistRow"]),
    log(data) {
      console.log(data);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    resetModal() {
      this.form.name = "";
      this.form.description = "";
      this.form.price = 0;
      this.form.amount = 0;
      this.loading = false;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.addRow();
    },
    addRow() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.loading = true;
      this.persistRow(this.form)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      // .finally(() => {
      //   console.log("finally");
      //   this.loading = false;
      // });

      // this.$nextTick(() => {
      //   this.$bvModal.hide("modal-prevent-closing");
      // });
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
      let dbRows = this.groceries.filter(grocery => !grocery.new);
      // 2nd compare amounts from table with db (db = groceries from store)
      var amounts = [];
      dbRows.forEach(row => {
        let index = this.getGroceries.findIndex(
          grocery => grocery.id === row.id
        );
        if (row.amount !== this.getGroceries[index].amount) {
          amounts.push({ id: row.id, amount: row.amount });
        }
      });
      // create payload (deletes and/or amounts)
      var payload = { amounts, deletes: this.delete };

      this.persistTable(payload);
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
    const fieldsAdd = this.getFields.map(b => ({
      ...b,
      tdClass: "align-middle"
    }));
    this.fields = fieldsAdd;
    // copy groceries array from store to table array
    this.$store.dispatch("groceries").then(groceries => {
      this.groceries = groceries.map(a => ({ ...a }));
    });
    // error handling wanted / needed ?
  }
};
</script>

<style>
table#table-transition .flip-list-move {
  transition: transform 1s;
}
</style>