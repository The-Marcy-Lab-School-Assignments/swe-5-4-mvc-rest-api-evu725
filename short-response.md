# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
The URL structure uses `/api/todos` and `/api/todos/:id` to keep the resource in the path and the action in the `HTTP` method. This tells a developer what resource they're addressing, rather from what action they're performing on it.

The HTTP methods `POST`, `PATCH`, and `DELETE` map to CRUD actions, so the server knows what kind of request it's receiving. `POST` creates a todo, `PATCH` updates an existing todo, and `DELETE` removes the todo from the list.

The status codes show the specific outcome of a request: `400` for a invalid or missing input, `404` for a todo that doesn't exist, and `204` to confirm a successful delete with nothing to return. This lets the client tell why something failed just from `response.status`, without parsing the response body.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:
The code that changes the todos ends up mixed with the code that handles requests and responses, such as reading `req.body` or sending status codes. This makes it harder to test the data logic by itself, since you'd need a fake request and response just to check if it works.

It also makes it harder to change the data later, since the logic would be spread across every route instead of kept in one place.

Separating them into a model and controller fixes this by giving each file one role. The controller handles requests and responses, the model handles the data, and this makes the code easier to read, test, and change later.
---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:
Clicking the checkbox sends a `PATCH /todos/:id` request from the client. `index.js` receives it and passes it to the router in `todo.routes.js`, which calls toggleTodo in `todo.controller.js`. This function reads the id from `req.params` and calls `toggleTodoStatus` in `todo.model.js`, which finds the todo by `id`, switches `isDone`, and returns it. The controller then sends the updated todo back to the client.
---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:
1. Belongs in the **controller** because it reads from `req.body`. 
2. The **controller** because it checks the incoming request and sends back an HTTP response.
3. The **model** because it defines the fields of what todo looks like.
4. The **model** because it saves the new todo to the todos list.
5. The **controller** because it sends the HTTP response back to the client.
