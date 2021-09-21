<template>
  <div class="container">
  <div class="user-staus">
    <span>ログイン先：{{ userName }}</span>
    <button @click="logout">ログアウト</button>
  </div>
  <div>
    <div class="post-from">
      <input v-model="post" class="content" type="text">
      <label><input type="submit" value="送信" @click="storePost"></label>
    </div>
    <div class="post-conte">
      <ul class="post-items" v-for="post in posts" :key="post.id">
        <li><span>{{ post.post }}</span><button @click="deletePost(post.id)">削除</button><button>コメントする</button><button>いいねする</button></li>
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
      user_id: null,
      email: null,
      post: null,
      posts: []
    }
  },
  methods: {
    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/post/");
      console.log(resData);
      this.posts = resData.data.data;
    },
    async storePost() {
      const sendData = {
        post: this.post,
        user_id: this.user_id
      };
      console.log(sendData);
      if(this.post !== ''){
        await this.$axios.post("http://localhost:8000/api/v1/post/", sendData);
        this.getPost();
        this.post = ''
      };
    },
    async deletePost(id) {
      await this.$axios.delete("http://localhost:8000/api/v1/post/" + id);
      console.log('test');
      this.getPost();
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
        this.user_id = user.uid
        console.log(user.uid);
      }else{
        this.$router.replace('/login')
      }
    })
    this.getPost();
  },
}
</script>