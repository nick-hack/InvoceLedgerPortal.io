import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectTracker.css';

const initialColumns = {
  TODO: ['Design homepage'],
  InProgress: ['Build login API'],
  Development: ['Integrate payment gateway'],
  Testing: ['Write unit tests'],
  Done: ['Deploy to staging'],
};

const ProjectTracker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showKanban, setShowKanban] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceColumn, setSourceColumn] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setColumns((prev) => ({
      ...prev,
      TODO: [...prev.TODO, newTask],
    }));
    setNewTask('');
  };

  const handleDragStart = (task, column) => {
    setDraggedTask(task);
    setSourceColumn(column);
  };

  const handleDrop = (targetColumn) => {
    if (!draggedTask || !sourceColumn || sourceColumn === targetColumn) return;

    setColumns((prev) => {
      const sourceTasks = prev[sourceColumn].filter((t) => t !== draggedTask);
      const targetTasks = [...prev[targetColumn], draggedTask];
      return {
        ...prev,
        [sourceColumn]: sourceTasks,
        [targetColumn]: targetTasks,
      };
    });

    setDraggedTask(null);
    setSourceColumn(null);
  };

  const handleDelete = (column, task) => {
    setColumns((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t !== task),
    }));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditedText(task);
  };

  const handleSaveEdit = (column) => {
    setColumns((prev) => ({
      ...prev,
      [column]: prev[column].map((t) => (t === editingTask ? editedText : t)),
    }));
    setEditingTask(null);
    setEditedText('');
  };

  const handleView = (task) => {
    alert(`Viewing task: ${task}`);
  };

  return (
    <div className="tracker-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <h2>📌 Project Tracker: Project #{id}</h2>

      <div className="tracker-sections">
        <div className="tracker-box" onClick={() => setShowKanban(!showKanban)}>
          🗂️ Kanban Board
        </div>
        <div className="tracker-box">🐞 Issues</div>
        <div className="tracker-box">📦 Backlogs</div>
        <div className="tracker-box">📅 Timeline</div>
        <div className="tracker-box">📬 Queues</div>
        <div className="tracker-box">💡 All Ideas</div>
        <div className="tracker-box">💻 Write Code</div>
      </div>

      {showKanban && (
        <>
          <div className="issue-creator">
            <input
              type="text"
              placeholder="Add new issue to TODO"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>➕ Add</button>
          </div>

          <div className="kanban-board">
            {Object.entries(columns).map(([columnId, tasks]) => (
              <div
                key={columnId}
                className="kanban-column"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(columnId)}
              >
                <h3>{columnId}</h3>
                <ul>
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(task, columnId)}
                      className="task-item"
                    >
                      {editingTask === task ? (
                        <>
                          <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                          />
                          <button onClick={() => handleSaveEdit(columnId)}>💾</button>
                        </>
                      ) : (
                        <>
                          <span>{task}</span>
                          <div className="task-actions">
                            <button onClick={() => handleView(task)}>👁️</button>
                            <button onClick={() => handleEdit(task)}>✏️</button>
                            <button onClick={() => handleDelete(columnId, task)}>🗑️</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectTracker;