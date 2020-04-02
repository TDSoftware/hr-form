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
      <button type="submit" :class="{loading: isLoading}">Subscribe</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>
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
            error: "",
            isLoading: false
        };
    },
    methods: {
        async send() {
            this.error = "";
            this.isLoading = true;
            try {
                await http().post("candidate", {
                    profile: {
                        firstname: this.firstName,
                        lastname: this.lastName
                    },
                    email: this.email
                });
                this.$toastr.render("Form send successfully");
                this.clearForm();
            }catch(error) {
                const errorString: string = error.response?.data?.message || "Sending form failed";
                this.error = "Error: " + errorString;
            }finally {
                this.isLoading = false;
            }
        },
        clearForm() {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
        }
    }
};
</script>

<style lang="scss" scoped>
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .tds-form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 4em auto 0 auto;

    img {
      width: 100%;
      margin-bottom: 1em;
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
        padding: 0 10px;
        font-size: 16px;

        &:focus {
          outline-color: #eb5826;
        }
      }

      button {
        @extend input;
        height: 40px;
        background-color: #eb5826;
        border: none;
        color: white;
        font-weight: bold;
        margin-top: 2em;
        position: relative;

        &:focus {
          outline: none;
        }

        &.loading::after {
          content: "X";
          height: 15px;
          width: 15px;
          border: solid transparent 2px;
          border-bottom-color: white;
          border-top-color: white;
          border-right-color: white;
          border-radius: 50%;
          font-size: 0;
          vertical-align: text-top;
          display: block;
          animation-name: rotate;
          animation-duration: 1s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          position: absolute;
          right: 10px;
          top: 10px;
        }
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
