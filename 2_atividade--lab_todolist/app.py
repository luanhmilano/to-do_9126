from flask import Flask, render_template, request, redirect, url_for, flash 
from flask_sqlalchemy import SQLAlchemy 
import os 

app = Flask(__name__) 

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://dev_user:dev_pass@localhost/todolist_db') 

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'chave_super_secreta_para_flash_msgs') 

db = SQLAlchemy(app) 

 

# Modelo de Dados (ORM) 

class Tarefa(db.Model): 

    # LGPD: Minimização de Dados (apenas o necessário) 

    id = db.Column(db.Integer, primary_key=True) 
    titulo = db.Column(db.String(100), nullable=False) 

    concluida = db.Column(db.Boolean, default=False) 

    # Saída: Representação do objeto para debug 

    def __repr__(self): 

        return f'<Tarefa {self.id}: {self.titulo}>' 

@app.route('/') 

def index(): 
    # Consulta ao DB: Obtém todas as tarefas (Saída do ORM) 

    todas_tarefas = Tarefa.query.all() 

    # Saída para a web: Renderiza o HTML, passando a lista de objetos Tarefa 

    return render_template('index.html', tarefas=todas_tarefas) 

 

if __name__ == '__main__': 
    # Bloco para criar as tabelas no PostgreSQL (Executar uma vez) 

    # python -> from app import app, db -> with app.app_context(): db.create_all() 

    app.run(debug=True) 
