<template>
    <div id="bottom">
        <div class="copyright">
            <p>&copy; All rigts reserved by <a href="#">{{ blogName }}</a></p>
        </div>
    </div>
</template>
<script>
export default {
    name: "bottom",
    data() {
        return {
            blogName: "wzCoding"
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../css/base.scss";

#bottom {
    z-index: 3;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;

    .copyright {
        p {
            font-size: 14px;
            line-height: 100%;
            text-transform: capitalize;
            color: #747474;
            margin-bottom: 8px;

            span {
                color: #CB26B6;
            }

            a {
                cursor: pointer;
            }
        }
    }
}
</style>