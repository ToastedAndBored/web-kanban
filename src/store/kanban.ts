import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useKanbanStore = defineStore("kanban", () => {
  const columnContent = reactive([]);
  function clearColumnContent() {
    columnContent.splice(0, columnContent.length);
  }
  return {
    columnContent,
    clearColumnContent,
  };
});
