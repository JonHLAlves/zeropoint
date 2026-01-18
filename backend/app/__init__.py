import os
from flask import Flask
from app.extensions.extensions import db, bcrypt, jwt
from flask_cors import CORS
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

# Validação de variáveis críticas
required_vars = ['DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT', 'DB_NAME', 'JWT_SECRET_KEY']
for var in required_vars:
    if not os.environ.get(var):
        raise EnvironmentError(f"Variável de ambiente {var} não definida")

def create_app():
    app = Flask(__name__)

    # Configuração do banco
    db_user = os.environ['DB_USER']
    db_pass = quote_plus(os.environ['DB_PASS'])
    db_host = os.environ['DB_HOST']
    db_port = os.environ['DB_PORT']
    db_name = os.environ['DB_NAME']
    if not all([db_user, db_pass, db_host, db_port, db_name]):
        raise EnvironmentError("Configurações do banco de dados incompletas")
    truenas_url = os.environ.get('TRUENAS_BASE_URL')
    truenas_key = os.environ.get('TRUENAS_API_KEY')
    if not truenas_url or not truenas_key:
        raise EnvironmentError("Variáveis de ambiente TRUENAS_BASE_URL e TRUENAS_API_KEY não definidas")
    
    app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # JWT
    app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 900  # 15 minutos

    # Inicializa extensões
    bcrypt.init_app(app)
    jwt.init_app(app)
    db.init_app(app)

    # CORS seguro
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Rotas
    from app.routes.routes import init_app
    init_app(app)

    return app