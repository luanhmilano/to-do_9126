import styles from './QualityCheckItem.module.css';

export const QualityCheckItem = ({ check, onToggle }) => (
    <div className={`${styles.checkItem} ${check.completed ? styles.completed : ''}`}>
        <label className={styles.checkLabel}>
            <input 
                type="checkbox"
                checked={check.completed}
                onChange={() => onToggle(check.id)}
                className={styles.checkbox}
            />
            <div className={styles.checkContent}>
                <h3 className={`${styles.checkTitle} ${check.completed ? styles.completed : ''}`}>{check.title}</h3>
                <p className={`${styles.checkDescription} ${check.completed ? styles.completed : ''}`}>{check.description}</p>
            </div>
        </label>
    </div>
);