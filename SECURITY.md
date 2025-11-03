# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of LuwiEditor-AI seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Where to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- security@luwieditor.com
- Or open a private security advisory on GitHub

### What to Include

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- We will acknowledge receipt of your vulnerability report within 3 business days
- We will send you regular updates on our progress
- We will notify you when the vulnerability is fixed
- We will credit you in our release notes (unless you prefer to remain anonymous)

## Security Best Practices

When using LuwiEditor-AI:

1. **Keep Dependencies Updated**: Regularly update all dependencies
2. **Use Environment Variables**: Never commit secrets or API keys
3. **Validate Inputs**: Always validate and sanitize user inputs
4. **Use HTTPS**: Always use secure connections in production
5. **Review Code**: Review all code changes for security implications
6. **Run Security Scans**: Regularly run CodeQL and dependency scans
7. **Limit Permissions**: Use principle of least privilege for all access
8. **Secure Storage**: Encrypt sensitive data at rest and in transit

## Automated Security

We use the following automated security tools:

- **Dependabot**: Automated dependency updates
- **CodeQL**: Static code analysis for security vulnerabilities
- **npm audit**: Vulnerability scanning for Node.js dependencies
- **pip-audit**: Vulnerability scanning for Python dependencies

## Contact

For general security questions or concerns, please email security@luwieditor.com

Thank you for helping keep LuwiEditor-AI and our users safe!
