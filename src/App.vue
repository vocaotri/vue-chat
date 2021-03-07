<template>
  <v-app>
    <Header />
    <RightSideBar ref="rightSideBar" />
    <router-view></router-view>
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
