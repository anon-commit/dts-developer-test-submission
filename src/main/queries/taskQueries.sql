/* @name getAllTasks */
SELECT * FROM tasks ORDER BY created_at DESC, id DESC;

/* @name getNumTasks */
SELECT COUNT(*) AS "count!" FROM tasks;

/* @name getTasksByCreatedDesc */
SELECT *
FROM tasks
WHERE (CAST(:prevCreatedAt AS timestamptz) IS NULL OR (created_at < :prevCreatedAt OR (created_at = :prevCreatedAt AND id < :prevId)))
ORDER BY created_at DESC, id DESC
LIMIT :pageSize!;

/* @name getTasksByCreatedAsc */
SELECT *
FROM tasks
WHERE (CAST(:prevCreatedAt as timestamptz) IS NULL OR (created_at > :prevCreatedAt OR (created_at = :prevCreatedAt AND id > :prevId)))
ORDER BY created_at ASC, id ASC
LIMIT :pageSize!;

/* @name getTasksByDuedateDesc */
SELECT *
FROM tasks
WHERE (CAST(:prevDuedate AS timestamptz) IS NULL OR (due_date < :prevDuedate OR (due_date = :prevDuedate AND id < :prevId)))
ORDER BY due_date DESC, id DESC
LIMIT :pageSize!;

/* @name getTasksByDuedateAsc */
SELECT *
FROM tasks
WHERE (CAST(:prevDuedate AS timestamptz) IS NULL OR (due_date < :prevDuedate OR (due_date = :prevDuedate AND id < :prevId)))
ORDER BY due_date ASC, id ASC 
LIMIT :pageSize!;

/* @name getTasksByStatusDesc */
SELECT *
FROM tasks
WHERE (CAST(:prevStatus AS status) IS NULL OR (status < :prevStatus OR (status = :prevStatus AND id < :prevId)))
ORDER BY status DESC, id DESC
LIMIT :pageSize!;

/* @name getTasksByStatusAsc */
SELECT *
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
