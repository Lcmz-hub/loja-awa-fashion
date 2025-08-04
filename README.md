# Awa Fashion - Loja Online de Roupas

Uma loja online completa desenvolvida em React para venda de roupas em Nampula, Moçambique, com sistema de carrinho, checkout e opções de entrega.

## 🚀 Funcionalidades

- ✅ Catálogo de produtos com filtros por categoria
- ✅ Sistema de carrinho com persistência local
- ✅ Checkout completo com validação de formulários
- ✅ Opções de entrega: retirada na loja, entrega em casa, delivery
- ✅ Preços em Metical (MT)
- ✅ Design responsivo para mobile e desktop
- ✅ CMS integrado para gestão de produtos (Netlify CMS)
- ✅ Deploy automático via Netlify

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Icons**: Lucide React
- **CMS**: Netlify CMS
- **Deploy**: Netlify
- **Controle de Versão**: Git/GitHub

## 📦 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos para desenvolvimento local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd loja-roupas-nampula
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm run dev
   ```

4. **Acesse a aplicação**
   - Loja: http://localhost:5173
   - Admin (CMS): http://localhost:5173/admin

## 🌐 Deploy no Netlify

### Opção 1: Deploy via GitHub (Recomendado)

1. **Faça push para o GitHub**
   ```bash
   git remote add origin <url-do-seu-repositorio>
   git push -u origin master
   ```

2. **Configure no Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub
   - Configure:
     - Build command: `pnpm run build`
     - Publish directory: `dist`
   - Deploy!

3. **Configure o Netlify CMS**
   - No painel do Netlify, vá em "Identity"
   - Ative o serviço Identity
   - Em "Registration", selecione "Invite only"
   - Em "Git Gateway", ative o serviço
   - Convide usuários para acessar o CMS

### Opção 2: Deploy Manual

1. **Build do projeto**
   ```bash
   pnpm run build
   ```

2. **Upload da pasta `dist`**
   - Faça upload da pasta `dist` diretamente no Netlify

## 🎨 Personalização

### Editando Produtos via CMS

1. Acesse `https://seu-site.netlify.app/admin`
2. Faça login com suas credenciais
3. Gerencie produtos, preços e configurações da loja

### Editando Código

#### Estrutura de Arquivos
```
src/
├── components/ui/     # Componentes de interface
├── assets/           # Imagens dos produtos
├── data/            # Dados dos produtos e configurações
├── App.jsx          # Componente principal
└── main.jsx         # Ponto de entrada

public/
├── admin/           # Netlify CMS
└── images/          # Imagens enviadas via CMS
```

#### Principais Arquivos para Edição

- **`src/App.jsx`**: Lógica principal da loja
- **`src/data/config.json`**: Configurações da loja
- **`public/admin/config.yml`**: Configuração do CMS

### Adicionando Novos Produtos

#### Via CMS (Recomendado)
1. Acesse `/admin`
2. Vá em "Produtos" → "New Produto"
3. Preencha os dados e publique

#### Via Código
1. Adicione imagens em `src/assets/`
2. Edite o array `produtos` em `src/App.jsx`

### Personalizando Estilos

- **Cores**: Edite as variáveis CSS em `src/App.css`
- **Layout**: Modifique os componentes em `src/App.jsx`
- **Responsividade**: Use classes Tailwind CSS

## 📱 Funcionalidades da Loja

### Sistema de Carrinho
- Adicionar/remover produtos
- Alterar quantidades
- Persistência no localStorage
- Cálculo automático de totais

### Opções de Entrega
- **Retirada na Loja**: Grátis
- **Entrega em Casa**: 300 MT (todo Moçambique)
- **Delivery Rápido**: 150 MT (apenas Nampula)

### Validações
- Formulário de checkout com validação
- Campos obrigatórios por tipo de entrega
- Validação de email e telefone

## 🔧 Configurações Avançadas

### Variáveis de Ambiente
Crie um arquivo `.env` para configurações sensíveis:
```env
VITE_WHATSAPP_NUMBER=+258XXXXXXXXX
VITE_PAYMENT_GATEWAY_KEY=sua_chave_aqui
```

### Integrações Futuras
- Gateway de pagamento (M-Pesa, Visa, etc.)
- WhatsApp Business API
- Sistema de tracking de pedidos
- Analytics e relatórios

## 📞 Suporte

Para dúvidas ou suporte:
- Email: dev@awafashion.co.mz
- WhatsApp: +258 XX XXX XXXX

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para Awa Fashion**

