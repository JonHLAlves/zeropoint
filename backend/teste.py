import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Lê as variáveis
db_user = os.environ['DB_USER']
db_pass = os.environ['DB_PASS']  # Lê exatamente como está no .env
db_host = os.environ['DB_HOST']
db_port = os.environ['DB_PORT']
db_name = os.environ['DB_NAME']

print(f"Tentando conectar com:")
print(f"  Host: {db_host}")
print(f"  Port: {db_port}")
print(f"  User: {db_user}")
print(f"  Pass Length: {len(db_pass)}")
print(f"  Pass: {db_pass}")

try:
    conn = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=db_pass
    )
    print("\n✅ Conexão bem-sucedida com psycopg2!")
    conn.close()
except Exception as e:
    print(f"\n❌ Erro de conexão com psycopg2: {e}")