<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" align="center">
        <img alt="Vue logo" src="../assets/logo.png" />
      </v-col>
    </v-row>
    
    <Login v-if="!userName && userName !== 'undefined'" />
    <Logined v-else :user="userName" />
  </v-container>
</template>

<script>
import Login from "@/components/Login.vue";
import Logined from "@/components/Logined.vue";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Login,
    Logined,
  },
  computed: {
    ...mapGetters({
      userName: "userName",
    }),
  },
};
</script>
