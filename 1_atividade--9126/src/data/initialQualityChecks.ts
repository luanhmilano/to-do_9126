export const initialQualityChecks = [
    {
        id: 'funcionalidade',
        title: '1. Funcionalidade',
        description: 'Você consegue adicionar, marcar como concluída e excluir uma tarefa sem erros? Os dados são salvos corretamente?',
        completed: false
    },
    {
        id: 'confiabilidade',
        title: '2. Confiabilidade',
        description: 'O app continua funcionando se você recarregar a página? Os dados persistem após fechar e abrir o navegador?',
        completed: false
    },
    {
        id: 'usabilidade',
        title: '3. Usabilidade',
        description: 'A interface é clara? Um novo usuário consegue adicionar e gerenciar tarefas em menos de 30 segundos?',
        completed: false
    },
    {
        id: 'eficiencia',
        title: '4. Eficiência (Desempenho)',
        description: 'A lista de tarefas atualiza rapidamente? A interface responde instantaneamente às ações do usuário?',
        completed: false
    },
    {
        id: 'manutenibilidade',
        title: '5. Manutenibilidade',
        description: 'O código (componentes React) está bem estruturado, facilitando a adição de uma nova funcionalidade?',
        completed: false
    },
    {
        id: 'portabilidade',
        title: '6. Portabilidade',
        description: 'O aplicativo funciona corretamente no Chrome, Firefox e Edge? O layout se adapta a telas de celular?',
        completed: false
    }
]