import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePageHeader = defineStore("PageHeader", () => {
  const title = ref("Page Title");
  const subtitle = ref<string | undefined>();

  return {
    title: computed(() => title.value),
    subtitle: computed(() => subtitle.value),

    setTitle(value: string) {
      title.value = value;
    },
    setSubtitle(value: string) {
      subtitle.value = value;
    },
  };
});
