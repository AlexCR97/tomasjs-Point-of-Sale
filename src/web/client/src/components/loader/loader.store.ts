import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLoader = defineStore("Loader", () => {
  const loading = ref(false);

  return {
    isLoading: computed(() => loading.value),

    show() {
      loading.value = true;
    },

    hide() {
      loading.value = false;
    },
  };
});
