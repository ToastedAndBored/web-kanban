// src/store/kanban.ts
import { defineStore } from "pinia";
import { reactive } from "vue";

export interface KanbanItem {
  id: string;
  content: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

export const useKanbanStore = defineStore("kanban", () => {
  // Initial state with a few columns
  const columns = reactive<KanbanColumn[]>([
    { id: "1", title: "To Do", items: [] },
    { id: "2", title: "In Progress", items: [] },
    { id: "3", title: "Done", items: [] },
  ]);

  function addColumn(title: string) {
    columns.push({ id: String(Date.now()), title, items: [] });
  }

  function addItemToColumn(columnId: string, content: string) {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.items.push({ id: String(Date.now()), content });
    }
  }

  function removeItem(columnId: string, itemId: string) {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      const index = column.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        column.items.splice(index, 1);
      }
    }
  }

  function updateItem(columnId: string, itemId: string, newContent: string) {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      const item = column.items.find((it) => it.id === itemId);
      if (item) {
        item.content = newContent;
      }
    }
  }

  function moveItem(
    sourceColumnId: string,
    targetColumnId: string,
    itemId: string,
    targetIndex: number
  ) {
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const targetColumn = columns.find((col) => col.id === targetColumnId);
    if (sourceColumn && targetColumn) {
      const itemIndex = sourceColumn.items.findIndex(
        (item) => item.id === itemId
      );
      if (itemIndex !== -1) {
        const [item] = sourceColumn.items.splice(itemIndex, 1);
        targetColumn.items.splice(targetIndex, 0, item);
      }
    }
  }

  // New method to update the entire items array for a column
  function updateColumnItems(columnId: string, newItems: KanbanItem[]) {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.items.splice(0, column.items.length, ...newItems);
    }
  }

  return {
    columns,
    addColumn,
    addItemToColumn,
    removeItem,
    updateItem,
    moveItem,
    updateColumnItems,
  };
});
