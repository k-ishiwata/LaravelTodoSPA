<template>
    <el-form :inline="true" class="search-form">
        <el-form-item>
            <el-input
                v-model="filterQuery.title"
                size="small"
                placeholder="タイトル"
                @change="handleChangeQuery"
                clearable></el-input>
        </el-form-item>

        <el-form-item>
            <el-select
                v-model="filterQuery.state_id"
                size="small"
                placeholder="状態"
                @change="handleChangeQuery"
                clearable>
                <el-option
                    v-for="(item, index) in status"
                    :key="index"
                    :label="item.name"
                    :value="index">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-select
                v-model="filterQuery.user_id"
                size="small"
                placeholder="担当"
                @change="handleChangeQuery"
                clearable>
                <el-option
                    v-for="item in users"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-select
                    v-model="filterQuery.project_id"
                    size="small"
                    placeholder="プロジェクト"
                    @change="handleChangeQuery"
                    clearable>
                <el-option
                        v-for="item in projects"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-date-picker
                v-model="filterQuery.created_at"
                size="small"
                type="date"
                placeholder="登録日"
                @change="handleChangeQuery">
            </el-date-picker>
        </el-form-item>
    </el-form>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        data () {
            return {
                filterQuery: {
                    title: "",
                    project_id: "",
                    state_id: "",
                    user_id: "",
                    created_at: null
                },
            }
        },
        props: {
            status: Array,
            users: Array,
            projects: Array
        },
        mounted() {
            this.setFilterQuery(this.filterQuery);
        },
        methods: {
            ...mapMutations('task', [
                'setFilterQuery'
            ]),
            handleChangeQuery() {
                this.setFilterQuery(this.filterQuery);
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-form {
        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>