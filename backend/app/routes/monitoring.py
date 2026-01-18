# app/routes/monitoramento.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
import os
from app.services.TruenasService import TrueNASService

bp_monitoramento = Blueprint('monitoramento', __name__, url_prefix='/api/v1/monitoramento')

# Inicializa o serviço com credenciais do ambiente
truenas_service = TrueNASService(
    base_url=os.getenv('TRUENAS_BASE_URL', ''),
    api_key=os.getenv('TRUENAS_API_KEY', '')
)

@bp_monitoramento.route('/truenas/apps', methods=['GET'])
@jwt_required()
def get_truenas_apps():
    """Rota protegida para obter status dos apps do TrueNAS."""
    try:
        apps_status = truenas_service.get_apps_status()
        if apps_status is not None:
            return jsonify(apps_status), 200
        else:
            return jsonify({"error": "Falha ao obter status dos apps do TrueNAS."}), 500
    except Exception as e:
        print(f"Erro no controller de apps: {e}") # Log do erro
        return jsonify({"error": "Erro interno ao buscar dados do TrueNAS."}), 500

@bp_monitoramento.route('/truenas/system', methods=['GET'])
@jwt_required()
def get_truenas_system():
    """Rota protegida para obter info do sistema do TrueNAS."""
    try:
        sys_info = truenas_service.get_system_info()
        if sys_info is not None:
            return jsonify(sys_info), 200
        else:
            return jsonify({"error": "Falha ao obter info do sistema do TrueNAS."}), 500
    except Exception as e:
        print(f"Erro no controller de sistema: {e}")
        return jsonify({"error": "Erro interno ao buscar dados do TrueNAS."}), 500

@bp_monitoramento.route('/truenas/pools', methods=['GET'])
@jwt_required()
def get_truenas_pools():
    """Rota protegida para obter info dos pools do TrueNAS."""
    try:
        pools_info = truenas_service.get_pools_info()
        if pools_info is not None:
            return jsonify(pools_info), 200
        else:
            return jsonify({"error": "Falha ao obter info dos pools do TrueNAS."}), 500
    except Exception as e:
        print(f"Erro no controller de pools: {e}")
        return jsonify({"error": "Erro interno ao buscar dados do TrueNAS."}), 500
