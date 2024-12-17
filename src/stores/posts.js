import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    /********* GET ALL POSTS FUNCTION *********/
    async getAllPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();

      return data;
    },

    /********* GET ONE POST FUNCTION *********/
    async getPost(post) {
      const res = await fetch(`/api/posts/${post}`);
      const data = await res.json();

      return data.post;
    },

    /********* CREATE A POST FUNCTION *********/
    async createPost(formData) {
      const res = await fetch("/api/posts", {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        this.router.push({ name: "home" });
      }
    },

    /********* CREATE A POST FUNCTION *********/
    async deletePost(post) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "delete",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          this.router.push({ name: "home" });
        }
      }
    },

    /********* CREATE A POST FUNCTION *********/
    async updatePost(post, formData) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "put",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.errors) {
          this.errors = data.errors;
        } else {
          this.errors = {};
          this.router.push({ name: "home" });
        }
      }
    },
  },
});
