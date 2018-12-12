<template>
    <div>
        <div class="table-head">
            <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handleOpenInputModal()">追加</el-button>
        </div>
        <el-table :data="getProjects" :row-key="row => row.id" border stripe size="small">
            <el-table-column prop="id" label="ID" width="60" sortable></el-table-column>
            <el-table-column prop="title" label="プロジェクト名"></el-table-column>
            <el-table-column prop="created_at" :formatter="dateTimeFormatter" label="登録日" width="180" sortable></el-table-column>
            <el-table-column label="アクション" fixed="right" width="190">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleOpenInputModal(scope.row)" icon="el-icon-edit-outline">編集</el-button>
                    <el-button size="mini" type="danger" @click="handleOpenDeleteModal(scope.row)" icon="el-icon-delete">削除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <input-modal ref="inputModal"></input-modal>
        <delete-modal ref="deleteModal"></delete-modal>
    </div>
</template>

<script>
    import dayjs from 'dayjs';
    import InputModal from './InputModal';
    import DeleteModal from './DeleteModal';
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                isInputModal: false,
                isDeleteModal: false
            }
        },
        components: {
            InputModal, DeleteModal
        },
        mounted() {
            this.fetch();
        },
        computed: {
            ...mapGetters('project', [
                'getProjects'
            ])
        },
        methods: {
            ...mapActions('project', [
                'fetch'
            ]),
            dateTimeFormatter(row, col) {
                if (row[col.property]) {
                    return dayjs(row[col.property]).format('YY/MM/DD HH:mm');
                }
            },
            handleOpenInputModal(project = {}) {
                this.$refs.inputModal.setProject(project);
                this.isInputModal = true;
            },
            handleOpenDeleteModal(project) {
                this.$refs.deleteModal.setProject(project);
                this.isDeleteModal = true;
            }
        }
    }
</script>
