# 🚀 Guia Rápido de Deploy - Awa Fashion

## Passos para colocar sua loja online:

### 1. Criar conta no GitHub
- Acesse [github.com](https://github.com) e crie uma conta gratuita
- Confirme seu email

### 2. Criar repositório
- Clique em "New repository"
- Nome: `awa-fashion-loja`
- Marque como "Public"
- Clique "Create repository"

### 3. Fazer upload do código
No seu computador, abra o terminal na pasta do projeto e execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/awa-fashion-loja.git
git push -u origin master
```

### 4. Deploy no Netlify
- Acesse [netlify.com](https://netlify.com)
- Clique "Sign up" e use sua conta GitHub
- Clique "New site from Git"
- Escolha "GitHub" e autorize
- Selecione seu repositório `awa-fashion-loja`
- Configure:
  - Build command: `pnpm run build`
  - Publish directory: `dist`
- Clique "Deploy site"

### 5. Configurar CMS (Opcional)
Para editar produtos via interface web:

- No painel Netlify, vá em "Identity" → "Enable Identity"
- Em "Registration", escolha "Invite only"
- Vá em "Git Gateway" → "Enable Git Gateway"
- Convide usuários em "Identity" → "Invite users"

### 6. Acessar sua loja
- Loja: `https://SEU-SITE.netlify.app`
- Admin: `https://SEU-SITE.netlify.app/admin`

## 🎯 Próximos Passos

1. **Personalizar domínio**: No Netlify, vá em "Domain settings" para usar seu próprio domínio
2. **Adicionar produtos**: Use o admin em `/admin` ou edite os arquivos em `src/data/produtos/`
3. **Configurar WhatsApp**: Adicione seu número real nos contatos
4. **Integrar pagamentos**: Adicione M-Pesa ou outros gateways de pagamento

## 📞 Suporte
Se precisar de ajuda, entre em contato!

