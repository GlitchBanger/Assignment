<template>
    <div :style="setBg" @click="clickHandler">
        <p>{{ text }}</p>
    </div>
</template>
<script>
export default {

    data() {
        return {
            width: "46px",
            multiplier: 20
        }
    },

    props: {
        text: String,
        bgimg: Boolean,
        clickHandler: Function
    },

    computed: {
        setBg() {
            if (this.bgimg) {
                return {
                    backgroundImage: `url(${require('@/assets/trash.png')})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: this.width
                }
            }
            return {
                "width": `${this.text.length * this.multiplier - 4}px`
            }
        }
    },

    created() {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 475) {
                this.width = "30px"
                this.multiplier = 15
                return
            }

            if (window.innerWidth > 475) {
                this.width = "46px"
                this.multiplier = 20
                return
            }
        });
    }

}
</script>
<style scoped>
div {
    /* background-image: url(../../../assets/logo.png); Remove this!
        background-size: cover; */
    border: 2px solid black;
    border-radius: 5px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px black;
    cursor: pointer;
    margin: 15px;
}

p {
    background-color: none;
    font-size: 30px;
    height: 30px;
    margin: 0px;
    text-align: center;
    /* background-image: url(../../../assets/trash.png);
    background-size: contain;
    background-position: center; */
}

@media screen and (max-width: 475px) {
    * {
        font-size: 20px !important;
    }

    div {
        height: 30px;
    }
}
</style>