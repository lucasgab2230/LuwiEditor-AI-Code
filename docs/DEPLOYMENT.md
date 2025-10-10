# 🚀 Guia de Deploy do Video AI Editor

<div align="center">
  <img src="https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code/raw/main/assets/deploy-logo.png" alt="Deploy Logo" width="200">
  
  [![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
  [![Kubernetes](https://img.shields.io/badge/Kubernetes-Supported-green.svg)](https://kubernetes.io/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)
  [![AWS](https://img.shields.io/badge/AWS-Cloud-orange.svg)](https://aws.amazon.com/)
</div>

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy Local](#deploy-local)
- [Deploy com Docker](#deploy-com-docker)
- [Deploy na Vercel](#deploy-na-vercel)
- [Deploy em Produção](#deploy-em-produção)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

## 🌐 Visão Geral

Este guia cobre diferentes estratégias de deploy para o Video AI Editor, desde desenvolvimento local até produção em escala. A aplicação é composta por:

- **Frontend**: Aplicação React com PWA
- **Backend**: API Django com microsserviços Flask
- **AI Services**: Serviços de processamento de IA
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis
- **Armazenamento**: AWS S3 ou similar

### Arquitetura de Deploy

```mermaid
graph TB
    A[Usuário] --> B[CDN/Load Balancer]
    B --> C[Frontend Vercel]
    B --> D[API Gateway]
    D --> E[Backend Kubernetes]
    E --> F[PostgreSQL]
    E --> G[Redis]
    E --> H[AI Services]
    H --> I[GPU Nodes]
    E --> J[File Storage]
```

## ✅ Pré-requisitos

### Sistema Operacional
- **Linux**: Ubuntu 20.04+ ou CentOS 8+
- **macOS**: 11.0+ (Big Sur)
- **Windows**: 10+ com WSL2

### Software Necessário

| Ferramenta | Versão Mínima | Instalação |
|------------|----------------|------------|
| **Node.js** | 18.x | [nvm](https://github.com/nvm-sh/nvm) ou [site oficial](https://nodejs.org/) |
| **Python** | 3.11+ | [pyenv](https://github.com/pyenv/pyenv) ou [site oficial](https://www.python.org/) |
| **Docker** | 20.10+ | [Docker Desktop](https://www.docker.com/products/docker-desktop) |
| **Git** | 2.30+ | [Git SCM](https://git-scm.com/) |
| **PostgreSQL** | 13+ | [PostgreSQL.org](https://www.postgresql.org/download/) |
| **Redis** | 6.0+ | [Redis.io](https://redis.io/download) |

### Hardware Recomendado

| Ambiente | CPU | RAM | Armazenamento | GPU |
|----------|-----|-----|---------------|-----|
| **Desenvolvimento** | 4 cores | 8GB | 50GB SSD | Opcional |
| **Staging** | 8 cores | 16GB | 100GB SSD | Recomendado |
| **Produção** | 16+ cores | 32GB+ | 500GB+ SSD | Obrigatório |

## 🔧 Variáveis de Ambiente

### Frontend (.env)

```bash
# Configurações da API
REACT_APP_API_URL=https://api.video-ai-editor.com
REACT_APP_WS_URL=wss://api.video-ai-editor.com/ws

# Configurações de Autenticação
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Configurações de Features
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_ENABLE_ANALYTICS=false

# Configurações de Deploy
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
```

### Backend (.env)

```bash
# Configurações do Django
DEBUG=false
SECRET_KEY=your-super-secret-key-here
ALLOWED_HOSTS=api.video-ai-editor.com,localhost,127.0.0.1

# Configurações do Banco de Dados
DATABASE_URL=postgresql://username:password@localhost:5432/video_ai_editor
DB_NAME=video_ai_editor
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432

# Configurações do Redis
REDIS_URL=redis://localhost:6379/0
CACHE_TTL=3600

# Configurações de IA
HUGGINGFACE_API_KEY=your-huggingface-key
OPENAI_API_KEY=your-openai-key
AI_MODEL_PATH=/app/models

# Configurações de Armazenamento
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=video-ai-editor-storage
AWS_S3_REGION=us-east-1

# Configurações de Segurança
CORS_ALLOWED_ORIGINS=https://video-ai-editor.com,https://app.video-ai-editor.com
SECURE_SSL_REDIRECT=true
SECURE_HSTS_SECONDS=31536000

# Configurações de Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@video-ai-editor.com

# Configurações de Monitoramento
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=INFO
```

### Docker Compose (.env)

```bash
# Configurações do Projeto
COMPOSE_PROJECT_NAME=video-ai-editor
COMPOSE_FILE=docker-compose.yml:docker-compose.prod.yml

# Versões das Imagens
NODE_VERSION=18-alpine
PYTHON_VERSION=3.11-slim
POSTGRES_VERSION=15-alpine
REDIS_VERSION=7-alpine

# Configurações de Rede
NETWORK_NAME=video-ai-editor-network
```

## 🏠 Deploy Local

### 1. Clone o Repositório

```bash
git clone https://github.com/video-ai-editor/video-ai-editor.git
cd video-ai-editor
```

### 2. Configure o Ambiente

```bash
# Copie arquivos de exemplo
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Edite os arquivos com suas configurações
nano frontend/.env
nano backend/.env
```

### 3. Instale Dependências do Backend

```bash
cd backend

# Crie ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/macOS
# ou
venv\Scripts\activate     # Windows

# Instale dependências
pip install -r requirements.txt

# Aplique migrações
python manage.py migrate

# Crie superusuário
python manage.py createsuperuser
```

### 4. Instale Dependências do Frontend

```bash
cd ../frontend

# Instale dependências
npm install

# Construa para produção
npm run build
```

### 5. Inicie os Serviços

```bash
# Terminal 1 - Backend
cd backend
python manage.py runserver 0.0.0.0:8000

# Terminal 2 - Frontend (desenvolvimento)
cd frontend
npm start

# Terminal 3 - Worker (opcional)
cd backend
celery -A backend worker -l info
```

### 6. Acesse a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin**: http://localhost:8000/admin

## 🐳 Deploy com Docker

### 1. Dockerfile do Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copie package files
COPY package*.json ./

# Instale dependências
RUN npm ci --only=production

# Copie código fonte
COPY . .

# Construa aplicação
RUN npm run build

# Imagem de produção
FROM nginx:alpine

# Copie build para nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copie configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

### 2. Dockerfile do Backend

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

# Configure ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instale dependências do sistema
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
        ffmpeg \
        libsm6 \
        libxext6 \
        libxrender-dev \
        libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Crie diretório da aplicação
WORKDIR /app

# Copie requirements
COPY requirements.txt .

# Instale dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie código
COPY . .

# Crie usuário não-root
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

# Exponha porta
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health/ || exit 1

# Comando de inicialização
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
```

### 3. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Banco de Dados
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: video_ai_editor
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/video_ai_editor
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - ./backend:/app
      - media_files:/app/media
      - static_files:/app/static
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health/"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Worker
  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: celery -A backend worker -l info
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/video_ai_editor
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - ./backend:/app
      - media_files:/app/media
    depends_on:
      - db
      - redis
      - backend

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3

volumes:
  postgres_data:
  redis_data:
  media_files:
  static_files:

networks:
  default:
    name: video-ai-editor-network
```

### 4. Docker Compose de Produção

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - static_files:/var/www/static
      - media_files:/var/www/media
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

  # Backend (modificado para produção)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      - DEBUG=false
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/video_ai_editor
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - media_files:/app/media
      - static_files:/app/static
    restart: unless-stopped
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # Worker com suporte a GPU
  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile.gpu
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/video_ai_editor
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - media_files:/app/media
      - ./models:/app/models
    deploy:
      replicas: 2
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped
```

### 5. Comandos de Deploy

```bash
# Construa imagens
docker-compose build

# Inicie serviços
docker-compose up -d

# Verifique logs
docker-compose logs -f

# Escale serviços
docker-compose up -d --scale backend=3 --scale worker=2

# Atualize serviços
docker-compose pull
docker-compose up -d
```

## 🌐 Deploy na Vercel

### 1. Configure o Projeto

```bash
# Instale Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Configure projeto
cd frontend
vercel
```

### 2. vercel.json

```json
{
  "version": 2,
  "name": "luwieditorai",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "@api_url",
    "REACT_APP_WS_URL": "@ws_url",
    "REACT_APP_SUPABASE_URL": "@supabase_url",
    "REACT_APP_SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "build": {
    "env": {
      "GENERATE_SOURCEMAP": "false"
    }
  },
  "functions": {},
  "regions": ["iad1"],
  "framework": "create-react-app"
}
```

### 3. Deploy Automático

```bash
# Deploy para produção
vercel --prod

# Deploy para preview
vercel

# Alias personalizado
vercel --prod --alias video-ai-editor.vercel.app
```

### 4. Integração com GitHub

1. Conecte repositório ao Vercel
2. Configure variáveis de ambiente
3. Configure domínio personalizado
4. Habilite deploy automático

## 🏭 Deploy em Produção

### 1. Kubernetes - Namespace

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: video-ai-editor
  labels:
    name: video-ai-editor
```

### 2. Kubernetes - ConfigMap

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: video-ai-editor-config
  namespace: video-ai-editor
data:
  API_URL: "https://api.video-ai-editor.com"
  WS_URL: "wss://api.video-ai-editor.com/ws"
  LOG_LEVEL: "INFO"
  REDIS_URL: "redis://redis-service:6379/0"
```

### 3. Kubernetes - Secret

```yaml
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: video-ai-editor-secrets
  namespace: video-ai-editor
type: Opaque
data:
  DATABASE_URL: <base64-encoded-database-url>
  SECRET_KEY: <base64-encoded-secret-key>
  AWS_ACCESS_KEY_ID: <base64-encoded-aws-key>
  AWS_SECRET_ACCESS_KEY: <base64-encoded-aws-secret>
```

### 4. Kubernetes - Backend Deployment

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
  namespace: video-ai-editor
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: video-ai-editor/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: video-ai-editor-secrets
              key: DATABASE_URL
        - name: SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: video-ai-editor-secrets
              key: SECRET_KEY
        envFrom:
        - configMapRef:
            name: video-ai-editor-config
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health/
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 5. Kubernetes - Service

```yaml
# k8s/backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: video-ai-editor
spec:
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: ClusterIP
```

### 6. Kubernetes - Ingress

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: video-ai-editor-ingress
  namespace: video-ai-editor
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "100m"
spec:
  tls:
  - hosts:
    - video-ai-editor.com
    - api.video-ai-editor.com
    secretName: video-ai-editor-tls
  rules:
  - host: video-ai-editor.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
  - host: api.video-ai-editor.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80
```

### 7. Scripts de Deploy

```bash
#!/bin/bash
# scripts/deploy.sh

set -e

echo "🚀 Iniciando deploy do Video AI Editor..."

# Variáveis
NAMESPACE="video-ai-editor"
DOCKER_REGISTRY="your-registry.com"
VERSION=${1:-latest}

# Build e push das imagens
echo "📦 Build das imagens Docker..."
docker build -t $DOCKER_REGISTRY/backend:$VERSION ./backend
docker build -t $DOCKER_REGISTRY/frontend:$VERSION ./frontend

echo "📤 Push das imagens..."
docker push $DOCKER_REGISTRY/backend:$VERSION
docker push $DOCKER_REGISTRY/frontend:$VERSION

# Aplica configurações Kubernetes
echo "☸️ Aplicando configurações Kubernetes..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

# Aguarda deploy
echo "⏳ Aguardando deploy..."
kubectl rollout status deployment/backend-deployment -n $NAMESPACE
kubectl rollout status deployment/frontend-deployment -n $NAMESPACE

# Verificação
echo "✅ Deploy concluído com sucesso!"
echo "🌐 Frontend: https://luwieditorai.xyz"
echo "🔌 API: https://api.luwieditorai.xyz/v1"
```

## 📊 Monitoramento

### 1. Prometheus - Configuração

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'video-ai-editor-backend'
    static_configs:
      - targets: ['backend-service:80']
    metrics_path: /metrics
    scrape_interval: 30s

  - job_name: 'video-ai-editor-frontend'
    static_configs:
      - targets: ['frontend-service:80']
    metrics_path: /metrics
    scrape_interval: 30s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

### 2. Grafana - Dashboard

```json
{
  "dashboard": {
    "title": "Video AI Editor Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{status}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
            "legendFormat": "Error Rate"
          }
        ]
      }
    ]
  }
}
```

### 3. Health Checks

```python
# backend/health_checks.py
from django.http import JsonResponse
from django.db import connection
from django.core.cache import cache
import redis
import psutil

def health_check(request):
    """Health check completo"""
    checks = {
        'database': check_database(),
        'cache': check_cache(),
        'redis': check_redis(),
        'disk_space': check_disk_space(),
        'memory': check_memory()
    }
    
    all_healthy = all(check['status'] == 'healthy' for check in checks.values())
    
    status_code = 200 if all_healthy else 503
    
    return JsonResponse({
        'status': 'healthy' if all_healthy else 'unhealthy',
        'checks': checks,
        'timestamp': timezone.now().isoformat()
    }, status=status_code)

def check_database():
    """Verifica conexão com banco de dados"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        return {'status': 'healthy', 'message': 'Database connection OK'}
    except Exception as e:
        return {'status': 'unhealthy', 'message': str(e)}

def check_cache():
    """Verifica cache"""
    try:
        cache.set('health_check', 'ok', 10)
        cache.get('health_check')
        return {'status': 'healthy', 'message': 'Cache OK'}
    except Exception as e:
        return {'status': 'unhealthy', 'message': str(e)}

def check_redis():
    """Verifica Redis"""
    try:
        r = redis.Redis(host='redis', port=6379, db=0)
        r.ping()
        return {'status': 'healthy', 'message': 'Redis OK'}
    except Exception as e:
        return {'status': 'unhealthy', 'message': str(e)}

def check_disk_space():
    """Verifica espaço em disco"""
    disk_usage = psutil.disk_usage('/')
    free_percent = (disk_usage.free / disk_usage.total) * 100
    
    if free_percent < 10:
        return {'status': 'unhealthy', 'message': f'Low disk space: {free_percent:.1f}%'}
    
    return {'status': 'healthy', 'message': f'Disk space OK: {free_percent:.1f}% free'}

def check_memory():
    """Verifica uso de memória"""
    memory = psutil.virtual_memory()
    used_percent = memory.percent
    
    if used_percent > 90:
        return {'status': 'unhealthy', 'message': f'High memory usage: {used_percent:.1f}%'}
    
    return {'status': 'healthy', 'message': f'Memory OK: {used_percent:.1f}% used'}
```

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Frontend Não Carrega

**Sintomas:**
- Página em branco
- Erro 404
- Recursos não encontrados

**Soluções:**
```bash
# Verifique build
cd frontend
npm run build

# Verifique configuração do nginx
cat nginx.conf

# Verifique logs
docker-compose logs frontend
```

#### 2. Backend Não Responde

**Sintomas:**
- Timeout na API
- Erro 502 Bad Gateway
- Serviço não inicia

**Soluções:**
```bash
# Verifique variáveis de ambiente
docker-compose exec backend env | grep DATABASE_URL

# Verifique conexão com banco
docker-compose exec backend python manage.py dbshell

# Verifique logs
docker-compose logs backend
```

#### 3. IA Services Não Funcionam

**Sintomas:**
- Tarefas de IA falham
- Erro de GPU não encontrada
- Processamento lento

**Soluções:**
```bash
# Verifique drivers NVIDIA
nvidia-smi

# Verifique Docker com GPU
docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi

# Verifique logs do worker
docker-compose logs worker
```

#### 4. Problemas de Performance

**Sintomas:**
- Respostas lentas
- Alto uso de CPU
- Memory leaks

**Soluções:**
```bash
# Monitore recursos
docker stats

# Verifique queries lentas
docker-compose exec db psql -U postgres -d video_ai_editor -c "
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;"

# Perfil de código
docker-compose exec backend python -m cProfile -o profile.stats manage.py runserver
```

### Scripts de Diagnóstico

```bash
#!/bin/bash
# scripts/diagnose.sh

echo "🔍 Diagnóstico do Video AI Editor..."

# Verifica containers
echo "📦 Status dos containers:"
docker-compose ps

# Verifica recursos
echo "💻 Uso de recursos:"
docker stats --no-stream

# Verifica logs de erro
echo "📝 Logs de erro recentes:"
docker-compose logs --tail=50 | grep -i error

# Verifica conectividade
echo "🌐 Teste de conectividade:"
curl -f http://localhost:8000/health/ || echo "Backend não responde"
curl -f http://localhost:3000 || echo "Frontend não responde"

# Verifica banco de dados
echo "🗄️ Status do banco de dados:"
docker-compose exec db pg_isready -U postgres

# Verifica Redis
echo "🔴 Status do Redis:"
docker-compose exec redis redis-cli ping

echo "✅ Diagnóstico concluído!"
```

### Backup e Restore

```bash
#!/bin/bash
# scripts/backup.sh

BACKUP_DIR="/backups/video-ai-editor"
DATE=$(date +%Y%m%d_%H%M%S)

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup do banco de dados
echo "📦 Fazendo backup do banco de dados..."
docker-compose exec db pg_dump -U postgres video_ai_editor > $BACKUP_DIR/db_backup_$DATE.sql

# Backup dos volumes
echo "📦 Fazendo backup dos volumes..."
docker run --rm -v video-ai-editor_media_files:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/media_backup_$DATE.tar.gz -C /data .
docker run --rm -v video-ai-editor_static_files:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/static_backup_$DATE.tar.gz -C /data .

# Limpeza de backups antigos
echo "🧹 Limpando backups antigos..."
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup concluído: $BACKUP_DIR"
```

### Checklist de Deploy

```markdown
## ✅ Pré-Deploy
- [ ] Backup do banco de dados
- [ ] Testes em ambiente de staging
- [ ] Verificação de variáveis de ambiente
- [ ] Build das imagens Docker
- [ ] Verificação de recursos disponíveis

## ✅ Durante o Deploy
- [ ] Monitoramento dos logs
- [ ] Verificação de health checks
- [ ] Teste de funcionalidades críticas
- [ ] Monitoramento de performance

## ✅ Pós-Deploy
- [ ] Verificação completa da aplicação
- [ ] Monitoramento por 24 horas
- [ ] Documentação de mudanças
- [ ] Comunicado aos usuários (se necessário)

```
**Commit Message:**

docs(deploy): add comprehensive deployment guide for multiple environments

- Add deployment instructions for local, Docker, Vercel, and Kubernetes
- Include detailed environment variable configuration
- Add Docker and Docker Compose configurations for production
- Include Kubernetes manifests with ingress, services, and deployments
- Add monitoring setup with Prometheus and Grafana
- Include troubleshooting guide and diagnostic scripts
- Add backup and restore procedures

This guide enables teams to deploy the Video AI Editor
reliably across different infrastructure setups.
```
