import { useState, useEffect, useCallback } from "react";
import { initialQualityChecks } from "./data/initialQualityChecks";
import { QualityCheckItem } from "./components/QualityCheckItem";
import { TaskItem } from "./components/TaskItem";
import styles from './App.module.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [qualityChecks, setQualityChecks] = useState(initialQualityChecks);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos do localStorage
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("myTasks_tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      const storedChecks = localStorage.getItem("myTasks_qualityChecks");
      if (storedChecks) {
        setQualityChecks(JSON.parse(storedChecks));
      }
    } catch (error) {
      console.error("Falha ao carregar dados do localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  // Salva as tarefas no localStorage apenas após o carregamento inicial
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("myTasks_tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Salva o estado da lista de verificação de qualidade
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "myTasks_qualityChecks",
        JSON.stringify(qualityChecks)
      );
    }
  }, [qualityChecks, isLoaded]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return; // Validação de entrada (Adequação da Funcionalidade)

    const newTask = {
      id: Date.now(), // Usar timestamp como ID simples
      text: inputValue,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInputValue(""); // Limpa o input (Usabilidade)
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleQualityCheck = useCallback((id) => {
    setQualityChecks((prevChecks) =>
      prevChecks.map((check) =>
        check.id === id ? { ...check, completed: !check.completed } : check
      )
    );
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Tarefador
          </h1>
          <p className={styles.subtitle}>
            Uma aplicação para avaliar a qualidade de software (ISO/IEC 9126)
          </p>
        </header>

        <main className={styles.main}>
          <form
            onSubmit={handleAddTask}
            className={styles.form}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="O que precisa ser feito?"
              className={styles.input}
              aria-label="Nova tarefa"
            />
            <button
              type="submit"
              className={styles.button}
              aria-label="Adicionar tarefa"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{ width: '1.5rem', height: '1.5rem' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Adicionar
            </button>
          </form>

          <div>
            <h2 className={styles.sectionTitle}>
              Minhas Tarefas
            </h2>
            {tasks.length > 0 ? (
              <ul className={styles.tasksList}>
                {sortedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </ul>
            ) : (
              <p className={styles.emptyState}>
                Nenhuma tarefa por aqui. Adicione uma para começar!
              </p>
            )}
          </div>
        </main>

        <section className={styles.qualitySection}>
          <h2 className={styles.sectionTitle}>
            Checklist Interativo de Qualidade (ISO/IEC 9126)
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
            Marque os itens abaixo à medida que você testa e valida cada
            característica de qualidade neste aplicativo.
          </p>

          <div className={styles.qualityGrid}>
            {qualityChecks.map((check) => (
              <QualityCheckItem
                key={check.id}
                check={check}
                onToggle={handleToggleQualityCheck}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
