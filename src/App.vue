<template>
  <v-app>
    <Header />
    <RightSideBar ref="rightSideBar" />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/partial/Header";
import RightSideBar from "@/components/partial/RightSideBar";

export default {
  name: "App",

  components: {
    Header,
    RightSideBar,
  },

  data: () => ({
    //
  }),
  created() {
    this.$root.$on("show-side-bar", (res) => {
      this.$refs.rightSideBar.setDrawer(res);
    });
  },
};
</script>
