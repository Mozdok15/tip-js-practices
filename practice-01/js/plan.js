"use strict";

const totalTasks = 12;
const completedTasks = 5;
const dailyLimit = 3;

const validTasks =
  Number.isFinite(totalTasks) &&
  Number.isInteger(totalTasks) &&
  totalTasks >= 0 &&
  totalTasks <= 1000 &&
  Number.isFinite(completedTasks) &&
  Number.isInteger(completedTasks) &&
  completedTasks >= 0 &&
  completedTasks <= totalTasks;

const validDailyLimit =
  Number.isFinite(dailyLimit) &&
  Number.isInteger(dailyLimit) &&
  dailyLimit >= 1 &&
  dailyLimit <= 1000;

if (!validTasks || !validDailyLimit) {
  console.log("Ошибка: некорректные входные данные");
} else {
  let remainingTasks = totalTasks - completedTasks;
  let day = 0;

  console.log(`Осталось задач: ${remainingTasks}`);

  while (remainingTasks > 0) {
    day += 1;
    const completedToday = Math.min(dailyLimit, remainingTasks);
    remainingTasks -= completedToday;
    console.log(`День ${day}: выполнено ${completedToday}, осталось ${remainingTasks}`);
  }

  console.log(`Потребуется дней: ${day}`);
}