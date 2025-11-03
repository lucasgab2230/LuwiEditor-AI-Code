# LuwiEditor-AI

An open-source, AI-powered video editor with advanced features and no watermark. Built with modern technologies and powered by custom AI models.

## 🌟 Features

### AI-Powered Capabilities
- **Video Upscaling**: Enhance video quality up to 4K 60FPS
- **AI Chat Assistant**: Generate effects and content through natural language
- **Music Generation**: Create copyright-free music based on video themes
- **Sound Effects**: Generate custom sound effects without copyright concerns
- **Transitions**: AI-generated smooth transitions between clips
- **Visual Effects**: Create stunning visual effects using AI
- **Text-to-Speech**: Convert text to natural-sounding speech
- **Text-to-Video**: Generate videos from text using Pexels/Pixabay images
- **Color Correction**: Automatic color grading and correction
- **Aspect Ratio Conversion**: Smart content-aware format conversion
- **Noise Reduction**: Detect and remove audio noise
- **Silence Removal**: Automatically detect and cut silent sections
- **Viral Shorts Creator**: Transform long videos into engaging short clips

### Traditional Editing Features
- Precise cutting and trimming
- Masking tools
- Keyframe animation
- Timeline-based editing
- Multi-track support

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI library
- **TypeScript**: Type-safe development
- **TailwindCSS v4**: Utility-first styling
- **Electron.js**: Cross-platform desktop application

### Backend
- **Python**: AI model development and training
- **Django**: Robust backend framework
- **Express.js**: API server
- **Node.js**: Server runtime

### AI/ML
- **PyTorch (CPU)**: Deep learning framework
- **ONNX Runtime**: Model inference optimization

### Infrastructure
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline
- **Supabase**: Database and authentication
- **Dependabot**: Dependency management
- **CodeQL**: Security scanning

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker and Docker Compose
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/lucasgab2230/LuwiEditor-AI-Code.git
cd LuwiEditor-AI-Code

# Install dependencies
npm install

# Set up Python environment
cd ai-models
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run with Docker
docker-compose up -d

# Or run locally
npm run dev
```

## 📁 Project Structure

```
LuwiEditor-AI-Code/
├── electron/              # Electron main process
├── frontend/              # React frontend application
├── backend/               # Express.js API server
├── ai-models/             # PyTorch AI models and training
│   ├── upscaling/
│   ├── music-generation/
│   ├── sound-effects/
│   ├── transitions/
│   ├── visual-effects/
│   ├── tts/
│   ├── text-to-video/
│   ├── color-correction/
│   ├── aspect-ratio/
│   ├── noise-reduction/
│   ├── silence-detection/
│   └── shorts-generator/
├── django-backend/        # Django backend for AI services
├── shared/                # Shared TypeScript types and utilities
├── docker/                # Docker configurations
└── .github/               # GitHub Actions workflows
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All AI models are trained on copyright-free data
- Uses Pexels and Pixabay for copyright-free media
- Built with ❤️ by the open-source community

## 📞 Support

- 📧 Email: support@luwieditor.com
- 🐛 Issues: [GitHub Issues](https://github.com/lucasgab2230/LuwiEditor-AI-Code/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/lucasgab2230/LuwiEditor-AI-Code/discussions)

## 🗺️ Roadmap

- [x] Project structure and setup
- [ ] Core video editing functionality
- [ ] AI model training and integration
- [ ] Desktop application release
- [ ] Plugin system
- [ ] Cloud rendering
- [ ] Mobile companion app

---

Made with 💜 for the open-source community
