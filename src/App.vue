<template>
  <v-app>
    <h1 class="personalcost">My personal costs</h1>
    <div class="btnsize">
      <v-btn depressed elevation="4" large color="#26A69A" v-on:click="addnewlink"
        >ADD NEW COST +</v-btn
      >
    </div>
    <div class="costlist">
      <Moneylist></Moneylist>
      <div class="charts" v-if="this.$store.state.showCharts">
        <Moneycharts></Moneycharts>
      </div>
      <div class="newpay">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import Moneylist from "./components/Moneylist.vue";
import Moneyform from "./components/Moneyform.vue";
import Moneycharts from "./components/Chars.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["values"]),
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
  components: {
    Moneylist,
    Moneyform,
    Moneycharts,
  },
  data() {
    return {
      ChartisShown: this.$store.state.showCharts,
    };
  },

  mounted() {
    const category = this.$route.params.category;
    const value = this.$route.params.value;
    function format(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      return (d <= 9 ? "0" + d : d) + "." + (m <= 9 ? "0" + m : m) + "." + y;
    }
    var today = new Date();
    var d = format(today);
    this.newDate = d;
    this.newCategory = category;
    this.newValue = value;
  },

  methods: {
    newlink() {
      const category = this.$route.params.category;
      const value = this.$route.params.value;
      function format(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return (d <= 9 ? "0" + d : d) + "." + (m <= 9 ? "0" + m : m) + "." + y;
      }
      var today = new Date();
      var d = format(today);
      this.newDate = d;
      this.newCategory = category;
      this.newValue = value;
    },
    addnewlink() {
      this.$store.state.showCharts = false;
      this.$router.push("/moneyform");
      this.newlink();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 20px;
  margin-top: 20px;
}

.btnsize {
  width: 100px;
  height: 50px;
  margin-top: 20px;
}

.costlist {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.listtitle {
  display: flex;
  flex-direction: column;
  width: 490px;
  margin-left: 100px;
}

.newcost {
  width: 135px;
  height: 40px;
  border: none;
  background-color: #3cb371;
  color: #fff;
  cursor: pointer;
}

.newcost:hover {
  background-color: #2e8b57;
}

.personalcost {
  text-align: left;
}

.newpay {
  display: flex;
  flex-direction: column;
  margin-right: 150px;
}

.addlink {
  width: 200px;
}

.charts {
  width: 500px;
  height: 100px;
}
</style>
