<template>
  <div class="container">
    <p>{{ post_txt }}</p>
    <NuxtLink to="/">一覧へ</NuxtLink>
    <div class="comment-from">
      <input v-model="content" class="content" type="text">
      <label><input type="submit" value="追加" @click="storeComment"></label>
    </div>
    <div class="comment-conte">
      <ul class="comment-items">
        <li v-for="comment in comments" :key="comment.id"><span>{{ comment.content }}</span></li>
      </ul>
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
      post_id: null,
      post_txt: null,
      content: null,
      comments: []
    }
  },
  methods: {
    async getComments() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/post/" + this.$route.params.id + "/comments");
      console.log(resData.data.data);
      this.comments = resData.data.data;
    },
    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/post/" + this.$route.params.id);
      // console.log(resData);
      this.post_txt = resData.data.data.post;
    },
    async storeComment() {
      const params = {
        content: this.content,
      };
      if(this.content !== ''){
        await this.$axios.post("http://localhost:8000/api/v1/post/" + this.$route.params.id + "/comments", params);
        this.content = '';
        this.getComments();
      };
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName
        this.user_id = user.uid
        this.getPost();
        this.getComments();
      }else{
        this.$router.replace('/login')
      }
    })
  }
}
</script>