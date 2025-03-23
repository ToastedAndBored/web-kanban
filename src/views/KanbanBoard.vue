<!-- src/views/KanbanBoard.vue -->
<template>
  <div class="kanban-board">
    <!-- Drag-and-drop for columns -->
    <draggable
      v-model="store.columns"
      group="kanbanColumns"
      item-key="id"
      class="kanban-columns"
    >
      <template #item="{ element }">
        <KanbanColumn :column="element" />
      </template>
    </draggable>

    <!-- Add new column -->
    <div class="add-column">
      <input
        v-model="newColumnTitle"
        placeholder="New column title"
        @keyup.enter="addColumn"
      />
      <button @click="addColumn">Add Column</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import KanbanColumn from "@/components/KanbanColumn.vue";
import { useKanbanStore } from "@/store/kanban";

const store = useKanbanStore();
const newColumnTitle = ref("");

function addColumn() {
  if (newColumnTitle.value.trim()) {
    store.addColumn(newColumnTitle.value.trim());
    newColumnTitle.value = "";
  }
}
</script>

<style lang="less" scoped>
.kanban-board {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px;
}

.kanban-columns {
  display: flex;
}

.add-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 10px;
}

.add-column input {
  margin-bottom: 5px;
  padding: 5px;
}
</style>
