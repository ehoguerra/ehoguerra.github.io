# Portfólio Web - Artur Guerra

Um portfólio web moderno e responsivo desenvolvido em HTML, CSS e JavaScript, com suporte a múltiplos idiomas (Português/Inglês).

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Bilíngue**: Suporte completo para Português e Inglês
- **Animações Modernas**: Efeitos de scroll e transições suaves
- **Performance Otimizada**: CSS e JavaScript otimizados
- **SEO Friendly**: Meta tags e structured data completos
- **Acessibilidade**: Seguindo boas práticas de acessibilidade

## 📂 Estrutura do Projeto

```
portifolio_1/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos principais
│   │   ├── about.css       # Estilos da seção Sobre
│   │   └── projects.css    # Estilos da seção Projetos
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── images/
│   │   ├── projects/       # Imagens dos projetos
│   │   └── ...            # Outras imagens
│   └── documents/
│       └── ...            # CVs e documentos
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: 
  - CSS Grid e Flexbox
  - Custom Properties (CSS Variables)
  - Animações e transições
  - Design responsivo
- **JavaScript ES6+**:
  - Classes modulares
  - Intersection Observer API
  - Local Storage para idiomas
  - Formulários interativos

## 🎨 Funcionalidades

### Sistema de Idiomas
- Troca dinâmica entre Português e Inglês
- Persistência da escolha no Local Storage
- Textos organizados em sistema de i18n

### Animações
- Animações de entrada baseadas em scroll
- Efeito de digitação no hero
- Contadores animados
- Transições suaves entre seções

### Seções
1. **Hero**: Apresentação inicial com call-to-actions
2. **Sobre**: Informações pessoais, estatísticas e habilidades
3. **Experiência**: Timeline profissional
4. **Projetos**: Showcase dos principais projetos com filtros
5. **Habilidades**: Skills técnicas e soft skills
6. **Contato**: Formulário e informações de contato

## 📱 Responsividade

O design é mobile-first e se adapta a diferentes tamanhos de tela:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Configuração

### Imagens Necessárias

Adicione as seguintes imagens na pasta `assets/images/`:

1. **Profile**:
   - `profile-photo.jpg` (foto de perfil quadrada, min. 400x400px)
   - `favicon.ico` (ícone do site)
   - `apple-touch-icon.png` (ícone para iOS)
   - `og-image.jpg` (imagem para redes sociais, 1200x630px)

2. **Projetos** (pasta `projects/`):
   - `pecci-preview.jpg` (screenshot do projeto Pecci)
   - `encurta-ai-preview.jpg` (screenshot do projeto Encurta AI)

### Documentos

Adicione os CVs na pasta `assets/documents/`:
- `Artur_Guerra_CV_PT.pdf`
- `Artur_Guerra_CV_EN.pdf`

### Personalização

#### Cores
Edite as CSS Custom Properties em `style.css`:
```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f39c12;
  --accent-color: #e74c3c;
  /* ... outras cores */
}
```

#### Conteúdo
- Edite os atributos `data-i18n` no HTML
- Modifique as traduções no objeto `translations` em `main.js`

## 📊 Performance

- **CSS**: Organizado em módulos para carregamento eficiente
- **JavaScript**: Classes modulares para melhor manutenção
- **Imagens**: Use formatos otimizados (WebP quando possível)
- **Fontes**: Google Fonts com preload

## 🌐 Deploy

### GitHub Pages
1. Faça push do código para um repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch main
4. Acesse via `username.github.io/repository-name`

### Netlify
1. Arraste a pasta do projeto para netlify.com/drop
2. Configure domínio personalizado se necessário

### Vercel
1. Conecte o repositório GitHub
2. Deploy automático a cada push

## 📧 Formulário de Contato

O formulário está configurado para funcionar com:
- **Netlify Forms** (adicione `netlify` ao form)
- **Formspree** (configure action para formspree.io)
- **EmailJS** (configure as credenciais)

## 🔍 SEO

Incluído:
- Meta tags completas
- Open Graph (Facebook)
- Twitter Cards
- Schema.org structured data
- Sitemap.xml (recomendado adicionar)

## 📱 Social Media

Configure os links sociais:
- GitHub: Já configurado com seus repositórios
- LinkedIn: Atualize com seu perfil
- Email: arturpvguerra@gmail.com
- Telefone: +55 (22) 99971-4055

## 🚀 Como Usar

1. **Clone ou baixe** os arquivos
2. **Adicione suas imagens** nas pastas correspondentes
3. **Personalize o conteúdo** conforme necessário
4. **Teste localmente** abrindo o `index.html`
5. **Faça deploy** na plataforma de sua escolha

## 📞 Suporte

Para dúvidas ou sugestões:
- Email: arturpvguerra@gmail.com
- GitHub: @ehoguerra

---

**Desenvolvido com ❤️ por Artur Guerra**