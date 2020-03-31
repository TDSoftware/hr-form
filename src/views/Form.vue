<template>
  <div class="tds-form">
    <img src="../assets/tds-banner.jpg">
    <form @submit.prevent="send">
      <label>First Name</label>
      <input v-model="firstName" />
      <label>Last Name</label>
      <input v-model="lastName" />
      <label>Email</label>
      <input v-model="email" />
      <input type="submit" value="Subscribe" />
    </form>

    <div v-if="error" class="error">{{ error }}</div>

<!--    <button @click="$toastr.render('MUH')">Button</button>-->

  </div>
</template>

<script>
import { http } from "../utils/http";

export default {
    name: "Form",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            error: ""
        };
    },
    methods: {
        async send() {
            try {
                await http().post("candidate", {
                    profile: {
                        firstName: this.firstName,
                        lastName: this.lastName
                    },
                    email: this.email
                });
                this.$toastr.render("Form send successfully");
            }catch(error) {
                const errorString: string = error.response?.data?.message || "Sending form failed";
                this.error = "Error: " + errorString;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .tds-form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto;

    img {
      width: 100%;
    }

    form {
      display: flex;
      flex-direction: column;

      label {
        text-align: left;
        margin-top: 1em;
      }
      input {
        height: 30px;
        border-radius: 5px;
        border: 2px solid #ddd;
      }
    }
  }

  .error {
    margin-top: 1em;
    background: #FFEEEE;
    border: 1px solid #DD0000;
    border-radius: 5px;
    padding: 12px 12px;
    margin-bottom: 16px;
  }
</style>
