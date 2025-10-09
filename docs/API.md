# 📚 Video AI Editor API Documentation

<div align="center">
  <img src="https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code/raw/main/assets/api-logo.png" alt="API Logo" width="200">
  
  [![API Version](https://img.shields.io/badge/API-v2.0.0-blue.svg)](https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code)
  [![Authentication](https://img.shields.io/badge/Auth-JWT-green.svg)](https://jwt.io/)
  [![Format](https://img.shields.io/badge/Format-JSON-orange.svg)](https://www.json.org/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Endpoints de Vídeo](#endpoints-de-vídeo)
- [Endpoints de IA](#endpoints-de-ia)
- [WebSocket](#websocket)
- [Tratamento de Erros](#tratamento-de-erros)
- [Rate Limiting](#rate-limiting)
- [SDKs](#sdks)
- [Exemplos de Código](#exemplos-de-código)

## 🌐 Visão Geral

A API do Video AI Editor permite que desenvolvedores integrem funcionalidades de edição de vídeo com IA em suas aplicações. Nossa API é RESTful, usa JSON para comunicação e implementa autenticação JWT para segurança.

### Informações Básicas

| Item | Detalhes |
|------|----------|
| **URL Base** | `https://api.luwieditorai.xyz/v1` |
| **Formato** | JSON |
| **Autenticação** | JWT Bearer Token |
| **HTTPS** | Obrigatório |
| **CORS** | Configurado para domínios autorizados |

## 🔐 Autenticação

A API usa tokens JWT (JSON Web Tokens) para autenticação. Você precisa incluir o token em todas as requisições protegidas.

### Obtenção de Token

#### Endpoint de Login

```http
POST /auth/login
```

**Corpo da Requisição:**

```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "username": "username",
      "plan": "pro"
    }
  }
}
```

**Resposta de Erro (401 Unauthorized):**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email ou senha inválidos",
    "details": {}
  }
}
```

#### Uso do Token

Inclua o token no cabeçalho Authorization:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Refresh Token

```http
POST /auth/refresh
```

**Corpo da Requisição:**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🎥 Endpoints de Vídeo

### Listar Vídeos

```http
GET /videos
```

**Parâmetros de Query:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `page` | integer | Não | Número da página (padrão: 1) |
| `limit` | integer | Não | Itens por página (padrão: 20, máximo: 100) |
| `sort` | string | Não | Campo de ordenação (created_at, title, duration) |
| `order` | string | Não | Direção da ordenação (asc, desc) |
| `search` | string | Não | Termo de busca |

**Exemplo de Requisição:**

```http
GET /videos?page=1&limit=10&sort=created_at&order=desc
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "videos": [
      {
        "id": "uuid-string",
        "title": "Meu Vídeo Editado",
        "description": "Descrição do vídeo",
        "duration": 120.5,
        "thumbnail_url": "https://cdn.luwieditorai.xyz/thumbnails/uuid.jpg",
        "created_at": "2025-10-10T15:30:00Z",
        "updated_at": "2025-10-10T16:00:00Z",
        "status": "processed",
        "metadata": {
          "resolution": "1920x1080",
          "fps": 30,
          "format": "mp4",
          "file_size": 52428800
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 87,
      "items_per_page": 20
    }
  }
}
```

### Obter Detalhes do Vídeo

```http
GET /videos/{video_id}
```

**Parâmetros de Path:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `video_id` | string | ID do vídeo |

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Meu Vídeo Editado",
    "description": "Descrição detalhada do vídeo",
    "duration": 120.5,
    "thumbnail_url": "https://cdn.luwieditorai.xyz/thumbnails/uuid.jpg",
    "video_url": "https://cdn.luwieditorai.xyz/videos/uuid.mp4",
    "created_at": "2025-10-10T15:00:00Z",
    "updated_at": "2025-10-10T15:05:00Z",
    "status": "processed",
    "metadata": {
      "resolution": "1920x1080",
      "fps": 30,
      "format": "mp4",
      "file_size": 52428800,
      "codec": "h264",
      "bitrate": 5000
    },
    "clips": [
      {
        "id": "clip-uuid-1",
        "start_time": 0.0,
        "end_time": 30.5,
        "effects": []
      },
      {
        "id": "clip-uuid-2",
        "start_time": 30.5,
        "end_time": 120.5,
        "effects": [
          {
            "type": "brightness",
            "intensity": 0.2,
            "start_time": 30.5,
            "end_time": 60.0
          }
        ]
      }
    ],
    "subtitles": [
      {
        "id": "subtitle-uuid-1",
        "language": "pt-BR",
        "format": "vtt",
        "url": "https://cdn.luwieditorai.xyz/subtitles/uuid.vtt"
      }
    ]
  }
}
```

### Upload de Vídeo

```http
POST /videos
```

**Corpo da Requisição (multipart/form-data):**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `video` | file | Sim | Arquivo de vídeo (mp4, mov, avi) |
| `title` | string | Sim | Título do vídeo |
| `description` | string | Não | Descrição do vídeo |
| `tags` | string | Não | Tags separadas por vírgula |

**Resposta de Sucesso (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Meu Vídeo",
    "description": "Descrição do vídeo",
    "status": "uploading",
    "upload_url": "https://upload.luwieditorai.xyz/signed-url",
    "expires_at": "2025-10-10T14:30:00Z"
  }
}
```

### Atualizar Vídeo

```http
PUT /videos/{video_id}
```

**Corpo da Requisição:**

```json
{
  "title": "Novo Título",
  "description": "Nova descrição",
  "tags": ["tag1", "tag2", "tag3"]
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Novo Título",
    "description": "Nova descrição",
    "updated_at": "2025-10-10T16:20:00Z"
  }
}
```

### Excluir Vídeo

```http
DELETE /videos/{video_id}
```

**Resposta de Sucesso (204 No Content):**

```http
HTTP/1.1 204 No Content
```

## 🤖 Endpoints de IA

### Detecção de Silêncio

```http
POST /ai/silence-detection
```

**Corpo da Requisição:**

```json
{
  "video_id": "uuid-string",
  "parameters": {
    "silence_threshold": -40,
    "min_silence_duration": 1.0,
    "padding": 0.2
  }
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "task_id": "task-uuid-string",
    "status": "processing",
    "estimated_time": 45
  }
}
```

### Obter Resultado da Tarefa de IA

```http
GET /ai/tasks/{task_id}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "task-uuid-string",
    "type": "silence_detection",
    "status": "completed",
    "progress": 100,
    "result": {
      "silence_segments": [
        {
          "start_time": 10.5,
          "end_time": 15.2,
          "confidence": 0.95
        },
        {
          "start_time": 45.8,
          "end_time": 52.1,
          "confidence": 0.92
        }
      ],
      "total_silence_duration": 10.9,
      "suggested_cuts": [
        {
          "start_time": 10.3,
          "end_time": 15.4,
          "reason": "Long silence segment"
        }
      ]
    },
    "created_at": "2025-10-10T13:30:00Z",
    "completed_at": "2025-10-10T13:31:15Z"
  }
}
```

### Geração de Legendas

```http
POST /ai/caption-generation
```

**Corpo da Requisição:**

```json
{
  "video_id": "uuid-string",
  "parameters": {
    "language": "pt-BR",
    "format": "vtt",
    "max_line_length": 42,
    "words_per_minute": 150
  }
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "task_id": "task-uuid-string",
    "status": "processing",
    "estimated_time": 120
  }
}
```

### Geração de Efeitos

```http
POST /ai/effect-generation
```

**Corpo da Requisição:**

```json
{
  "video_id": "uuid-string",
  "prompt": "adicionar um efeito de brilho dourado durante os primeiros 10 segundos",
  "parameters": {
    "start_time": 0.0,
    "end_time": 10.0,
    "intensity": 0.7,
    "style": "cinematic"
  }
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "task_id": "task-uuid-string",
    "status": "processing",
    "estimated_time": 180
  }
}
```

### Geração de Música

```http
POST /ai/music-generation
```

**Corpo da Requisição:**

```json
{
  "video_id": "uuid-string",
  "parameters": {
    "mood": "energetic",
    "genre": "electronic",
    "duration": 120.0,
    "tempo": 128,
    "instruments": ["synth", "drums", "bass"]
  }
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "task_id": "task-uuid-string",
    "status": "processing",
    "estimated_time": 300
  }
}
```

### Reframing de Vídeo

```http
POST /ai/reframe
```

**Corpo da Requisição:**

```json
{
  "video_id": "uuid-string",
  "target_aspect_ratio": "9:16",
  "parameters": {
    "focus_point": "center",
    "smooth_transition": true,
    "preserve_content": true
  }
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "task_id": "task-uuid-string",
    "status": "processing",
    "estimated_time": 240
  }
}
```

## 🔌 WebSocket

### Conexão

Para conectar ao WebSocket da API:

```javascript
const ws = new WebSocket('wss://api.luwieditorai.xyz/ws');
```

### Autenticação

Após conectar, envie uma mensagem de autenticação:

```json
{
  "type": "auth",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Eventos

#### Progresso de Processamento

**Recebido:**

```json
{
  "type": "progress",
  "data": {
    "task_id": "task-uuid-string",
    "progress": 45,
    "status": "processing",
    "message": "Analisando áudio do vídeo..."
  }
}
```

#### Conclusão de Tarefa

**Recebido:**

```json
{
  "type": "completed",
  "data": {
    "task_id": "task-uuid-string",
    "result": {
      // Resultado específico da tarefa
    }
  }
}
```

#### Erro

**Recebido:**

```json
{
  "type": "error",
  "data": {
    "task_id": "task-uuid-string",
    "error": {
      "code": "PROCESSING_ERROR",
      "message": "Erro durante o processamento do vídeo"
    }
  }
}
```

### Exemplo de Implementação

```javascript
class VideoAIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.ws = null;
    this.taskCallbacks = new Map();
  }
  
  connect() {
    this.ws = new WebSocket('wss://api.video-ai-editor.com/ws');
    
    this.ws.onopen = () => {
      this.authenticate();
    };
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };
  }
  
  authenticate() {
    this.ws.send(JSON.stringify({
      type: 'auth',
      token: this.apiKey
    }));
  }
  
  handleMessage(message) {
    const { type, data } = message;
    
    switch (type) {
      case 'progress':
        this.onProgress(data);
        break;
      case 'completed':
        this.onCompleted(data);
        break;
      case 'error':
        this.onError(data);
        break;
    }
  }
  
  onProgress(data) {
    const callback = this.taskCallbacks.get(data.task_id);
    if (callback && callback.onProgress) {
      callback.onProgress(data);
    }
  }
  
  onCompleted(data) {
    const callback = this.taskCallbacks.get(data.task_id);
    if (callback && callback.onCompleted) {
      callback.onCompleted(data);
    }
  }
  
  onError(data) {
    const callback = this.taskCallbacks.get(data.task_id);
    if (callback && callback.onError) {
      callback.onError(data);
    }
  }
  
  async generateCaptions(videoId, parameters, callbacks) {
    const response = await fetch('/ai/caption-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        video_id: videoId,
        parameters
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.taskCallbacks.set(result.data.task_id, callbacks);
    }
    
    return result;
  }
}
```

## ❌ Tratamento de Erros

A API usa códigos de status HTTP padrão e respostas JSON estruturadas para erros.

### Formato de Erro

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrição amigável do erro",
    "details": {
      "field": "additional_info"
    }
  }
}
```

### Códigos de Erro Comuns

| Código | Status HTTP | Descrição |
|--------|-------------|-----------|
| `INVALID_REQUEST` | 400 | Requisição inválida |
| `UNAUTHORIZED` | 401 | Não autenticado |
| `FORBIDDEN` | 403 | Sem permissão |
| `NOT_FOUND` | 404 | Recurso não encontrado |
| `RATE_LIMITED` | 429 | Limite de requisições excedido |
| `INTERNAL_ERROR` | 500 | Erro interno do servidor |
| `SERVICE_UNAVAILABLE` | 503 | Serviço indisponível |

### Exemplos de Erro

#### Vídeo Não Encontrado

```json
{
  "success": false,
  "error": {
    "code": "VIDEO_NOT_FOUND",
    "message": "O vídeo solicitado não foi encontrado",
    "details": {
      "video_id": "uuid-inexistente"
    }
  }
}
```

#### Limite de Taxa Excedido

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Você excedeu o limite de requisições",
    "details": {
      "limit": 100,
      "window": 3600,
      "retry_after": 1200
    }
  }
}
```

