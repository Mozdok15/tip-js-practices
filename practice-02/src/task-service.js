function validateId(id) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  return { ok: true };
}

function validateTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const normalized = title.trim();
  if (normalized.length < 1 || normalized.length > 100) {
    return { ok: false, error: "Название должно содержать от 1 до 100 символов" };
  }
  return { ok: true, title: normalized };
}

function fail(error) {
  return { ok: false, error };
}

export function createTask(id, title, priority = "medium") {
  const idResult = validateId(id);
  if (!idResult.ok) return idResult;

  const titleResult = validateTitle(title);
  if (!titleResult.ok) return titleResult;

  if (!["low", "medium", "high"].includes(priority)) {
    return fail("Приоритет должен быть low, medium или high");
  }

  return {
    ok: true,
    task: {
      id,
      title: titleResult.title,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : completed / total * 100;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  const created = createTask(id, title, priority);
  if (!created.ok) return created;

  if (findTaskById(tasks, id) !== undefined) {
    return fail("Задача с таким id уже существует");
  }

  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  const idResult = validateId(id);
  if (!idResult.ok) return idResult;

  if (typeof completed !== "boolean") {
    return fail("completed должен быть логическим значением");
  }

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return fail("Задача с таким id не найдена");

  const result = tasks.map((task, taskIndex) =>
    taskIndex === index ? { ...task, completed } : task
  );
  return { ok: true, tasks: result };
}

export function renameTask(tasks, id, title) {
  const idResult = validateId(id);
  if (!idResult.ok) return idResult;

  const titleResult = validateTitle(title);
  if (!titleResult.ok) return titleResult;

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return fail("Задача с таким id не найдена");

  const result = tasks.map((task, taskIndex) =>
    taskIndex === index ? { ...task, title: titleResult.title } : task
  );
  return { ok: true, tasks: result };
}

export function removeTask(tasks, id) {
  const idResult = validateId(id);
  if (!idResult.ok) return idResult;

  if (findTaskById(tasks, id) === undefined) {
    return fail("Задача с таким id не найдена");
  }

  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}