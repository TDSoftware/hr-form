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
            isLoading: false
        };
    },
    created() {

        // this.get();
    },
    methods: {
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
