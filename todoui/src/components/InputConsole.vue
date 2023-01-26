<template>
    <div class="parent">
        <div class="inputs">
            <p>I want to</p>
            <input type="text" v-model="text" />
            <p>by</p>
            <div class="date">
                <select v-model="date.year">
                    <option v-for="i in yearList" :value="i">{{ i }}</option>
                </select>
                <select v-model="date.month">
                    <option v-for="i in monthList" :value="i">{{ i }}</option>
                </select>
                <select v-model="date.day">
                    <option v-for="i in dayList" :value="i">{{ i }}</option>
                </select>
            </div>
        </div>
        <p v-if="error" class="error">{{ error_message }}</p>
        <Button text="Add Todo" :clickHandler="addTodo" />
    </div>
</template>
<script>

import Button from './Todo/TodoComponents/Button.vue'

export default {

    data() {
        let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let date = new Date()
        console.log(date.getTime())
        let day = date.getDate()
        let monthnum = date.getMonth()
        let month = monthList[date.getMonth()]
        let year = date.getFullYear()
        console.log(new Date(year, monthnum, day).getTime())
        return {
            date: {
                year,
                month,
                day
            },
            monthList,
            text: '',
            error: false,
            error_message: ''
        }
    },
    components: {
        Button
    },
    computed: {
        yearList() {
            return Array.from({ length: 50 }, (_, i) => i + 2023)
        },

        dayList() {
            let month = this.monthList.indexOf(this.date.month)
            let year = this.date.year
            return Array.from({ length: getDays(month, year) }, (_, i) => i + 1)
        }
    },
    methods: {
        addTodo() {
            if (this.text === '') {
                this.error = true
                this.error_message = "Todo shouldn't be empty"
                console.log("Todo shouldn't be empty")
                return
            }

            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            date = new Date(year, month, day)
            month = this.monthList[month]
            let cmpdate = new Date(this.date.year, this.monthList.indexOf(this.date.month), this.date.day)

            if (date.getTime() > cmpdate.getTime()) {
                this.error = true
                this.error_message = "Todo can't be done before today"
                this.date = { year, month, day }
                console.log("Todo can't be done before today")
                return
            }

            this.error = false
            this.error_message = ''

            this.$emit('create', {
                todo: this.text,
                date: this.date
            })

            this.text = ''
            this.date = { year, month, day }

            return
        }
    }
}

const getDays = (month, year) => {
    let days = new Date(year, month + 1, 0)
    return days.getDate()
}
</script>
<style scoped>
* {
    font-size: 26px;
}

.parent {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 300px;
    margin: auto;
    justify-content: space-around;
    align-items: center;
    border-bottom: 3px solid black;
}

.inputs {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

input {
    width: 40%;
    border: 3px solid black;
}

input:focus {
    outline: none;
}

.date {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

select {
    border: 2px solid black;
}

option {
    border: 2px solid black;
}

.error {
    color: red;
}

@media screen and (max-width: 475px) {

    * {
        font-size: 18px;
    }

    p {
        margin: 3px;
    }

    .inputs {
        flex-direction: column;
    }

    input {
        width: 90%;
    }

    .date {
        width: 90%;
    }

    select {
        width: 30%;
    }

}
</style>