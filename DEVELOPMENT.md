# Development Guide

This guide will help you set up your development environment and understand the project structure.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **Python** 3.11 or higher
- **Docker** and **Docker Compose**
- **Git**

### Optional but Recommended
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Python
  - Docker
  - Tailwind CSS IntelliSense

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lucasgab2230/LuwiEditor-AI-Code.git
cd LuwiEditor-AI-Code
```

### 2. Install Node Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (frontend, backend, electron, shared).

### 3. Set Up Python Environment

```bash
# Create virtual environment
cd ai-models
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

cd ..
```

### 4. Set Up Django Backend

```bash
cd django-backend
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

cd ..
```

### 5. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database credentials
- Supabase keys
- API keys (Pexels, Pixabay)
- JWT secrets

## Development Workflow

### Running the Application

#### Option 1: Run All Services with Docker

```bash
npm run docker:up
```

This starts:
- Frontend (http://localhost:5173)
- Backend (http://localhost:3000)
- Django (http://localhost:8000)
- PostgreSQL (localhost:5432)
- Redis (localhost:6379)
- Nginx (http://localhost:80)

#### Option 2: Run Services Individually

**Terminal 1 - Frontend:**
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
# or
cd backend && npm run dev
```

**Terminal 3 - Django:**
```bash
cd django-backend
python manage.py runserver
```

**Terminal 4 - Electron (Desktop App):**
```bash
npm run dev:electron
# or
cd electron && npm run dev
```

### Code Style and Linting

Run linters:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

Type checking:
```bash
npm run type-check
```

### Testing

Run all tests:
```bash
npm run test
```

Run specific test suites:
```bash
npm run test:frontend
npm run test:backend
```

For Django tests:
```bash
cd django-backend
python manage.py test
```

### Building

Build all projects:
```bash
npm run build
```

Build specific projects:
```bash
npm run build:frontend
npm run build:backend
npm run build:electron
```

## Project Structure Deep Dive

### Frontend (React 19 + TypeScript)

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components (HomePage, EditorPage, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── store/          # State management (Zustand)
│   ├── services/       # API service layer
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration
```

### Backend (Express.js + TypeScript)

```
backend/
├── src/
│   ├── routes/         # API route definitions
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── services/       # Business logic
│   ├── models/         # Data models
│   └── index.ts        # Server entry point
└── package.json
```

### Django Backend (AI Services)

```
django-backend/
├── config/             # Django configuration
│   ├── settings.py     # Settings
│   ├── urls.py         # URL routing
│   └── wsgi.py         # WSGI config
├── ai_services/        # AI services app
│   ├── views/          # API views
│   ├── models/         # Database models
│   ├── serializers/    # DRF serializers
│   └── services/       # AI service logic
└── manage.py           # Django management
```

### AI Models (PyTorch)

```
ai-models/
├── upscaling/          # Video upscaling model
├── music-generation/   # Music generation model
├── sound-effects/      # Sound effects model
├── [other models]/     # Other AI models
├── base_model.py       # Base model class
└── requirements.txt    # Python dependencies
```

## Adding New Features

### Adding a New Frontend Component

1. Create component in `frontend/src/components/`
2. Export from `index.ts` if needed
3. Import and use in pages

### Adding a New API Endpoint

1. Define route in `backend/src/routes/`
2. Create controller in `backend/src/controllers/`
3. Add business logic in `backend/src/services/`
4. Update types in `shared/types/`

### Adding a New AI Model

1. Create directory in `ai-models/[model-name]/`
2. Implement model architecture in `model.py`
3. Create training script in `train.py`
4. Create inference script in `inference.py`
5. Export to ONNX with `export.py`
6. Add Django view in `django-backend/ai_services/views/`
7. Update URL patterns in `django-backend/ai_services/urls.py`

## Common Tasks

### Database Migrations

```bash
cd django-backend
python manage.py makemigrations
python manage.py migrate
```

### Adding Dependencies

**Node.js packages:**
```bash
# Root workspace
npm install [package-name]

# Specific workspace
cd frontend && npm install [package-name]
```

**Python packages:**
```bash
# AI models
cd ai-models
pip install [package-name]
pip freeze > requirements.txt

# Django backend
cd django-backend
pip install [package-name]
pip freeze > requirements.txt
```

### Troubleshooting

**Port already in use:**
```bash
# Find and kill process
lsof -ti:5173 | xargs kill -9  # Frontend
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:8000 | xargs kill -9  # Django
```

**Docker issues:**
```bash
# Rebuild containers
npm run docker:build

# View logs
docker-compose logs -f

# Reset everything
npm run docker:down
docker system prune -a
npm run docker:up
```

**Module not found:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Performance Tips

1. **Development:**
   - Use `npm run dev` for hot reload
   - Enable source maps for debugging
   - Use React DevTools and Redux DevTools

2. **Production:**
   - Run `npm run build` for optimized builds
   - Enable compression
   - Use CDN for static assets
   - Optimize images and videos

## Resources

- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [PyTorch Documentation](https://pytorch.org/docs/)
- [Electron Documentation](https://www.electronjs.org/docs)

## Getting Help

- 📖 Check the [documentation](https://github.com/lucasgab2230/LuwiEditor-AI-Code/wiki)
- 💬 Join our [discussions](https://github.com/lucasgab2230/LuwiEditor-AI-Code/discussions)
- 🐛 Report [issues](https://github.com/lucasgab2230/LuwiEditor-AI-Code/issues)
- 📧 Email: dev@luwieditor.com

Happy coding! 🚀
