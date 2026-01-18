from app.models.Usuarios import ZeropointUsuario
from app.extensions.extensions import bcrypt, db

class AuthService:
    @staticmethod
    def authenticate(email, password):
        usuario = ZeropointUsuario.query.filter_by(email=email, ativo=True).first()
        if usuario and bcrypt.check_password_hash(usuario.password_hash, password):
            return usuario
        return None