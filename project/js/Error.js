export const Error = {
    data(){
        return{
            title: ''
        }
    },
    methods: {
        viewError(error){
            this.title = error;
        }
    },
    template: `<div>
                    <slot>{{ title }}</slot>
                </div>
    `
};