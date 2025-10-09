# Contribuindo para o Video AI Editor

Obrigado pelo seu interesse em contribuir com o Video AI Editor! Este documento guiará você através do processo de contribuição e fornecerá todas as informações necessárias para começar.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Relatórios de Issues](#relatórios-de-issues)
- [Recursos de IA](#recursos-de-ia)

## 🤝 Código de Conduta

Este projeto adere ao [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você espera manter este código.

## 🚀 Como Contribuir

### 1. Prepare seu Ambiente

#### Pré-requisitos
- Node.js 18.x ou superior
- Python 3.11 ou superior
- Git
- Docker (opcional)

#### Setup do Projeto

1. **Fork o Repositório**
   ```bash
   # Fork no GitHub e clone seu fork
   git clone https://github.com/SEU_USERNAME/LuwiEditor-AI-Code.git
   cd video-ai-editor
   ```

2. **Adicione o Remote Original**
   ```bash
   git remote add upstream https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code.git
   ```

3. **Instale Dependências**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   pip install -r requirements.txt -r requirements-dev.txt
   ```

4. **Configure o Ambiente de Desenvolvimento**
   ```bash
   # Copie os arquivos de exemplo
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   
   # Configure as variáveis de ambiente
   # Veja os arquivos para mais detalhes
   ```

### 2. Escolha uma Issue

1. **Verifique Issues Abertas**
   - [Boas para Primeiras Contribuições](https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
   - [Ajuda Necessária](https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

2. **Comente na Issue**
   - Deixe um comentário se você planeja trabalhar em uma issue
   - Isso ajuda a evitar trabalho duplicado

3. **Crie uma Nova Issue (se necessário)**
   - Use os [templates](../../.github/ISSUE_TEMPLATE/)
   - Forneça o máximo de detalhes possível

## 🔄 Processo de Desenvolvimento

### 1. Crie uma Branch

```bash
# Sincronize com o upstream
git fetch upstream
git checkout main
git merge upstream/main

# Crie sua branch
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-fix
```

### 2. Desenvolva sua Solução

#### Padrões de Branch
- `feature/`: Para novas funcionalidades
- `fix/`: Para correções de bugs
- `docs/`: Para mudanças na documentação
- `refactor/`: Para refatoração
- `test/`: Para testes

#### Commits Semânticos
Use [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

[corpo opcional]

[rodapé opcional]
```

Exemplos:
- `feat(editor): add video transition effects`
- `fix(auth): resolve login validation issue`
- `docs(api): update authentication endpoints`
- `test(ai): add unit tests for silence detection`

### 3. Teste suas Mudanças

#### Testes Locais
```bash
# Frontend
cd frontend
npm run test
npm run lint
npm run build

# Backend
cd backend
python manage.py test
flake8 .
black --check .
```

#### Testes Manuais
1. Verifique se a aplicação inicia corretamente
2. Teste a funcionalidade que você modificou
3. Verifique se não há regressões em áreas relacionadas

## 📝 Padrões de Código

### Frontend (React/JavaScript)

#### Componentes
```jsx
// Use componentes funcionais com hooks
const VideoEditor = ({ video, onVideoChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Efeito colateral
  }, [video]);
  
  return (
    <div className="video-editor">
      {/* JSX */}
    </div>
  );
};

export default VideoEditor;
```

#### Estilização
```jsx
// Use TailwindCSS classes
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Edit Video
</button>
```

#### Nomenclatura
- Componentes: `PascalCase`
- Funções/variáveis: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Arquivos: `PascalCase.jsx` para componentes

### Backend (Python/Django)

#### Models
```python
from django.db import models

class Video(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='videos/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Video"
        verbose_name_plural = "Videos"
    
    def __str__(self):
        return self.title
```

#### Views

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Video
from .serializers import VideoSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

#### Nomenclatura
- Classes: `PascalCase`
- Funções/variáveis: `snake_case`
- Constantes: `UPPER_SNAKE_CASE`
- Arquivos: `snake_case.py`

### IA/Machine Learning

#### Estrutura de Modelos
```python
# ai_models/silence_detection/model.py
import torch
import torch.nn as nn

class SilenceDetector(nn.Module):
    def __init__(self, input_size=1024, hidden_size=512):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.classifier = nn.Linear(hidden_size, 1)
    
    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        output = torch.sigmoid(self.classifier(lstm_out[:, -1, :]))
        return output
```

#### Pipeline de Inferência
```python
# ai_models/silence_detection/inference.py
from transformers import pipeline
import numpy as np

class SilenceDetectionPipeline:
    def __init__(self, model_path):
        self.model = pipeline("audio-classification", model=model_path)
    
    def detect_silence(self, audio_array, sample_rate=16000):
        """Detect silence segments in audio"""
        results = self.model(audio_array)
        silence_segments = self._process_results(results)
        return silence_segments
    
    def _process_results(self, results):
        """Process model results to extract silence segments"""
        # Implementation here
        pass
```

## 🔄 Processo de Pull Request

### 1. Prepare seu Pull Request

#### Antes de Abrir
- [ ] Seus commits seguem o padrão semântico
- [ ] Todos os testes passam localmente
- [ ] Você adicionou testes para novas funcionalidades
- [ ] Você atualizou a documentação (se necessário)
- [ ] Você fez rebase com a branch `main` mais recente

#### Descrição do PR
Use o [template de PR](../../.github/PULL_REQUEST_TEMPLATE.md):

```markdown
## 📝 Descrição
Breve descrição das mudanças

## 🧪 Testes
- [ ] Unit tests passam
- [ ] Integration tests passam
- [ ] Testes manuais realizados

## 📋 Checklist
- [ ] Código segue os padrões do projeto
- [ ] Documentação atualizada
- [ ] Sem breaking changes (ou documentados)
```

### 2. Abra o Pull Request

```bash
# Push para seu fork
git push origin feature/nome-da-feature

# Abra o PR no GitHub
# Use o template e preencha todas as seções
```

### 3. Processo de Review

#### O que Esperar
1. **CI/CD Automation**: Testes automáticos serão executados
2. **Code Review**: Mantenedores revisarão seu código
3. **Feedback**: Sugestões de melhorias
4. **Aprovação**: Após todas as verificações passarem

#### Como Responder ao Feedback
- Seja receptivo a sugestões
- Explique suas decisões de design
- Faça as mudanças solicitadas
- Mantenha uma comunicação respeitosa

### 4. Merge do Pull Request

#### Critérios para Merge
- [ ] Todos os testes automáticos passam
- [ ] Pelo menos um mantenedor aprovou
- [ ] Não há conflitos com a branch main
- [ ] Documentação atualizada (se necessário)
- [ ] Discussões resolvidas

#### Tipos de Merge
- **Squash and Merge**: Para features pequenas
- **Merge Commit**: Para features significativas
- **Rebase and Merge**: Raramente usado

## 🐛 Relatórios de Issues

### Bug Reports

#### Antes de Reportar
1. **Verifique Issues Existentes**: Use a busca
2. **Verifique se é um Bug**: Não é uma dúvida ou feature request
3. **Reproduza o Bug**: Certifique-se de que é reproduzível

#### Como Reportar
Use o [template de bug report](../../.github/ISSUE_TEMPLATE/bug_report.md):

```markdown
## 🐛 Descrição do Bug
Descrição clara do problema

## 🔄 Passos para Reproduzir
1. Va para '...'
2. Clique em '....'
3. Veja o erro

## ✅ Comportamento Esperado
O que deveria acontecer

## ❌ Comportamento Atual
O que realmente aconteceu

## 📱 Ambiente
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 108]
- Versão: [e.g. v1.2.3]
```

### Feature Requests

#### Como Solicitar
Use o [template de feature request](../../.github/ISSUE_TEMPLATE/feature_request.md):

```markdown
## 🚀 Descrição da Funcionalidade
O que você gostaria de ver adicionado

## 💡 Problema que Resolve
Por que esta funcionalidade é necessária

## 📋 Requisitos
- [ ] Requisito 1
- [ ] Requisito 2

## 🎨 Mockups (se aplicável)
Adicione imagens ou links
```

## 🤖 Recursos de IA

### Desenvolvimento de Modelos

#### Estrutura de Diretórios
```
ai_models/
├── silence_detection/
│   ├── model.py          # Arquitetura do modelo
│   ├── train.py          # Script de treinamento
│   ├── inference.py      # Pipeline de inferência
│   ├── requirements.txt  # Dependências
│   └── README.md         # Documentação do modelo
└── effect_generation/
    ├── model.py
    ├── train.py
    ├── inference.py
    ├── requirements.txt
    └── README.md
```

#### Treinamento de Modelos
```python
# ai_models/silence_detection/train.py
import torch
from torch.utils.data import DataLoader
from .model import SilenceDetector
from .dataset import SilenceDataset

def train_model(config):
    """Train silence detection model"""
    # Setup
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = SilenceDetector().to(device)
    dataset = SilenceDataset(config['data_path'])
    dataloader = DataLoader(dataset, batch_size=config['batch_size'])
    
    # Training loop
    for epoch in range(config['epochs']):
        for batch in dataloader:
            # Training logic here
            pass
    
    # Save model
    torch.save(model.state_dict(), config['model_path'])
```

### Integração com HuggingFace

#### Publicação de Modelos
```python
# ai_models/silence_detection/publish.py
from huggingface_hub import HfApi, HfFolder

def publish_to_huggingface(model_path, repo_name):
    """Publish model to HuggingFace Hub"""
    api = HfApi()
    
    # Create repository
    api.create_repo(
        repo_id=repo_name,
        repo_type="model",
        private=False
    )
    
    # Upload files
    api.upload_folder(
        folder_path=model_path,
        repo_id=repo_name,
        repo_type="model"
    )
```

#### Configuração do Modelo
```yaml
# ai_models/silence_detection/config.yaml
model:
  name: "video-ai-editor/silence-detector"
  type: "audio-classification"
  architecture: "lstm-based"
  
training:
  batch_size: 32
  learning_rate: 0.001
  epochs: 100
  
inference:
  sample_rate: 16000
  window_size: 1024
  threshold: 0.5
```

## 🧪 Testes

### Tipos de Testes

#### Unit Tests
```javascript
// frontend/src/components/__tests__/VideoEditor.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import VideoEditor from '../VideoEditor';

describe('VideoEditor', () => {
  test('renders video player', () => {
    render(<VideoEditor video={mockVideo} />);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
  
  test('handles play/pause', () => {
    const onPlay = jest.fn();
    render(<VideoEditor video={mockVideo} onPlay={onPlay} />);
    
    fireEvent.click(screen.getByTestId('play-button'));
    expect(onPlay).toHaveBeenCalled();
  });
});
```

#### Integration Tests
```python
# backend/tests/test_video_api.py
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class VideoAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_create_video(self):
        data = {
            'title': 'Test Video',
            'file': self.test_video_file
        }
        response = self.client.post('/api/videos/', data)
        self.assertEqual(response.status_code, 201)
```

#### E2E Tests
```javascript
// frontend/tests/e2e/video-editing.spec.js
const { test, expect } = require('@playwright/test');

test('user can edit video', async ({ page }) => {
  await page.goto('/');
  
  // Login
  await page.fill('[data-testid="username"]', 'testuser');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');
  
  // Upload video
  await page.setInputFiles('[data-testid="video-upload"]', 'test-video.mp4');
  await page.click('[data-testid="upload-button"]');
  
  // Edit video
  await page.click('[data-testid="trim-button"]');
  await page.dragAndDrop('[data-testid="trim-start"]', { x: 100, y: 0 });
  await page.click('[data-testid="save-button"]');
  
  // Verify changes
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

## 📊 Performance

### Frontend Performance

#### React Performance
```jsx
// Use React.memo para evitar re-renders desnecessários
const VideoTrack = React.memo(({ clips, onClipSelect }) => {
  return (
    <div className="video-track">
      {clips.map(clip => (
        <Clip key={clip.id} clip={clip} onSelect={onClipSelect} />
      ))}
    </div>
  );
});

// Use useMemo para cálculos pesados
const Timeline = ({ video }) => {
  const processedClips = useMemo(() => {
    return video.clips.map(clip => processClip(clip));
  }, [video.clips]);
  
  return <TimelineClips clips={processedClips} />;
};
```

#### WebAssembly Performance
```javascript
// Use workers para processamento pesado
const videoProcessor = new Worker('/wasm/video-processor.js');

videoProcessor.postMessage({
  type: 'PROCESS_VIDEO',
  videoData: videoBuffer
});

videoProcessor.onmessage = (event) => {
  const { type, data } = event.data;
  if (type === 'PROCESSING_COMPLETE') {
    updateVideoPreview(data);
  }
};
```

### Backend Performance

#### Django Optimization
```python
# Use select_related e prefetch_related
videos = Video.objects.select_related('user').prefetch_related('clips')

# Use cache
from django.core.cache import cache

def get_popular_effects():
    cache_key = 'popular_effects'
    effects = cache.get(cache_key)
    
    if not effects:
        effects = Effect.objects.filter(downloads__gt=100)
        cache.set(cache_key, effects, timeout=3600)
    
    return effects
```

## 🔧 Ferramentas e Configuração

### VS Code Extensions Recomendadas
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-python.python",
    "ms-python.black-formatter",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json"
  ]
}
```

### Pre-commit Hooks
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
  
  - repo: https://github.com/psf/black
    rev: 22.10.0
    hooks:
      - id: black
        files: ^backend/
  
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.28.0
    hooks:
      - id: eslint
        files: ^frontend/
        additional_dependencies:
          - eslint@8.28.0
          - "@typescript-eslint/eslint-plugin"
```

## 🚀 Deploy e Release

### Processo de Release

1. **Versionamento Semântico**
   - `MAJOR.MINOR.PATCH`
   - Ex: `1.2.3`

2. **Changelog**
   ```markdown
   ## [1.2.3] - 2024-01-15
   
   ### Added
   - AI-powered video transitions
   
   ### Fixed
   - Audio sync issues in export
   
   ### Changed
   - Improved UI responsiveness
   ```

3. **Tag e Release**
   ```bash
   git tag -a v1.2.3 -m "Release version 1.2.3"
   git push origin v1.2.3
   ```

## 📞 Obtenha Ajuda

### Canais de Comunicação
- **GitHub Discussions**: [Q&A](https://github.com/LuwiEditor-AI/LuwiEditor-AI-Code/discussions)
- **Email**: contributors@luwieditorai.xyz

### Recursos de Aprendizado
- [React Documentation](https://react.dev/)
- [Django Documentation](https://docs.djangoproject.com/)
- [HuggingFace Course](https://huggingface.co/course)
- [WebAssembly MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)

## 🎉 Reconhecimento

Agradecemos a todos os contribuidores! Sua ajuda torna este projeto melhor.

### Contribuidores Destaque
- [@contributor1](https://github.com/contributor1) - AI Features
- [@contributor2](https://github.com/contributor2) - UI/UX Improvements
- [@contributor3](https://github.com/contributor3) - Performance Optimizations

### Como se Tornar um Mantenedor
Contribuidores ativos e consistentes podem ser convidados a se tornarem mantenedores. Critérios:
- Contribuições significativas e consistentes
- Participação ativa em code reviews
- Ajuda na comunidade
- Compromisso com o projeto a longo prazo

---

## 📝 Licença de Contribuição

Ao contribuir com este projeto, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](../../LICENSE).

---

<div align="center">
  <sub>
    Feito com ❤️ pela 
    <a href="https://github.com/LuwiEditor-AI">LuwiEditor-AI Community</a>
  </sub>
</div>
```

**Commit Message:**
```
docs(contributing): add comprehensive contribution guidelines

- Add detailed setup instructions for development environment
- Include branch naming conventions and semantic commit standards
- Add pull request process with code review guidelines
- Include testing requirements and quality standards
- Add issue reporting guidelines and templates
- Include community guidelines and communication channels

This document provides clear guidelines for contributors to ensure
consistent, high-quality contributions to the project.
```

## 🎯 Principais Características

### 1. **Guia Completo**
- Setup detalhado do ambiente
- Processo de desenvolvimento passo a passo
- Padrões de código para todas as tecnologias

### 2. **Específico para o Projeto**
- Exemplos de código reais do projeto
- Estrutura de modelos de IA
- Integração com HuggingFace

### 3. **Foco em Qualidade**
- Padrões de testes
- Guias de performance
- Ferramentas recomendadas

### 4. **Comunidade**
- Canais de comunicação
- Processo de release
- Reconhecimento de contribuidores

Este guia fornece tudo o que um contribuidor precisa para participar efetivamente do projeto!
