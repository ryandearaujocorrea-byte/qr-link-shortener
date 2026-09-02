# 🔗 QR Link Shortener

Gerador de URLs curtas + QR Codes com Dashboard de Analytics

## 🚀 Recursos

✅ **Encurtar URLs** - Converta URLs longas em links curtos  
✅ **QR Codes** - Gere QR codes automaticamente  
✅ **Dashboard** - Veja estatísticas de cliques  
✅ **Rastreamento** - Conta quantos cliques cada link recebe  
✅ **Fácil de usar** - Interface simples e intuitiva  

## 💰 Como Monetizar

1. **Adicione Publicidade** - Insira anúncios na página de redirecionamento
2. **Serviço Premium** - Cobre por links customizados (short.yourdomain.com/seu-nome)
3. **Analytics Avançado** - Venda dados de cliques para empresas
4. **API** - Monetize com acesso à API para desenvolvedores
5. **Encurtador Customizado** - Ofereça para empresas usar seu domínio

## 📋 Requisitos

- Node.js 14+
- npm

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/qr-link-shortener.git
cd qr-link-shortener

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

## 🌐 Uso

1. Acesse `http://localhost:3000`
2. Cole uma URL longa
3. Clique em "Gerar QR Code & Link Curto"
4. Copie o link ou QR code
5. Veja estatísticas no Dashboard (`/dashboard.html`)

## 🔌 API

### POST `/api/shorten`
Crie um link encurtado
```json
{
  "url": "https://exemplo.com/pagina-muito-longa"
}
```

### GET `/api/links`
Liste todos os links

### GET `/api/links/:shortCode`
Obtenha detalhes de um link específico

### DELETE `/api/links/:shortCode`
Delete um link

### GET `/:shortCode`
Redirecione para URL original (conta um clique)

## 📊 Estrutura do Projeto

```
qr-link-shortener/
├── server.js           # Servidor principal
├── package.json        # Dependências
├── links.db           # Banco de dados (criado automaticamente)
└── public/
    ├── index.html     # Página principal
    └── dashboard.html # Dashboard de analytics
```

## 🎨 Próximos Passos para Melhorar

- [ ] Autenticação de usuários
- [ ] Links customizados
- [ ] Suporte para múltiplos usuários
- [ ] Análise avançada (dispositivo, localização, navegador)
- [ ] Integração com Stripe para pagamentos
- [ ] API key para acesso programático
- [ ] Rate limiting e proteção contra abuso
- [ ] Deploy no Heroku/Vercel

## 📝 Licença

MIT

## 💡 Dicas de Monetização

**Curto Prazo:**
- Redirecione para páginas com anúncios antes do link final
- Ofereça versão premium sem publicidade

**Médio Prazo:**
- Venda links customizados
- Ofereça API para outras aplicações

**Longo Prazo:**
- SaaS - Deixe empresas usarem em seu próprio domínio
- Dados - Venda insights sobre trends de URLs

---

**Desenvolvido por:** Ryan de Araújo Correa  
**Data:** 2026
