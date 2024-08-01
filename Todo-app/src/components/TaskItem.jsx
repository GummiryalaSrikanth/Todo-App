import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleExpand = () => setIsExpanded(!isExpanded);
  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div>
      <h3 onClick={handleExpand}>
        {task.title} {task.completed ? '✓' : ''}
      </h3>
      {isExpanded && (
        <div>
          {isEditing ? (
            <div>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p>{task.description}</p>
              <p>Last updated: {new Date(task.updated_at).toLocaleString()}</p>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
              <button onClick={() => onToggle(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
