(function () {
  "use strict";

  const STORAGE_KEY = "todoapp.todos";
  const THEME_KEY = "todoapp.theme";

  const form = document.getElementById("new-todo-form");
  const input = document.getElementById("new-todo-input");
  const list = document.getElementById("todo-list");
  const emptyState = document.getElementById("empty-state");
  const itemsLeft = document.getElementById("items-left");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const toggleAllBtn = document.getElementById("toggle-all");
  const filterButtons = document.querySelectorAll(".filter");
  const themeToggle = document.getElementById("theme-toggle");

  let todos = load();
  let filter = "all";

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      /* storage unavailable (e.g. private mode) — keep working in memory */
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function visibleTodos() {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }

  function render() {
    list.replaceChildren(...visibleTodos().map(renderItem));

    const remaining = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
    emptyState.hidden = list.children.length > 0;
    emptyState.textContent = todos.length === 0
      ? "Nothing here yet. Add your first todo above."
      : `No ${filter} todos.`;
    clearCompletedBtn.hidden = !todos.some((t) => t.completed);
    toggleAllBtn.hidden = todos.length === 0;
    toggleAllBtn.textContent = remaining === 0 ? "Mark all active" : "Mark all done";
  }

  function renderItem(todo) {
    const li = document.createElement("li");
    li.className = "todo" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "Mark as done");
    checkbox.addEventListener("change", () => update(todo.id, { completed: checkbox.checked }));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;
    text.title = "Double-click to edit";
    text.addEventListener("dblclick", () => startEdit(li, todo));

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.setAttribute("aria-label", "Delete todo");
    del.textContent = "×";
    del.addEventListener("click", () => remove(todo.id));

    li.append(checkbox, text, del);
    return li;
  }

  function startEdit(li, todo) {
    const text = li.querySelector(".todo-text");
    const editor = document.createElement("input");
    editor.className = "edit-input";
    editor.value = todo.text;
    editor.maxLength = 200;
    let done = false;

    const finish = (commit) => {
      if (done) return;
      done = true;
      const value = editor.value.trim();
      if (commit && value) update(todo.id, { text: value });
      else if (commit && !value) remove(todo.id);
      else render();
    };

    editor.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finish(true);
      if (e.key === "Escape") finish(false);
    });
    editor.addEventListener("blur", () => finish(true));

    text.replaceWith(editor);
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }

  function add(text) {
    todos.push({ id: uid(), text, completed: false, createdAt: Date.now() });
    commit();
  }

  function update(id, changes) {
    todos = todos.map((t) => (t.id === id ? { ...t, ...changes } : t));
    commit();
  }

  function remove(id) {
    todos = todos.filter((t) => t.id !== id);
    commit();
  }

  function commit() {
    save();
    render();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    add(value);
    input.value = "";
    input.focus();
  });

  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    commit();
  });

  toggleAllBtn.addEventListener("click", () => {
    const allDone = todos.every((t) => t.completed);
    todos = todos.map((t) => ({ ...t, completed: !allDone }));
    commit();
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      filterButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });
      render();
    });
  });

  // Theme: saved choice, else system preference.
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
  }
  let theme;
  try { theme = localStorage.getItem(THEME_KEY); } catch { /* ignore */ }
  if (!theme) theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(theme);
  themeToggle.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
  });

  // Keep multiple open tabs in sync.
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      todos = load();
      render();
    }
  });

  render();
})();
