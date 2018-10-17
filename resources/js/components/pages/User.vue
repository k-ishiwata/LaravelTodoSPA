<template>
    <div>
        <p v-show="isError">情報の取得に失敗しました。</p>
        <h1>ユーザー情報</h1>
        <table>
            <tr>
                <th>ID</th>
                <td>{{ user.id }}</td>
            </tr>
            <tr>
                <th>ユーザー名</th>
                <td>{{ user.name }}</td>
            </tr>
            <tr>
                <th>メール</th>
                <td>{{ user.email }}</td>
            </tr>
            <tr>
                <th>登録日</th>
                <td>{{ user.created_at }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isError: false,
                user: {}
            }
        },
        created() {
            axios.get('/api/me').then(res => {
                this.user = res.data;
            }).catch(error => {
                this.isError = true;
            });
        }
    }
</script>
