"use strict";

const totalTasks = 15;
const completedTasks = 0;

const validTotal = Number.isFinite(totalTasks) && Number.isInteger(totalTasks) && totalTasks >= 0 && totalTasks <= 1000;
const validCompleted = Number.isFinite(completedTasks) && Number.isInteger(completedTasks) && completedTasks >= 0 && completedTasks <= totalTasks;

if (!validTotal || !validCompleted) {
  console.log("Ошибка: некорректное количество задач");
} else if (totalTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remainingTasks = totalTasks - completedTasks;
  const percentage = completedTasks / totalTasks * 100;
  let status;
  if (completedTasks === 0) status = "Не начато";
  else if (completedTasks === totalTasks) status = "Завершено";
  else status = "В работе";
  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remainingTasks}`);
  console.log(`Прогресс: ${percentage.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}