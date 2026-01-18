from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app.auth.Decorators import admin_required
from app.services.UsuarioService import UsuarioService
from app.extensions.extensions import bcrypt
from app.models.Usuarios import ZeropointUsuario

class UsuarioController:
    @staticmethod
    @jwt_required()
    @admin_required()
    def listar():
        current_user = get_jwt_identity()
        usuarios = UsuarioService.buscar_todos()
        return jsonify([u.to_dict() for u in usuarios]), 200

    @staticmethod
    # @admin_required()
    def criar():
        dados = request.get_json()
        usuario = UsuarioService.criar_usuario(dados)
        return jsonify(usuario.to_dict()), 201