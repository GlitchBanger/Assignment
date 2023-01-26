<template>
    <div class="parent">
        <div class="date">
            <p>{{ day }}{{ ordinal }}</p>
            <p>{{ month }},</p>
            <p>{{ year }}</p>
        </div>
        <div class="time">
            <p>{{ hours }}</p>
            <p>:</p>
            <p>{{ minutes }}</p>
            <p class="seconds">{{ seconds }}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return {
            year: new Date().getFullYear(),
            month: monthList[new Date().getMonth()],
            day: new Date().getDate(),
            ordinal: '',
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
            interval: undefined,
            monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },

    methods: {
        updateSeconds() {
            this.year = new Date().getFullYear()
            this.month = this.monthList[new Date().getMonth()]
            this.day = new Date().getDate()
            this.hours = `0${new Date().getHours()}`.slice(-2)
            this.minutes = `0${new Date().getMinutes()}`.slice(-2)
            this.seconds = `0${new Date().getSeconds()}`.slice(-2)

            let pos1 = this.day / 10
            if (pos1 === 1) {
                this.ordinal = 'th'
                return
            }

            let pos2 = this.day % 10
            if (pos2 === 1) {
                this.ordinal = 'st'
                return
            }
            if (pos2 === 2) {
                this.ordinal = 'nd'
                return
            }
            if (pos2 === 3) {
                this.ordinal = 'rd'
                return
            }

            this.ordinal = 'th'
            return
        }
    },

    computed: {
        hours00() {
            return `0${this.hours}`.slice(-2)
        },

        minutes00() {
            return `0${this.minutes}`.slice(-2)
        },

        seconds00() {
            return `0${this.seconds}`.slice(-2)
        }
    },

    created() {
        this.interval = setInterval(this.updateSeconds, 500)
    }
}
</script>
<style scoped>
.parent {
    font-size: 30px;
    display: flex;
    flex-direction: row;
    width: 50%;
    margin: auto;
    justify-content: space-around;
    border: 3px solid black;
}

.time,
.date {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    justify-content: center;
}

.date {
    border-right: 3px solid black;
}

p {
    margin: 10px;
}

.seconds {
    font-size: 20px !important;
}

@media screen and (max-width: 475px) {
    .parent {
        font-size: 20px;
        width: 90%;
    }
}
</style>