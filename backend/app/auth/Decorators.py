# app/auth/decorators.py
from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()  # Garante que o token é válido
            claims = get_jwt()
            if claims.get("papeis_id") != "3": # Verifica se a função é de administrador
                return jsonify({'error': 'Acesso restrito a administradores'}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper