/* @name getAllTasks */
SELECT
  id,
  title,
  description,
  status,
  to_char(due_date, 'YYYY-MM-DD"T"HH24:MIZ') AS "due_date!",
  to_char(created_at, 'YYYY-MM-DD"T"HH24:MIZ') AS "created_at!"
FROM tasks
ORDER BY created_at DESC, id DESC;

/* @name getTasksByCreatedDesc */
SELECT
  id,
  title,
  description,
  status,
  to_char(due_date, 'YYYY-MM-DD"T"HH24:MIZ') AS "due_date!",
  to_char(created_at, 'YYYY-MM-DD"T"HH24:MIZ') AS "created_at!"
FROM tasks
WHERE (CAST(:prevCreatedAt AS timestamptz) IS NULL OR (created_at < :prevCreatedAt OR (created_at = :prevCreatedAt AND id < :prevId)))
ORDER BY created_at DESC, id DESC
LIMIT :pageSize!;

/* @name getTasksByStatusDesc */
SELECT
  id,
  title,
  description,
  status,
  to_char(due_date, 'YYYY-MM-DD"T"HH24:MIZ') AS "due_date!",
  to_char(created_at, 'YYYY-MM-DD"T"HH24:MIZ') AS "created_at!"
FROM tasks
WHERE (CAST(:prevStatus AS status) IS NULL OR (status < :prevStatus OR (status = :prevStatus AND id < :prevId)))
ORDER BY status DESC, id DESC
LIMIT :pageSize!;

/* @name getTasksByCreatedAsc */
SELECT
  id,
  title,
  description,
  status,
  to_char(due_date, 'YYYY-MM-DD"T"HH24:MIZ') AS "due_date!",
  to_char(created_at, 'YYYY-MM-DD"T"HH24:MIZ') AS "created_at!"
FROM tasks
WHERE (CAST(:prevCreatedAt as timestamptz) IS NULL OR (created_at > :prevCreatedAt OR (created_at = :prevCreatedAt AND id > :prevId)))
ORDER BY created_at ASC, id ASC
LIMIT :pageSize!;

/* @name getTasksByStatusAsc */
SELECT
  id,
  title,
  description,
  status,
  to_char(due_date, 'YYYY-MM-DD"T"HH24:MIZ') AS "due_date!",
  to_char(created_at, 'YYYY-MM-DD"T"HH24:MIZ') AS "created_at!"
FROM tasks
WHERE (CAST(:prevStatus AS status) IS NULL OR (status > :prevStatus OR (status = :prevStatus AND id > :prevId)))
ORDER BY status ASC, id ASC 
LIMIT :pageSize!;

/* @name findById */
SELECT * FROM tasks WHERE id = :taskId!;

/* @name updateStatus */
UPDATE tasks SET status = :newStatus! WHERE id = :taskId!
RETURNING status;

/* @name deleteTask */
DELETE FROM tasks WHERE id = :taskId!
RETURNING id;

/* @name insertTask */
INSERT INTO tasks (title, description, status, due_date)
VALUES (:title!, :description, :status!, :due_date!)
RETURNING *;
