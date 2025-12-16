from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://dev_user:dev_pass@localhost/todolist_db')
# Configuração de Segurança (OWASP A05: Security Misconfiguration)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'chave_super_secreta_para_flash_msgs')

# Inicializa o ORM SQLAlchemy
db = SQLAlchemy(app)

# Modelo de Dados (ORM)
class Tarefa(db.Model):
    # LGPD: Minimização de Dados (apenas o necessário)
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    concluida = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Tarefa {self.id}: {self.titulo}>'

@app.route('/')
def index():
    todas_tarefas = Tarefa.query.all()
    return render_template('index.html', tarefas=todas_tarefas)

@app.route('/adicionar', methods=['POST'])
def adicionar():
    if request.method == 'POST':
        titulo = request.form.get('titulo') 
        
        if not titulo:
            flash('O título da tarefa não pode estar vazio.', 'error')
            return redirect(url_for('index'))
            
        # Segurança (OWASP A03: Injection)
        nova_tarefa = Tarefa(titulo=titulo)
        
        db.session.add(nova_tarefa) 
        db.session.commit()
        
    return redirect(url_for('index'))

@app.route('/alternar/<int:tarefa_id>', methods=['POST'])
def alternar(tarefa_id):
    # Segurança (OWASP A01: Broken Access Control - IDOR)
    tarefa = db.get_or_404(Tarefa, tarefa_id) 
    
    tarefa.concluida = not tarefa.concluida
    db.session.commit()
    
    return redirect(url_for('index'))

@app.route('/deletar/<int:tarefa_id>', methods=['POST'])
def deletar(tarefa_id):
    # Privacidade (LGPD): Garante o Direito de Exclusão
    tarefa = db.get_or_404(Tarefa, tarefa_id)
    db.session.delete(tarefa)
    db.session.commit()
    
    flash('Tarefa excluída.', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
