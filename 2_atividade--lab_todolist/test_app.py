import pytest
from app import app, db, Tarefa

# Fixture: Configura o ambiente de teste com DB em memória (Caixa Branca)
@pytest.fixture(scope='module')
def client():
    app.config['TESTING'] = True 
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:' 
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client  
            db.drop_all()   

# Teste Funcional (Verifica se a página carrega corretamente)
def test_index_carregamento(client):
    response = client.get('/') 
    assert response.status_code == 200
    assert b"Lista de Tarefas Acess" in response.data 

# Teste de Integração (Adiciona via HTTP e verifica o DB)
def test_adicionar_tarefa_e_db(client):
    response = client.post('/adicionar', data={'titulo': 'Tarefa de Teste 1'}, follow_redirects=True)
    assert response.status_code == 200
    
    with app.app_context():
        tarefa = Tarefa.query.filter_by(titulo='Tarefa de Teste 1').first()
        assert tarefa is not None
        assert not tarefa.concluida

# Teste de Segurança/Confiabilidade (OWASP)
def test_adicionar_vazio_nao_cria_no_db(client):
    response = client.post('/adicionar', data={'titulo': ''}, follow_redirects=True)
    assert b"O t\xc3\xadtulo da tarefa n\xc3\xa3o pode estar vazio." in response.data
    with app.app_context():
        assert Tarefa.query.count() == 0

# Teste adicional: Verificar alternar conclusão
def test_alternar_conclusao(client):
    with app.app_context():
        tarefa = Tarefa(titulo='Tarefa para alternar')
        db.session.add(tarefa)
        db.session.commit()
        tarefa_id = tarefa.id
    
    response = client.post(f'/alternar/{tarefa_id}', follow_redirects=True)
    assert response.status_code == 200
    
    with app.app_context():
        tarefa = Tarefa.query.get(tarefa_id)
        assert tarefa.concluida == True

# Teste adicional: Verificar deletar tarefa
def test_deletar_tarefa(client):
    with app.app_context():
        tarefa = Tarefa(titulo='Tarefa para deletar')
        db.session.add(tarefa)
        db.session.commit()
        tarefa_id = tarefa.id
    
    response = client.post(f'/deletar/{tarefa_id}', follow_redirects=True)
    assert response.status_code == 200
    
    with app.app_context():
        tarefa = Tarefa.query.get(tarefa_id)
        assert tarefa is None
