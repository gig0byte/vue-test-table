<template>
  <v-app>
    <v-app-bar v-if="isLogined" max-height="60px">
      <v-toolbar-title
        >You`re logined as <b>{{ userName }} </b>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn tile @click="logout">
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLogined: "isLogined",
      userName: "userName",
    }),
  },

  methods: {
    ...mapActions({
      vuexLogout: "logout",
    }),

    logout: function () {
      this.vuexLogout().then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>


