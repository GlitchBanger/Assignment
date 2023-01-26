<template>
    <div class="parent1">
        <div class="todo">
            <div class="date">{{ date }}</div>
            <div class="text">{{ todo }}</div>
            <CheckBox :check="checked" :clickHandler="checkfn" />
        </div>
        <Button bgimg :clickHandler="buttonfn" />
    </div>
</template>
<script>

import Button from './TodoComponents/Button.vue'
import CheckBox from './TodoComponents/CheckBox.vue'

export default {

    components: {
        Button,
        CheckBox
    },

    props: {
        checked: Boolean,
        date: String,
        todo: String,
        id: String
    },

    methods: {
        buttonfn() {
            console.log(this.id)
            this.$emit('buttonfn', this.id)
        },

        checkfn() {
            console.log(this.id)
            this.$emit('checkfn', this.id)
        }
    }

}
</script>
<style scoped>
.todo {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 3px solid black;
    margin: 10px;
}

.parent1 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
}

.date,
.text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 51px;
    border-right: 3px solid black;
}

.text {
    width: 50%;
}

.date {
    width: 25%;
}

@media screen and (max-width: 475px) {
    .parent1 {
        flex-direction: column;
        align-items: flex-end;
    }

    .todo {
        width: 93%;
    }
}
</style>