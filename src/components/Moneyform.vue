<template>
  <form>
    <v-text-field v-model="newDate" required></v-text-field>
    <v-select
      v-model="newCategory"
      :items="getCategoryList"
      label="Category"
      required
    ></v-select>
    <v-text-field v-model="newValue" label="Value" required></v-text-field>
    <v-btn class="mr-15" color="#26A69A" v-on:click="add">ADD +</v-btn>
    <v-btn color="#DD2C00" v-on:click="moveback">Close</v-btn>
  </form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Moneyform",
  computed: {
    ...mapState(["values"]),
    getCategoryList() {
      return this.$store.getters.getCategoryList;
    },
    getList() {
      return this.$store.getters.getList;
    },
    getPageList() {
      return this.$store.getters.getPageList;
    },
    newId: {
      set(newId) {
        this.$store.commit("setValues", { newId });
      },
      get() {
        return this.values.newId;
      },
    },
    newDate: {
      set(newDate) {
        this.$store.commit("setValues", { newDate });
      },
      get() {
        return this.values.newDate;
      },
    },
    newCategory: {
      set(newCategory) {
        this.$store.commit("setValues", { newCategory });
      },
      get() {
        return this.values.newCategory;
      },
    },
    newValue: {
      set(newValue) {
        this.$store.commit("setValues", { newValue });
      },
      get() {
        return this.values.newValue;
      },
    },
  },
  methods: {
    moveback() {
      this.$store.state.showCharts = true;
      this.$router.push("/");
    },
    add() {
      this.$store.state.showCharts = true;
      if (this.newDate) {
        if (this.newCategory) {
          if (this.newValue) {
            this.addlist();
            if (this.getList.length % 5 === 0) {
              const newpage = this.getPageList.length + 1;
              this.$store.commit("addPageList", newpage);
              const pageNum = this.getPageList.length;
              this.$store.commit("setPage", pageNum);
            } else {
            }
          } else {
            alert("Укажите сумму платежа");
          }
        } else {
          alert("Укажите категорию платежа");
        }
      } else {
        alert("Укажите дату платежа");
      }
      this.$router.push("/");
    },

    addlist() {
      const data = {
        id: this.newId + 1,
        date: this.newDate,
        name: this.newCategory,
        value: this.newValue,
        isShown: false,
      };
      this.newId = this.newId + 1;
      this.$store.commit("addList", data);
    },
  },
};
</script>

<style lang="scss">
.moneyform {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  margin-right: 200px;
  margin-top: 30px;
}

.newcostinp {
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
}

.newcostoption {
  width: 258px;
  height: 34px;
  margin-bottom: 10px;
}

.addcost {
  width: 125px;
  height: 30px;
  border: none;
  background-color: #3cb371;
  color: #fff;
  cursor: pointer;
}

.closecost {
  width: 110px;
  height: 30px;
  border: none;
  background-color: #3cb371;
  color: #fff;
  cursor: pointer;
  margin-right: 41px;
}

.closecost:hover {
  background-color: #2e8b57;
}

.addcost:hover {
  background-color: #2e8b57;
}

.tobtn {
  display: flex;
  justify-content: space-between;
}
</style>
