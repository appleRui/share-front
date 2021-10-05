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
      <ul class="post-items">
        <li v-for="(post, index) in posts" :key="post.id"><span>{{ post.post }}</span><button @click="deletePost(post.id)">削除</button><button><NuxtLink :to="`/post/${post.id}`">コメントする</NuxtLink></button><button @click="like(post.id, index)">いいねする({{ post.like_coute }})</button></li>
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
      this.posts = await resData.data.data;
      await this.hasLike(this.posts);
      // this.hasLike(resData.data.data);
    },
    async storePost() {
      const sendData = {
        post: this.post,
        user_id: this.user_id
      };
      if(this.post != ''){
        await this.$axios.post("http://localhost:8000/api/v1/post/", sendData);
        this.getPost();
        this.post = ''
      };
    },
    async deletePost(id) {
      await this.$axios.delete("http://localhost:8000/api/v1/post/" + id);
      this.getPost();
    },
    async hasLike(posts){
    for (let i = 0; i < posts.length; i++) {
        const res = await this.$axios.get("http://localhost:8000/api/v1/like", {params: {post_id:  posts[i].id, user_id: this.user_id}});
        console.log(res.data.result);
      }
      this.posts = posts;
    },
    async like(post_id, index) {
      const params = {
        post_id: post_id,
        user_id: this.user_id
      }
      if(!this.posts[index].niced){
        // like
        let res = await this.$axios.post("http://localhost:8000/api/v1/like", params);
        this.posts[index].niced = res.data.data.result;
        this.posts[index].like_coute = res.data.data.like_count;
      }else{
        // unlike
        let res = await this.$axios.delete("http://localhost:8000/api/v1/like/", {data: params});
        this.posts[index].niced = res.data.data.result;
        this.posts[index].like_coute = res.data.data.like_count;
        // console.log(this.posts[index].niced);
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
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_id = user.uid
        this.userName = user.displayName
      }else{
        this.$router.replace('/login')
      }
    })
    this.getPost();
  },
}
</script>