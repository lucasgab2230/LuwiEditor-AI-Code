# Contributing to LuwiEditor-AI

Thank you for your interest in contributing to LuwiEditor-AI! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/lucasgab2230/LuwiEditor-AI-Code/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

### Suggesting Features

1. Check [Issues](https://github.com/lucasgab2230/LuwiEditor-AI-Code/issues) for existing suggestions
2. Create a new issue with the "enhancement" label
3. Describe the feature and its benefits
4. Include mockups or examples if helpful

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Run linting and tests (`npm run lint && npm run test`)
6. Commit with clear, descriptive messages
7. Push to your fork
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/LuwiEditor-AI-Code.git
cd LuwiEditor-AI-Code

# Install dependencies
npm install

# Set up Python environment
cd ai-models
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Copy environment variables
cp .env.example .env

# Run development servers
npm run dev
```

## Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write self-documenting code with comments only when necessary
- Prefer functional programming patterns

### Python
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Keep functions focused and single-purpose

### React
- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Follow React 19 best practices

### Git Commits
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 72 characters
- Add detailed description if needed

Example:
```
Add video upscaling feature

- Implement PyTorch model for 4K upscaling
- Add ONNX export functionality
- Create React UI component for upscaling
```

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Aim for high code coverage
- Test edge cases and error handling

## AI Model Development

- Use only copyright-free training data
- Document data sources and preprocessing
- Include model architecture details
- Provide training scripts and parameters
- Export models to ONNX format for production

## Documentation

- Update README.md for user-facing changes
- Add inline documentation for complex code
- Update API documentation if applicable
- Include examples and usage instructions

## Security

- Never commit sensitive data (API keys, passwords, etc.)
- Report security vulnerabilities privately
- Follow secure coding practices
- Run CodeQL and address findings

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🎉
