# app/models/Papeis.py
from app.extensions.extensions import db

class Papel(db.Model):
    __tablename__ = 'papeis'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), unique=True, nullable=False)
    descricao = db.Column(db.Text)

    # Relacionamento inverso - Aponta para classe 'ZeropointUsuario' (singular) e 'back_populates' para 'papel' (atributo em Usuario)
    usuarios = db.relationship("ZeropointUsuario", back_populates="papel") # <--- 'papel' é o nome do attr em Usuario