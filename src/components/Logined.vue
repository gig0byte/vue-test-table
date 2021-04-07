<template>
    <v-row>
      <v-col cols="12"> You`re logined as <b> {{ user }} </b> </v-col>
      <v-col cols="12">
        <router-link to="/table">
            Go to table
        </router-link>
      </v-col>
    </v-row>

</template>

<script>
export default {
  props: {
    user: String,
  },
};
</script>