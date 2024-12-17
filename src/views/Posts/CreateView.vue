<script setup>
import { reactive } from "vue";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(usePostsStore());
const { createPost } = usePostsStore();

const formData = reactive({
  title: "",
  body: "",
});
</script>

<template>
  <main>
    <h1 class="title">Create a new post</h1>

    <form
      class="w-1/2 mx-auto space-y-3"
      @submit.prevent="createPost(formData)"
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
      <button class="primary-btn">Create</button>
    </form>
  </main>
</template>
