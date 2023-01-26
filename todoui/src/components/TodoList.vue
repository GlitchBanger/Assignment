<template>
    <div class="parent">
        <div class="title">
            <h1 class="todotitle">Your todos</h1> <Button :text="showtext" :clickHandler="toggleShow" />
        </div>
        <Todo v-for="i in todolist" :date="i.date" :todo="i.todo" @buttonfn="deleteTodo" :id="i.id" :checked="i.checked"
            @checkfn="updateTodo" />
    </div>
</template>
<script>
import Todo from './Todo/Todo.vue'
import Button from './Todo/TodoComponents/Button.vue'

export default {
    components: {
        Todo,
        Button
    },

    data() {
        return {
            showall: true
        }
    },

    props: {
        todos: Array,
    },

    methods: {
        deleteTodo(id) {
            console.log(id)
            let todo = this.todos.filter(x => x.id === id)[0]
            console.log(todo)
            this.$emit('delete', todo)
        },

        updateTodo(id) {
            console.log(id)
            let todo = this.todos.filter(x => x.id === id)[0]
            console.log(todo)
            this.$emit('update', todo)
        },

        toggleShow() {
            this.showall = !this.showall
        }
    },

    computed: {
        todolist() {
            if (this.showall) {
                return this.todos
            }

            return this.todos.filter(t => !t.checked)
        },

        showtext() {
            if (this.showall) {
                return "Show Pending"
            }

            return "Show All"
        }
    }
}
</script>
<style scoped>
.parent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}

@media screen and (width: 475px) {
    .todotitle {
        font-size: 1rem !important;
    }
}
</style>