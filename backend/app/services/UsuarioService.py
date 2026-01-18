from app.extensions.extensions import db, bcrypt
from app.models.Pessoas import Pessoa
from app.models.PessoasFisicas import PessoaFisica
from app.models.PessoasJuridicas import PessoaJuridica
from app.models.Usuarios import ZeropointUsuario

class UsuarioService:
    @staticmethod
    def criar_usuario(dados):
        # 1. Criar Pessoa
        pessoa = Pessoa(
            tipo_pessoa=dados['tipo_pessoa'],
            nome=dados['nome'],
            nome_fantasia=dados.get('nome_fantasia'),
            telefone=dados.get('telefone'),
            email=dados['email']
        )
        db.session.add(pessoa)
        db.session.flush()  # Para obter o ID sem commitar
        detail_pessoa = None
        # 2. Criar Pessoa Física/Jurídica
        if dados['tipo_pessoa'] == 'F':
            detail_pessoa = PessoaFisica(
                pessoas_id=pessoa.id,
                cpf=dados['cpf'],
                rg=dados.get('rg'),
                data_nascimento=dados.get('data_nascimento'),
                sexo=dados.get('sexo')
            )
        elif dados['tipo_pessoa'] == 'J':
            detail_pessoa = PessoaJuridica(
                pessoas_id=pessoa.id,
                cnpj=dados['cnpj'],
                inscricao_estadual=dados.get('inscricao_estadual'),
                nome_responsavel=dados.get('nome_responsavel')
            )
        db.session.add(detail_pessoa)

        # 3. Criar Usuário
        usuario = ZeropointUsuario(
            email=dados['email'],
            password_hash=bcrypt.generate_password_hash(dados['password']).decode('utf-8'),
            pessoas_id=pessoa.id,
            papeis_id=dados.get('papeis_id')
        )
        db.session.add(usuario)
        db.session.commit()

        return usuario

    @staticmethod
    def buscar_todos():
        return ZeropointUsuario.query.all()