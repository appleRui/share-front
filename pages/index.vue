<template>
  <div class="container">
  <div class="user-staus">
    <span>ログイン先：{{ userName }}</span>
    <button @click="logout">ログアウト</button>
  </div>
  <div>
    <div class="post-from">
      <input v-model="post" class="content" type="text">
      <label><input type="submit" value="送信" @click="store"></label>
    </div>
    <div class="post-conte">
      <ul class="post-items" v-for="post in posts">
        {{ post }}
      </ul>
    </div>
  </div>

  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return{
      userName: null,
      email: null,
      post: null,
      posts: []
    }
  },
  methods: {
    store() {
      if(this.post !== ''){
          this.posts.push(this.post)
          this.post = ''
      }
    },
    logout() {
      firebase.auth().signOut().then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/')
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName
        console.log(user.email);
      }else{
        this.$router.replace('/login')
      }
    })
  },
}
</script>