<template>
    <div class="search-box" :class="{ active: content }" ref="searchBox">
        <div class="search-content">
            <input v-model="content" type="text" class="search-input" placeholder="请输入内容" ref="searchInput">
            <i class="el-icon-circle-close search-clear" @click="clearContent"></i>
        </div>
        <i class="el-icon-search search-btn" @click="searchContent"></i>
    </div>
</template>
<script>
export default {
    name: "search",
    data() {
        return {
            content: ""
        }
    },
    mounted(){
        this.$refs['searchInput'].focus();
    },
    methods: {
        searchContent() {
            if (this.content) console.log(this.content)
        },
        clearContent() {
            this.content = ''
            
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../css/base.scss";

$color: #606266;
$border: #DCDFE6;
$border-active-color: #1890ff;

.search-box {
    width: auto;
    padding: 2px 0.3125rem 2px 0.9375rem;
    border-radius: 20px;
    position: relative;
    transition: all 1s ease-in-out;
    @include border(all, $border);
    @include flex(space-between, center);

    &:focus,
    &:active,
    &:hover {
        border-color: $border-active-color;
        box-shadow: 0 2px 12px 0 rgba(24, 144, 255, 0.3);

        .search-content {
            .search-input {
                width: 10rem;

                &::placeholder {
                    color: $color;
                }
            }
        }
    }

    i {
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: scale .5s linear;

        &:hover {
            transform: scale(1.1);
        }
    }

    .search-content {
        width: auto;
        height: 20px;
        position: relative;
        @include flex(space-between, center);

        .search-input {
            width: 0;
            height: 100%;
            border: none;
            outline: none;
            font-size: .875rem;
            letter-spacing: 1px;
            padding-right: 1.5625rem;
            @include border(right, $border);
            transition: all .5s ease-in-out;

            &::placeholder {
                font-size: .875rem;
                color: transparent;
            }

            &:not(:placeholder-shown) {
                width: 10rem;
            }

            &:not(:placeholder-shown)+.search-clear {
                display: block;
            }
        }

        .search-clear {
            display: none;
            position: absolute;
            top: -3px;
            right: 0;
            padding: 0.3125rem;
        }
    }

    .search-btn {
        color: $color;
        padding: .3125rem .4375rem .3125rem;
    }
}

.search-box.active {
    border-color: $border-active-color;
    box-shadow: 0 2px 12px 0 rgba(24, 144, 255, 0.3);
}
</style>
