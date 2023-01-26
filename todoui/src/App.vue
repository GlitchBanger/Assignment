<template>
  <TimeBoard />
  <InputConsole @create="createTodo" />
  <p v-if="error">Can't load data try to refresh</p>
  <TodoList v-else :todos="todos" @update="updateTodo" @delete="deleteTodo" />
  <!-- <Button bgimg :clickHandler="handleClick" />
  <CheckBox /> -->
</template>

<script>

import TodoList from './components/TodoList.vue'
import Button from './components/Todo/TodoComponents/Button.vue'
import CheckBox from './components/Todo/TodoComponents/CheckBox.vue'
import Todo from './components/Todo/Todo.vue'
import InputConsole from './components/InputConsole.vue'
import TimeBoard from './components/TimeBoard.vue'

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      idn: 0,
      error: false
    }
  },
  components: {
    TodoList,
    Button,
    CheckBox,
    Todo,
    InputConsole,
    TimeBoard
  },
  methods: {
    handleClick(_) {
      console.log('Clicked!')
    },

    async createTodo(input) {
      try {
        console.log(input)
        let date = `${input.date.day} ${input.date.month}, ${input.date.year}`
        let _ = await fetch(`http://localhost:3000/${date}/${input.todo}/`, { method: 'POST' })
        let id = `todo${this.idn++}`
        let todo = { todo: input.todo, date, id, checked: false }
        console.log(todo)
        this.todos.push(todo)
      } catch (e) {
        console.log(e)
      }
    },

    async updateTodo(todo) {
      try {
        let _ = await fetch(`http://localhost:3000/${todo.id}/`, { method: 'PUT' })
        let index = this.todos.indexOf(todo)
        todo.checked = !todo.checked
        this.todos[index] = todo
      } catch (e) {
        console.log(e)
      }
    },

    async deleteTodo(todo) {
      try {
        let _ = await fetch(`http://localhost:3000/${todo.id}/`, { method: 'DELETE' })
        let index = this.todos.indexOf(todo)
        this.todos.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted() {
    try {
      let response = await fetch('http://localhost:3000/')
      let todos = await response.json()
      this.todos = todos.todos
      this.idn = todos.n
    } catch (e) {
      this.error = true
      console.log(e)
    }
  }
}
</script>

<style>
#app {
  font-family: Ubuntu, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
