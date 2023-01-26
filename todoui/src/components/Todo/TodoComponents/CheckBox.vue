<template>
    <div @click="clickHandler" class="parent">
        <div :class="[checkClass, 'checkbox']">
        </div>
        <p>{{ checkStatus }}</p>
    </div>
</template>
<script>
export default {

    props: {
        check: Boolean,
        clickHandler: Function
    },

    computed: {
        checkClass() {
            if (this.check) {
                return 'checked'
            }

            return ''
        },

        checkStatus() {
            if (this.check) {
                return 'Completed'
            }

            return 'Pending'
        }
    },

}
</script>
<style scoped>
.checkbox {
    height: 20px;
    width: 20px;
    border: 2px solid black;
    margin: 10px;
}

.checked {
    background-image: url(../../../assets/correct.png);
    background-size: cover;
}

.parent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 25% !important;
}

p {
    cursor: default;
    font-weight: 900;
    color: green;
}

@media screen and (max-width: 475px) {
    .parent {
        flex-direction: column !important;
        align-items: center;
    }

    .checkbox {
        width: 15px;
        height: 15px;
        margin: 0;
    }

    p {
        margin: 0;
    }
}
</style>