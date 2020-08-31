<template>
  <CCard v-if="isLoaded">
    <CCardHeader>
      <font-awesome-icon icon="user" />&nbsp;User
    </CCardHeader>
    <CCardBody>
      <h4>Username:</h4>
      <p>{{ user.username }}</p>
      <h4>Email:</h4>
      <p>{{ user.email }}</p>
    </CCardBody>
  </CCard>
</template>

<script>
import axios from "axios";

const apiURL = "/api/user"

export default {
  name: "dashboard",
  data() {
    return {
      user: {},
      isLoaded: false
    };
  },
  created: function () {
      this.fetchData();
  },
  methods: {
    fetchData: function() {

      axios.get(apiURL).then((response) => {
        this.user = response.data.data
        this.isLoaded = true
      })
      .catch(error => {
        console.log(error)
        this.isLoaded = false
        // this.errored = true
      })
    }
  }
};
</script>
