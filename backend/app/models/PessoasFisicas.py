# app/models/PessoasFisicas.py
from app.extensions.extensions import db

class PessoaFisica(db.Model):
    __tablename__ = 'pessoas_fisicas'

    id = db.Column(db.Integer, primary_key=True)
    pessoas_id = db.Column(db.Integer, db.ForeignKey('pessoas.id'), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    rg = db.Column(db.String(20))
    data_nascimento = db.Column(db.Date)
    sexo = db.Column(db.CHAR(1))

    __table_args__ = (
        db.CheckConstraint("sexo IN ('M', 'F', 'O')", name='pessoa_fisica_sexo_check'),
    )

    # Relacionamento - Aponta para classe 'Pessoa' (singular) e 'back_populates' para 'fisicas' (atributo em Pessoa)
    pessoa = db.relationship("Pessoa", back_populates="fisicas")

    def __init__(self, pessoas_id: int, cpf: str, rg: str = '', data_nascimento: str = '', sexo: str = '') -> None:
        self.pessoas_id = pessoas_id
        self.cpf = cpf
        self.rg = rg
        self.data_nascimento = data_nascimento
        self.sexo = sexo