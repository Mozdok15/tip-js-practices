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
  const stats = getTaskStats(tasks);
  console.log(`\n${label}`);
  console.log(`Всего: ${stats.total}; выполнено: ${stats.completed}; осталось: ${stats.pending}`);
  console.log(stats.total === 0 ? "Задач пока нет" : `Прогресс: ${stats.progress.toFixed(1)}%`);
}

function apply(currentTasks, result) {
  if (result.ok) return result.tasks;
  console.error(`Ошибка: ${result.error}`);
  return currentTasks;
}

console.log("ПР2. Общий демонстрационный сценарий");
console.table(demoTasks);
console.log("Названия:", getTaskTitles(demoTasks));
console.log("Невыполненные:", getPendingTasks(demoTasks));
printStats("Исходный набор", demoTasks);

let currentTasks = demoTasks;
currentTasks = apply(currentTasks, addTask(currentTasks, 20, "Добавить проверку", "high"));
printStats("После добавления id 20", currentTasks);

currentTasks = apply(currentTasks, setTaskCompleted(currentTasks, 4, true));
printStats("После выполнения id 4", currentTasks);

currentTasks = apply(currentTasks, renameTask(currentTasks, 10, "Подготовить инструкцию запуска"));
printStats("После переименования id 10", currentTasks);

currentTasks = apply(currentTasks, removeTask(currentTasks, 7));
printStats("После удаления id 7", currentTasks);

console.log("\nПоиск id 10:", findTaskById(currentTasks, 10));
console.log("Итоговые id:", currentTasks.map((task) => task.id));

const failedOperation = addTask(currentTasks, 10, "Дубликат");
if (!failedOperation.ok) {
  console.log("Ожидаемый отказ:", failedOperation.error);
}
console.log("Исходный demoTasks после сценария:");
console.table(demoTasks);

console.log("\nИндивидуальный вариант:", variantNumber);
if (variantTasks.length === 0) {
  console.log("Индивидуальный набор пока не заполнен: нужен номер варианта.");
} else {
  console.table(variantTasks);
}