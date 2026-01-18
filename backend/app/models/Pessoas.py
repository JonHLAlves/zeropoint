# app/models/Pessoas.py
from app.extensions.extensions import db

class Pessoa(db.Model):
    __tablename__ = 'pessoas'

    id = db.Column(db.Integer, primary_key=True)
    tipo_pessoa = db.Column(db.CHAR(1), nullable=False)
    nome = db.Column(db.String(255), nullable=False)
    nome_fantasia = db.Column(db.String(255))
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(255))

    __table_args__ = (
        db.CheckConstraint("tipo_pessoa IN ('F', 'J')", name='pessoas_tipo_pessoa_check'),
    )

    # Relacionamentos - NOME DAS CLASSES NO SINGULAR NAS STRINGS!
    fisicas = db.relationship("PessoaFisica", back_populates="pessoa", uselist=False)
    juridicas = db.relationship("PessoaJuridica", back_populates="pessoa", uselist=False)
    usuarios = db.relationship("ZeropointUsuario", back_populates="pessoa")

    def __init__(self, tipo_pessoa: str, nome: str, nome_fantasia: str = '', telefone: str = '', email: str = '') -> None:
        self.tipo_pessoa = tipo_pessoa
        self.nome = nome
        self.nome_fantasia = nome_fantasia
        self.telefone = telefone
        self.email = email