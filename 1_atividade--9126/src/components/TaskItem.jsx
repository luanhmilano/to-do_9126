import styles from './TaskItem.module.css';

export const TaskItem = ({ task, onToggle, onDelete }) => (
    <li className={styles.taskItem}>
        <div className={styles.taskContent}>
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => onToggle(task.id)}
                className={styles.checkbox}
            />
            <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>{task.text}</span>
        </div>
        <button 
            onClick={() => onDelete(task.id)}
            className={styles.deleteButton}
            aria-label="Excluir tarefa"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.deleteIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    </li>
);