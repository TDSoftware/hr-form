<template>
    <transition name="fade" mode="out-in">
        <div v-if="show" class="tds-toast-wrapper faster-fade" :class="{hint: toast.hint}" @click="closeToast">
            <div class="tds-toast-container">
                <div class="tds-toast" :class="toast.type" @click.stop="toastClicked">
                    <div>
                        <div>{{ toast.text }}</div>
                        <div v-if="toast.hint" class="closeBtn" @click="closeToast"></div>
                    </div>
                    <button v-if="!toast.hint" class="btn btn-link mt-2" type="button" @click="closeToast">
                        Done
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Toast",
    data(): * {
        return {
            toast: {},
            show: false,
            autoHide: false,
            duration: 3000
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.show = true;
            if (this.autoHide) setTimeout(() => this.closeToast(), this.duration);
        });
    },
    methods: {
        closeToast() {
            this.show = false;
            setTimeout(() => {
                this.$emit("close");
            }, 300);
        },

        toastClicked() {
            this.$emit("clickedToast");
        }
    }
};
</script>

<style lang="scss" scoped>
   .tds-toast-wrapper {
        position: fixed;
        display: flex;
        top: 8vh;
        right: 12px;
        z-index: 999;

        &:not(.hint) {
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(white, 0.9);
        }


        &:hover {
            cursor: pointer;
        }

        .tds-toast-container {
            max-width: 474px;
            margin: auto;

            .tds-toast {
                font-family: Avenir, Helvetica, Arial, sans-serif;
                background-color: white;
                padding: 24px 24px 24px 72px;
                border-radius: 5px;
                border: solid 1px #ddd;
                box-shadow: 0 0 12px rgba(0, 0, 0, 0.09);
                background-image: url("../../assets/icons/check-circle-green.svg");
                background-position: 24px 24px;
                background-size: 32px;
                background-repeat: no-repeat;
                margin: 0 0 4px 0;


                &:hover {
                    cursor: initial;
                }

                > div {
                    display: flex;

                    > div:first-child {
                        flex: 1;
                    }
                }

                .btn.btn-link {
                    color: #FF0000;
                    padding: 0;

                    &:hover {
                        cursor: pointer;
                    }
                }

                .closeBtn {
                    background: transparent url("../../assets/icons/close-circle-grey71.svg") no-repeat center;
                    height: 24px;
                    width: 24px;
                    position: relative;
                    z-index: 99;
                    margin-left: 8px;

                    &:hover {
                        cursor: pointer;
                    }

                    float: right;
                }
            }
        }

        &.hint .tds-toast-container {
            width: 100%;
            height: auto;
            max-width: 250px;
            margin: 0;

            .tds-toast {
                padding: 12px 12px 12px 48px;
                background-size: 24px;
                background-position: 12px 14px;
                line-height: 24px;
            }
        }
    }
</style>
