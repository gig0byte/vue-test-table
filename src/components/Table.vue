<template>
  <v-card>
    <v-data-table
      v-model="selected"
      show-select
      item-key="number"
      :headers="headers"
      :items="items"
    >
      <template v-slot:item.date_int="{ item }">
        <span>{{ new Date(item.date_int).toLocaleString() }}</span>
      </template>

      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog> </template
    ></v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-card-actions v-if="selected.length">
      <v-dialog v-model="statusDialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Change status of selected items
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline"
              >Change status of {{ selected.length }}
              {{ selected.length === 1 ? "row" : "rows" }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="selectedStatus"
                    :items="statuses"
                    label="Select new status"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogClose">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              :disabled="!selectionCheck"
              text
              @click="dialogSave"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      search: "",
      selected: [],
      selectedStatus: null,
      statusDialog: false,
      statuses: ["Success", "Warning", "Error"],
      headers: [
        {
          text: "Number",
          align: "start",
          filterable: false,
          value: "number",
        },
        { text: "Name", value: "name" },
        { text: "Date", value: "date_int" },
        { text: "Status", value: "status" },
      ],
      items: [],
    };
  },

  computed: {
    selectionCheck() {
      let statusSelected = !!this.selectedStatus,
        selectedStatusesCheck = false,
        statusesOfSelected = [];

      this.selected.map((oSelected) => {
        statusesOfSelected.push(oSelected.status);
      });

      statusesOfSelected = new Set(statusesOfSelected);

      if (statusesOfSelected.size === 1) {
        selectedStatusesCheck = this.selected[0].status !== this.selectedStatus;
        
      } else {
        selectedStatusesCheck = true;
      }

      return statusSelected && selectedStatusesCheck;
    },
  },
  methods: {
    createRandomWord: (iLength) => {
      let aConsonants = "bcdfghjlmnpqrstv".split(""),
        aVowels = "aeiou".split(""),
        rand = function (limit) {
          return Math.floor(Math.random() * limit);
        },
        word = "";

      for (var i = 0; i < iLength / 2; i++) {
        let sRandConsonant = aConsonants[rand(aConsonants.length)],
          sRandVowel = aVowels[rand(aVowels.length)];

        word += i === 0 ? sRandConsonant.toUpperCase() : sRandConsonant;
        word += i * 2 < iLength - 1 ? sRandVowel : "";
      }

      return word;
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    // selectNewStatus(status) {
    //   this.selectedStatus = status;
    // },
    dialogClose() {
      this.selectedStatus = null;
      this.statusDialog = false;
    },
    dialogSave() {
      this.selected.map((oItem) => {
        oItem.status = this.selectedStatus;
      });

      this.dialogClose();
    },
  },
  // генерируем данные для таблицы перед Mount компонента
  beforeMount() {
    let aStatuses = this.statuses,
      iMin = 10,
      iMax = 100,
      iRowsCount = Math.floor(Math.random() * (iMax - iMin + 1) + iMin),
      aRows = [];

    for (var i = 0; i < iRowsCount; i++) {
      let iDate = +new Date() - Math.floor(Math.random() * 10000000000),
        oRow = {
          number: i,
          name: this.createRandomWord(Math.floor(Math.random() * 10) + 2),
          date: new Date(iDate),
          date_int: iDate,
          status: aStatuses[Math.floor(Math.random() * aStatuses.length)],
        };

      aRows.push(oRow);
    }

    this.items = aRows;
  },
};
</script>