<template>
    <div>
        <h1>タスク一覧</h1>
        <table class="table is-border is-small is-stripe">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>タイトル</th>
                    <th>状態</th>
                    <th>期日</th>
                    <th>編集</th>
                </tr>
            </thead>
            <tr v-for="task in tasks">
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.state_id }}</td>
                <td>{{ task.due_at }}</td>
                <td><button @click="onEdit(task)">編集</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        computed: {

            tasks () {
                return this.$store.getters['task/getAll'];
            }

            // ...mapState('task', {
            //     'tasks': 'tasks'
            // })
        },

        mounted() {
            this.$store.dispatch('task/load');
        },
        methods: {
            onEdit(task) {
                console.log(task);
            }
        }
    }
</script>
