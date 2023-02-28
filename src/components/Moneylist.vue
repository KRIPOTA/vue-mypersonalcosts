<template>
  <v-content>
    <v-row>
      <v-col class="col-8">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">#</th>
                <th class="text-center">Date</th>
                <th class="text-center">Category</th>
                <th class="text-center">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of getList" v-bind:key="item.index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
                <td>
                  <button
                    class="btncontmenu"
                    :id="item.id"
                    v-on:click="$modal.show(item)"
                  >
                    &#8801;
                  </button>
                </td>
                <div v-show="item.isShown">
                  <div class="begincontmenu">
                    <button class="btnredact" v-on:click="redact(item)">
                      Редактировать
                    </button>
                    <button class="btndelet" v-on:click="delet(item)">Удалить</button>
                  </div>
                  <div class="formredact" v-show="isShownredact">
                    <form>
                      <v-text-field v-model="redactDate" required></v-text-field>
                      <v-select
                        v-model="redactCategory"
                        :items="getCategoryList"
                        label="Category"
                        required
                      ></v-select>
                      <v-text-field
                        v-model="redactValue"
                        label="Value"
                        required
                      ></v-text-field>
                      <v-btn class="mr-15" color="#26A69A" v-on:click="btnredact(item)"
                        >redact</v-btn
                      >
                      <v-btn color="#DD2C00" v-on:click="closeredact()">Close</v-btn>
                    </form>
                  </div>
                </div>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-col class="d-flex justify-center">
          <v-btn v-on:click="prev" small>&#9668;</v-btn>
          <div class="itempagination" v-for="item of getPageList" v-bind:key="item.id">
            <v-btn v-on:click="page(item)" depressed text small>{{ item }}</v-btn>
          </div>
          <v-btn v-on:click="next" small>&#9658;</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Moneylist",
  computed: {
    getCategoryList() {
      return this.$store.getters.getCategoryList;
    },
    getList() {
      return this.$store.getters.getList;
    },
    getPageList() {
      return this.$store.getters.getPageList;
    },
    getPage() {
      return this.$store.getters.getPage;
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
  data() {
    return {
      isShownredact: false,
      redactId: "",
      redactDate: "",
      redactCategory: "",
      redactValue: "",
    };
  },

  methods: {
    onShown(item) {
      item.isShown = !item.isShown;
    },
    redact(item) {
      this.$store.state.showCharts = false;
      this.$router.push("/");
      this.isShownredact = !this.isShownredact;
      const category = item.name;
      const value = item.value;
      const d = item.date;
      const newid = this.getList.length;
      this.redactId = newid;
      this.redactDate = d;
      this.redactCategory = category;
      this.redactValue = value;
    },

    btnredact(item) {
      this.$store.state.showCharts = true;
      this.isShownredact = !this.isShownredact;
      item.date = this.redactDate;
      item.name = this.redactCategory;
      item.value = this.redactValue;
    },

    closeredact() {
      this.isShownredact = !this.isShownredact;
      this.$store.state.showCharts = true;
    },

    delet(item) {
      this.$store.state.list.splice(this.$store.state.list.indexOf(item), 1);
    },
    page(id) {
      console.log(id);
      const pageNum = id;
      this.$store.commit("setPage", pageNum);
    },
    prev() {
      if (this.getPage == 1) {
        const pageNum = this.getPage;
        this.$store.commit("setPage", pageNum);
      } else {
        const pageNum = this.getPage - 1;
        this.$store.commit("setPage", pageNum);
      }
    },
    next() {
      const last = this.getPageList[this.getPageList.length - 1];
      if (this.getPage == last) {
        const pageNum = this.getPage;
        this.$store.commit("setPage", pageNum);
      } else {
        const pageNum = this.getPage + 1;
        this.$store.commit("setPage", pageNum);
      }
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShown);
  },
};
</script>

<style lang="scss">
.item {
  width: 495px;
  height: 50px;
  display: flex;
  border-bottom: solid;
  align-items: center;
}

.list {
  margin-left: 100px;
}

.title {
  display: flex;
  justify-content: space-between;
  width: 495px;
  height: 50px;
  border-bottom: solid;
}

.date {
  width: 100px;
  margin-left: 107px;
  text-align: left;
}

.category {
  width: 100px;
  margin-left: 65px;
  text-align: left;
}

.value {
  width: 100px;
  padding-left: 90px;
  text-align: center;
}

.pagination {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 250px;
  justify-content: center;
}

.btncontmenu {
  border: none;
  background-color: white;
  cursor: pointer;
  font-size: 20px;
}

.begincontmenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-left: -20px;
  margin-top: 37px;
  width: 150px;
  height: 80px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.btnredact {
  margin-top: 10px;
  width: 150px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: white;
}

.btndelet {
  width: 150px;
  height: 30px;
  border: none;
  margin-top: 5px;
  cursor: pointer;
  background-color: white;
}

.btnredact:hover {
  background-color: grey;
}

.btndelet:hover {
  background-color: grey;
}

.formredact {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 258px;
  height: 350px;
  margin-left: 500px;
  margin-top: -107px;
  left: calc(53% - 125px);
}

.inpred {
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
}

.btnredend {
  width: 125px;
  height: 30px;
  border: none;
  background-color: #3cb371;
  align-self: center;
  color: #fff;
  cursor: pointer;
}

.btnredend:hover {
  background-color: #2e8b57;
}
</style>
