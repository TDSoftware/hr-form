import { http } from "../../utils/http";

export default {
    name: "Form",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            interests: "",
            error: "",
            isLoading: false,
            tags: []
        };
    },
    watch: {
        "$route.params"(to) {
            if (!to.id) this.getTags();
            else this.isValidTag();
        }
    },
    created() {
        if(!this.$route.params?.id) this.getTags();
        else this.isValidTag();
        // this.get();
    },
    methods: {
        async getTags() {
            this.error = "";
            try {
                const response = await http().get("candidate_tag?page_size=100");
                if(response) {
                    this.tags = response.data.data.filter(tag => tag["created_at"] >= "2021-10-25T12:53:19+02:00");
                }
            }catch(error) {
                const errorString: string = error.response?.data?.message || "Sending form failed";
                this.error = "Error: " + errorString;
            }
        },
        async isValidTag() {
            this.error = "";
            try {
                const response = await http().get("candidate_tag?page_size=100");
                if(!(response && response.data.data.find(tag => String(tag.id) === this.$route.params?.id))) {
                    await this.$router.push("/");
                }
            } catch(error) {
                const errorString: string = error.response?.data?.message || "Sending form failed";
                this.error = "Error: " + errorString;
            }
        },
        async get() {
            this.error = "";
            try {
                const response = await http().get("candidate?");
                console.log("candidate", response.data);
                const response2 = await http().get("application");
                console.log("job", response2.data);
            } catch(error) {
                const errorString: string = error.response?.data?.message || "Sending form failed";
                this.error = "Error: " + errorString;
            }
        },
        async send() {
            this.error = "";
            this.isLoading = true;
            try {
                await http().post("candidate", {
                    profile: {
                        firstname: this.firstName,
                        lastname: this.lastName
                    },
                    email: this.email,
                    "candidate_tag_ids": [this.$route.params?.id],
                    "motivational_letter": this.interests
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
            this.interests = "";
        }
    }
};
