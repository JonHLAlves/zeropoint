# app/models/PessoasJuridicas.py
from app.extensions.extensions import db

class PessoaJuridica(db.Model):
    __tablename__ = 'pessoas_juridicas'

    id = db.Column(db.Integer, primary_key=True)
    pessoas_id = db.Column(db.Integer, db.ForeignKey('pessoas.id'), nullable=False)
    cnpj = db.Column(db.String(18), unique=True, nullable=False)
    inscricao_estadual = db.Column(db.String(20))
    nome_responsavel = db.Column(db.String(255))

    # Relacionamento - Aponta para classe 'Pessoa' (singular) e 'back_populates' para 'juridicas' (atributo em Pessoa)
    pessoa = db.relationship("Pessoa", back_populates="juridicas")

    def __init__(self, pessoas_id: int, cnpj: str, inscricao_estadual: str = '', nome_responsavel: str = '') -> None:
        self.pessoas_id = pessoas_id
        self.cnpj = cnpj
        self.inscricao_estadual = inscricao_estadual
        self.nome_responsavel = nome_responsavel