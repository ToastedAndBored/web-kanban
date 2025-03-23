<!-- src/components/KanbanItem.vue -->
<template>
  <div class="kanban-item">
    <div v-if="!isEditing" @click="startEditing">
      {{ item.content }}
      <!-- Delete button example -->
      <button @click.stop="deleteItem">Delete</button>
    </div>
    <div v-else>
      <textarea v-model="editableContent" @blur="finishEditing" autofocus />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKanbanStore, type KanbanItem } from "@/store/kanban";

// Now we require both item and its parent column id
const props = defineProps<{
  item: KanbanItem;
  columnId: string;
}>();

const store = useKanbanStore();

const isEditing = ref(false);
const editableContent = ref("");

function startEditing() {
  isEditing.value = true;
  editableContent.value = props.item.content;
}

function finishEditing() {
  // Instead of directly mutating the prop, update via store method
  store.updateItem(props.columnId, props.item.id, editableContent.value);
  isEditing.value = false;
}

function deleteItem() {
  store.removeItem(props.columnId, props.item.id);
}
</script>

<style lang="less" scoped>
.kanban-item {
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
