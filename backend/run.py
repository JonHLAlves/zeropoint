from app import create_app, db

app = create_app()

with app.app_context():
    from app.models.Pessoas import Pessoa
    from app.models.PessoasFisicas import PessoaFisica
    from app.models.PessoasJuridicas import PessoaJuridica
    from app.models.Usuarios import ZeropointUsuario
    from app.models.Papeis import Papel
    db.create_all()

if __name__ == "__main__":
    import os
    host = os.environ.get('FLASK_RUN_HOST', '127.0.0.1')  # Padrão: localhost
    port = int(os.environ.get('FLASK_RUN_PORT', 5000))    # Padrão: 5000
    app.run(debug=True, host=host, port=port)