import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

function printStats(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`\n${label}`);
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  console.log(total === 0 ? "Задач пока нет" : `Прогресс: ${progress.toFixed(1)}%`);
}

function apply(currentTasks, result) {
  if (result.ok) return result.tasks;
  console.error(`Ошибка: ${result.error}`);
  return currentTasks;
}

console.log("ПР2. Общий демонстрационный сценарий");
console.table(demoTasks);
printStats("Исходный набор", demoTasks);

let currentTasks = demoTasks;
currentTasks = apply(currentTasks, addTask(currentTasks, 20, "Добавить проверку", "high"));
currentTasks = apply(currentTasks, setTaskCompleted(currentTasks, 4, true));
currentTasks = apply(currentTasks, renameTask(currentTasks, 10, "Подготовить инструкцию запуска"));
currentTasks = apply(currentTasks, removeTask(currentTasks, 7));
printStats("После общего сценария", currentTasks);

const failedOperation = addTask(currentTasks, 10, "Дубликат");
if (!failedOperation.ok) console.log("Ожидаемый отказ:", failedOperation.error);
console.log("demoTasks после общего сценария:");
console.table(demoTasks);

console.log(`\nИндивидуальный вариант ${variantNumber}: подготовка выступления`);
let variantCurrent = variantTasks;
console.table(variantCurrent);
printStats("Вариант: исходное состояние", variantCurrent);

variantCurrent = apply(
  variantCurrent,
  addTask(variantCurrent, 80, "Подготовить финальные слайды", "medium")
);
printStats("Вариант: после добавления id=80", variantCurrent);

variantCurrent = apply(
  variantCurrent,
  setTaskCompleted(variantCurrent, 11, true)
);
printStats("Вариант: после выполнения id=11", variantCurrent);

variantCurrent = apply(
  variantCurrent,
  renameTask(variantCurrent, 23, "Составить финальный план выступления")
);
printStats("Вариант: после переименования id=23", variantCurrent);

variantCurrent = apply(
  variantCurrent,
  removeTask(variantCurrent, 37)
);
printStats("Вариант: после удаления id=37", variantCurrent);

const duplicateVariant = addTask(
  variantCurrent,
  80,
  "Повторная задача",
  "medium"
);
if (!duplicateVariant.ok) {
  console.log("Ожидаемый отказ при повторном id=80:", duplicateVariant.error);
}

console.log("Итоговые задачи варианта:");
console.table(variantCurrent);
console.log("Исходный variantTasks не изменён:");
console.table(variantTasks);
console.log("Названия итоговых задач:", getTaskTitles(variantCurrent));
console.log("Невыполненные задачи:", getPendingTasks(variantCurrent));
console.log("Поиск id=23:", findTaskById(variantCurrent, 23));