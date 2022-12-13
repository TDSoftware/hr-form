import { xml, http } from "../../utils/http";

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
            openPositions: [],
            selectedPosition: ""
        };
    },
    created() {
        this.get();
    },
    methods: {
        async get() {
            this.error = "";
            try {
                 const response = await xml().get();      
                 console.log("open positions", response.data);          
                 const parser = new DOMParser();
                 const xmlDoc = parser.parseFromString(response.data, "application/xml");
                 const nameElements = xmlDoc.getElementsByTagName("name");
                 for (let i = 0; i < nameElements.length; i++) {
                    const element = nameElements[i];
                    if (element.parentNode.nodeName === "position") {
                        this.openPositions.push(element.innerHTML);
                    }
                }
            } catch(error) {
                const errorString: string = error.response?.data?.message || "Sending form failed";
                this.error = "Error: " + errorString;
            }
        },
        async send() {
            this.error = "";
            this.isLoading = true;
            try {
                await http().post("data", {
                    "first_name": this.firstName,
                    "last_name": this.lastName,
                    "email": this.email,
                    "job_position_id": 893585,
                    "message": this.selectedPosition + " " + this.interests,
                    "application_date": new Date().toISOString().split("T")[0]
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
