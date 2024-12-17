<script setup>
import { onMounted, reactive, ref } from "vue";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();

const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(usePostsStore());

const { getPost, updatePost } = usePostsStore();

const post = ref(null);

const formData = reactive({
  title: "",
  body: "",
});

onMounted(async () => {
  post.value = await getPost(route.params.id);

  if (user.value.id !== post.value.user_id) {
    router.push({ name: "home" });
  } else {
    formData.title = post.value.title;
    formData.body = post.value.body;
  }
});
</script>

<template>
  <main>
    <h1 class="title">Update your post</h1>

    <form
      class="w-1/2 mx-auto space-y-3"
      @submit.prevent="updatePost(post, formData)"
    >
      <div>
        <input v-model="formData.title" type="text" placeholder="Post Title" />
        <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
      </div>
      <div>
        <textarea
          v-model="formData.body"
          rows="6"
          placeholder="Post Content"
        ></textarea>
        <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
      </div>
      <button class="primary-btn">Update</button>
    </form>
  </main>
</template>
