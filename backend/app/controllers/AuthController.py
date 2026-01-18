# app/controllers/auth_controller.py
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from app.services.AuthService import AuthService

class AuthController:
    @staticmethod
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400

        usuario = AuthService.authenticate(email, password)
        if not usuario:
            return jsonify({'error': 'Credenciais inválidas'}), 401

        # ← Inclui a função nas claims do token
        access_token = create_access_token(
            identity=usuario.email,
            additional_claims={"funcao": usuario.papeis_id}
        )

        return jsonify({
            'access_token': access_token,
            'usuario': {
                'id': usuario.id,
                'email': usuario.email,
                'funcao': usuario.papeis_id
            }
        }), 200