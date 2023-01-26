const express = require('express')
const cors = require('cors')
const { response } = require('express')
const app = express()
const port = 3000

app.use(cors())

const todos = [
    { date: '21 May, 2011', todo: 'Some task 1', id: 'todo1', checked: true },
    { date: '21 May, 2011', todo: 'Some task 2', id: 'todo2', checked: false },
    { date: '21 May, 2011', todo: 'Some task 3', id: 'todo3', checked: false }
]

let n = 4

app.get('/', (_, res) => {
    res.json({todos, n})
})

app.post('/:date/:todo/', (req, res) => {
    let date = req.params.date
    let todo = req.params.todo
    let id = `todo${n++}`
    let checked = false
    todos.push({date, todo, id, checked})
    res.send('success')
})

app.delete('/:id/', (req, res) => {
    let id = req.params.id
    let deltodo = todos.filter(x => x.id === id)[0]
    let index = todos.indexOf(deltodo)
    todos.splice(index, 1)
    res.send('success')
})

app.put('/:id/', (req, res) => {
    let id = req.params.id
    let updtodo = todos.filter(x => x.id === id)[0]
    let index = todos.indexOf(updtodo)
    updtodo.checked = !updtodo.checked
    todos[index] = updtodo
    res.send('success')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})