## 🚦 Rate Limiting

A API implementa rate limiting para garantir uso justo e estabilidade.

### Limites por Plano

| Requisições/Hora | Requisições/Dia | Processamento de IA/Hora |
|-------|------------------|-----------------|--------------------------|
| 10000 | Ilimitado | Ilimitado |

### Cabeçalhos de Rate Limit

```http
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9999
X-RateLimit-Reset: 1642248000
```

### Estratégia de Retry

Implemente backoff exponencial para requisições limitadas:

```javascript
async function makeRequest(url, options = {}) {
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
      const waitTime = Math.pow(2, retryCount) * retryAfter * 1000;
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      retryCount++;
      continue;
    }
    
    return response;
  }
  
  throw new Error('Max retries exceeded');
}
```

## 📦 SDKs

Oferecemos SDKs oficiais para facilitar a integração:

### JavaScript/TypeScript

```bash
npm install @video-ai-editor/sdk
```

```javascript
import { VideoAIEditor } from '@video-ai-editor/sdk';

const client = new VideoAIEditor({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.luwieditorai.xyz/v1'
});

// Upload de vídeo
const video = await client.videos.upload({
  file: fileObject,
  title: 'Meu Vídeo',
  description: 'Descrição do vídeo'
});

// Geração de legendas
const captionsTask = await client.ai.generateCaptions({
  videoId: video.id,
  language: 'pt-BR',
  format: 'vtt'
});
```

