/* @name getAllTasks */
SELECT * FROM tasks ORDER BY created_at DESC;

/* @name findById */
SELECT * FROM tasks WHERE id = :taskId!;

/* @name updateStatus */
UPDATE tasks SET status = :newStatus! WHERE id = :taskId! RETURNING id;

/* @name deleteTask */
DELETE FROM tasks WHERE id = :taskId! RETURNING id;

/* @name insertTask */
INSERT INTO tasks (title, description, status, due_date, created_at)
VALUES (:title!, :description, :status!, :due_date!, :created_at!)
RETURNING id;
