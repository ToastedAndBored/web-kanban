<!-- src/components/KanbanColumn.vue -->
<template>
  <div class="kanban-column">
    <header class="kanban-column-header">{{ column.title }}</header>

    <!-- Use localItems for drag-and-drop -->
    <draggable
      v-model="localItems"
      group="kanbanItems"
      item-key="id"
      class="kanban-items"
      @change="updateItems"
    >
      <template #item="{ element }">
        <KanbanItem :item="element" :columnId="column.id" />
      </template>
    </draggable>

    <!-- Add new item -->
    <div class="kanban-column-add-item">
      <input
        v-model="newItemContent"
        placeholder="Add item"
        @keyup.enter="addItem"
      />
      <button @click="addItem">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import KanbanItem from "@/components/KanbanItem.vue";
import {
  type KanbanColumn as KanbanColumnType,
  useKanbanStore,
} from "@/store/kanban";

const props = defineProps<{ column: KanbanColumnType }>();
const store = useKanbanStore();

const newItemContent = ref("");

// Create a local reactive copy of the column's items.
const localItems = ref([...props.column.items]);

// Deep watch the column items to update the local copy when changes occur from outside.
watch(
  () => props.column.items,
  (newVal) => {
    localItems.value = [...newVal];
  },
  { deep: true }
);

// When draggable emits a change, update the store with the new items order.
function updateItems() {
  store.updateColumnItems(props.column.id, localItems.value);
}

// When adding a new item, update the store and refresh the local copy.
function addItem() {
  if (newItemContent.value.trim() !== "") {
    store.addItemToColumn(props.column.id, newItemContent.value.trim());
    newItemContent.value = "";
    localItems.value = [...props.column.items];
  }
}
</script>

<style lang="less" scoped>
.kanban-column {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.kanban-column-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.kanban-items {
  flex-grow: 1;
  min-height: 50px;
}

.kanban-column-add-item {
  margin-top: 10px;
  display: flex;
}

.kanban-column-add-item input {
  flex: 1;
  padding: 5px;
}

.kanban-column-add-item button {
  padding: 5px 10px;
}
</style>
