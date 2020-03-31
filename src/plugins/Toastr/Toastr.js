import Toast from "./Toast.vue";

type ToastModel = {
    text: string,
    type: string
};

export default {
    /**
     *  Used to install the plugin.
     *  @param {Vue} Vue
     */
    install(Vue: *) {
        const ComponentClass = Vue.extend(Toast);
        const renderedToasts: Array<ToastModel> = [];

        const Toasts = {

            render(text: string, autoHide?: number, hint?: boolean): Promise<void> {
                if (renderedToasts.find((t: ToastModel) => t.text === text)) return Promise.resolve();
                return this._renderToast(text, autoHide, hint);
            },

            _renderToast(text: string, autoHide?: number, hint?: boolean): Promise<void> {
                return new Promise((resolve: () => void) => {
                    const instance = new ComponentClass({
                        data: {
                            toast: {
                                text,
                                hint
                            },
                            autoHide: Boolean(autoHide),
                            duration: autoHide
                        }
                    });
                    document.body.appendChild(instance.$mount().$el);
                    renderedToasts.push({text});
                    instance.$on("close", () => {
                        document.body.removeChild(instance.$mount().$el);
                        instance.$destroy();
                        renderedToasts.splice(renderedToasts.findIndex((t: ToastModel) => t.text === text), 1);
                        resolve();
                    });
                });
            }
        };

        Vue.prototype.$toastr = Toasts;
        Vue.$toastr = Toasts;
    }
};
