# app/models/Usuarios.py
from app.extensions.extensions import db
from datetime import datetime
from typing import Optional

class ZeropointUsuario(db.Model):
    __tablename__ = 'zeropoint_usuarios'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)
    pessoas_id = db.Column(db.Integer, db.ForeignKey('pessoas.id'), nullable=False)
    ativo = db.Column(db.Boolean, default=True)
    papeis_id = db.Column(db.Integer, db.ForeignKey('papeis.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime)

    # REMOVA QUALQUER LINHA DE CONSTRAINT ANTIGA AQUI
    # __table_args__ = (...)

    # Relacionamento - Aponta para classe 'Pessoa' (singular) e 'back_populates' para 'usuarios' (atributo em Pessoa)
    pessoa = db.relationship("Pessoa", back_populates="usuarios") # <--- 'usuarios' é o nome do attr em Pessoa

    # Relacionamento para Papel (singular)
    papel = db.relationship("Papel", back_populates="usuarios") # <--- 'usuarios' é o nome do attr em Papel

    def __init__(self, email: str, password_hash: str, pessoas_id: int, papeis_id: int, ativo: bool = True, created_at: datetime = datetime.now(), updated_at: Optional[datetime] = None, deleted_at: Optional[datetime] = None) -> None:
        self.email = email
        self.password_hash = password_hash
        self.pessoas_id = pessoas_id
        self.papeis_id = papeis_id
        self.ativo = ativo
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'papeis_id': self.papeis_id,
            'ativo': self.ativo,
            'pessoas_id': self.pessoas_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }