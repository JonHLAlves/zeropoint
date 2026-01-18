# app/services/TrueNASService.py
import requests
from typing import Dict, List, Any, Optional

class TrueNASService:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }

    def _make_request(self, method: str, endpoint: str, **kwargs) -> Optional[Dict[Any, Any]]:
        """Função auxiliar para fazer requisições à API."""
        url = f"{self.base_url}{endpoint}"
        try:
            response = requests.request(method, url, headers=self.headers, **kwargs)
            response.raise_for_status() # Levanta exceções para códigos de erro HTTP
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Erro na requisição para {url}: {e}")
            return None # Ou lance uma exceção personalizada

    def get_apps_status(self) -> Optional[List[Dict[str, Any]]]:
        """Obtém o status de todos os apps (containers) instalados."""
        # Endpoint para consultar apps
        # A documentação indica /app/query como um possível ponto de partida
        # O status real pode estar em um subcampo como 'state' ou 'status'
        # Exemplo de endpoint: GET /api/v2.0/chart/release
        # Endpoint mais comum no SCALE parece ser /app (listar apps)
        # Vamos tentar /app/query primeiro, baseado em padrões e na doc parcial
        # Endpoint real: GET /api/v2.0/app
        endpoint = "/api/v2.0/app" # Este é o endpoint para listar apps no SCALE
        data = self._make_request('GET', endpoint)
        if data:
            # Formatar os dados para o frontend
            formatted_apps = []
            for app in data:
                # Ajuste os nomes dos campos conforme a estrutura real retornada
                # Exemplo de estrutura retornada (hipotética, verifique a resposta real):
                # { "name": "plex", "state": "RUNNING", "id": "plex-123", ... }
                formatted_apps.append({
                    "name": app.get("name", "Unknown"), # Nome do App
                    "status": app.get("state", "UNKNOWN").lower(), # Status (running, stopped, etc.)
                    "id": app.get("id", ""), # ID do App (opcional)
                    # Adicione mais campos conforme necessário
                })
            return formatted_apps
        return None

    def get_system_info(self) -> Optional[Dict[str, Any]]:
        """Obtém informações básicas do sistema (ex: CPU, Memória)."""
        # Endpoint para informações gerais do sistema
        # Ex: /api/v2.0/system/info ou /api/v2.0/reporting/get_data
        # Vamos tentar /system/info primeiro
        endpoint = "/api/v2.0/system/info"
        return self._make_request('GET', endpoint)

    def get_pools_info(self) -> Optional[List[Dict[str, Any]]]:
        """Obtém informações sobre os pools de armazenamento."""
        # Endpoint para pools
        endpoint = "/api/v2.0/pool"
        data = self._make_request('GET', endpoint)
        if data:
            formatted_pools = []
            for pool in data:
                # Exemplo de estrutura (verifique a realidade):
                # { "name": "MainPool", "healthy": True, "size": {...}, "usage": {...} }
                formatted_pools.append({
                    "name": pool.get("name", "Unknown"),
                    "status": "online" if pool.get("healthy", False) else "offline", # Simplificação
                    "used_percent": pool.get("usage", {}).get("used_pct", 0), # Ajuste conforme estrutura real
                })
            return formatted_pools
        return None
