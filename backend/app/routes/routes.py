# app/routes.py
from flask import Blueprint
from app.controllers.AuthController import AuthController
from app.controllers.UsuarioController import UsuarioController
from app.routes.monitoring import bp_monitoramento 

bp = Blueprint('api', __name__, url_prefix='/api/v1')

# Rotas públicas
bp.route('/login', methods=['POST'])(AuthController.login)

# Rotas protegidas
bp.route('/usuarios', methods=['GET'])(UsuarioController.listar)
bp.route('/usuarios', methods=['POST'])(UsuarioController.criar)

def init_app(app):
    app.register_blueprint(bp)
    app.register_blueprint(bp_monitoramento)