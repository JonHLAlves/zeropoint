# app/extensions/__init__.py
# Importe db (e outras extensões) de app.extensions.extensions
from .extensions import db, bcrypt, jwt # Ajuste os nomes conforme definidos em extensions.py

# Opcional, mas recomendado: declare o que faz parte da interface pública
__all__ = ['db', 'bcrypt', 'jwt']