### Python

```bash
pip install video-ai-editor-sdk
```

```python
from video_ai_editor import VideoAIClient

client = VideoAIClient(
    api_key='your-api-key',
    base_url='https://api.luwieditorai.xyz/v1'
)

# Upload de vídeo
video = client.videos.upload(
    file=open('video.mp4', 'rb'),
    title='Meu Vídeo',
    description='Descrição do vídeo'
)

# Geração de legendas
captions_task = client.ai.generate_captions(
    video_id=video.id,
    language='pt-BR',
    format='vtt'
)
```

## 💻 Exemplos de Código

### Upload e Processamento Completo

```javascript
async function uploadAndProcessVideo(file, title, description) {
  try {
    // 1. Upload do vídeo
    const uploadResponse = await fetch('/videos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    });
    
    const uploadData = await uploadResponse.json();
    
    // 2. Upload do arquivo
    const formData = new FormData();
    formData.append('video', file);
    
    await fetch(uploadData.data.upload_url, {
      method: 'PUT',
      body: formData
    });
    
    // 3. Aguardar processamento
    let video = await pollVideoStatus(uploadData.data.id);
    
    // 4. Gerar legendas automaticamente
    const captionsTask = await fetch('/ai/caption-generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        video_id: video.id,
        parameters: {
          language: 'pt-BR',
          format: 'vtt'
        }
      })
    });
    
    const captionsData = await captionsTask.json();
    
    // 5. Aguardar conclusão da tarefa
    const captionsResult = await waitForTaskCompletion(captionsData.data.task_id);
    
    return {
      video,
      captions: captionsResult
    };
  } catch (error) {
    console.error('Erro no processamento:', error);
    throw error;
  }
}

async function pollVideoStatus(videoId) {
  let video = await fetch(`/videos/${videoId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  let videoData = await video.json();
  
  while (videoData.data.status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    video = await fetch(`/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    videoData = await video.json();
  }
  
  return videoData.data;
}

async function waitForTaskCompletion(taskId) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://api.video-ai-editor.com/ws');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'auth',
        token: apiKey
      }));
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'completed' && message.data.task_id === taskId) {
        ws.close();
        resolve(message.data.result);
      } else if (message.type === 'error' && message.data.task_id === taskId) {
        ws.close();
        reject(new Error(message.data.error.message));
      }
    };
  });
}
```

### Dashboard de Vídeos

```javascript
import React, { useState, useEffect } from 'react';
import { VideoAIEditor } from '@video-ai-editor/sdk';

function VideoDashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const client = new VideoAIEditor({
    apiKey: 'your-api-key'
  });
  
  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const response = await client.videos.list({
          page: 1,
          limit: 20,
          sort: 'created_at',
          order: 'desc'
        });
        
        setVideos(response.data.videos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadVideos();
  }, []);
  
  async function handleDeleteVideo(videoId) {
    if (window.confirm('Tem certeza que deseja excluir este vídeo?')) {
      try {
        await client.videos.delete(videoId);
        setVideos(videos.filter(video => video.id !== videoId));
      } catch (err) {
        setError(err.message);
      }
    }
  }
  
  async function handleGenerateCaptions(videoId) {
    try {
      const task = await client.ai.generateCaptions({
        videoId,
        language: 'pt-BR',
        format: 'vtt'
      });
      
      // Implementar WebSocket para acompanhamento do progresso
      console.log('Tarefa de legendas iniciada:', task.data.task_id);
    } catch (err) {
      setError(err.message);
    }
  }
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div className="video-dashboard">
      <h1>Meus Vídeos</h1>
      
      <div className="video-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <img 
              src={video.thumbnail_url} 
              alt={video.title}
              className="video-thumbnail"
            />
            
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <span className="video-duration">
                {formatDuration(video.duration)}
              </span>
            </div>
            
            <div className="video-actions">
              <button onClick={() => handleGenerateCaptions(video.id)}>
                Gerar Legendas
              </button>
              <button onClick={() => handleDeleteVideo(video.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default VideoDashboard;
```
