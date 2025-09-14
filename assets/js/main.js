const config = {
  languages: ['pt', 'en'],
  defaultLanguage: 'pt',
  animationDuration: 300,
  scrollOffset: 80,
  typingSpeed: 50,
  intersectionThreshold: 0.1
};

class LanguageSystem {
  constructor() {
    this.currentLanguage = localStorage.getItem('portfolio-language') || config.defaultLanguage;
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.setupLanguageSwitcher();
    this.applyLanguage(this.currentLanguage);
  }

  async loadTranslations() {
    this.translations = {
      pt: {
        'nav.about': 'Sobre',
        'nav.experience': 'Experiência',
        'nav.projects': 'Projetos',
        'nav.skills': 'Habilidades',
        'nav.contact': 'Contato',
        
        'hero.greeting': 'Olá, eu sou',
        'hero.name': 'Artur Guerra',
        'hero.title': 'Desenvolvedor Full-Stack',
        'hero.subtitle': 'Especializado em Python, Flask e desenvolvimento de sistemas SaaS',
        'hero.description': 'Desenvolvedor apaixonado por criar soluções web modernas e eficientes, com foco em experiência do usuário e arquiteturas escaláveis.',
        'hero.cta.projects': 'Ver Projetos',
        'hero.cta.contact': 'Entre em Contato',
        'hero.scroll': 'Role para baixo',
        
        'about.title': 'Sobre Mim',
        'about.subtitle': 'Desenvolvedor Full-Stack',
        'about.description': 'Sou um desenvolvedor full-stack focado em criar sistemas SaaS e aplicações web com Python e Flask. Tenho experiência em desenvolvimento de dashboards personalizados, gestão de bancos de dados e criação de interfaces modernas e responsivas.',
        'about.stats.projects': 'Projetos',
        'about.stats.experience': 'Ano',
        'about.stats.technologies': 'Tecnologias',
        'about.stats.clients': 'Clientes',
        'about.download.pt': 'Baixar CV (PT)',
        'about.download.en': 'Baixar CV (EN)',
        'about.skills.title': 'Principais Tecnologias',
        
        'experience.title': 'Experiência Profissional',
        'experience.subtitle': 'Minha jornada profissional',
        'experience.freelancer.title': 'Desenvolvedor SaaS (Freelancer)',
        'experience.freelancer.company': 'Pecci Cuidado Integrado',
        'experience.freelancer.period': '2025',
        'experience.freelancer.description': 'Desenvolvi um sistema completo de gerenciamento para clínicas de psicologia, incluindo gestão de pacientes, agendamentos e evoluções clínicas com criptografia de dados.',
        'experience.student.title': 'Estudante de Sistemas de Informação',
        'experience.student.company': 'CEFET/RJ - UNED Nova Friburgo',
        'experience.student.period': '2025-2028',
        'experience.student.description': 'Cursando Bacharelado em Sistemas de Informação, aprofundando conhecimentos em desenvolvimento de software e arquitetura de sistemas.',
        
        'projects.title': 'Meus Projetos',
        'projects.subtitle': 'Alguns dos meus trabalhos recentes',
        'projects.filter.all': 'Todos',
        'projects.filter.web': 'Web Apps',
        'projects.filter.saas': 'SaaS',
        'projects.filter.tools': 'Ferramentas',
        'projects.featured': 'Em Destaque',
        'projects.view': 'Ver Projeto',
        'projects.code': 'Ver Código',
        'projects.demo': 'Demo',
        'projects.cta.title': 'Interessado em trabalhar comigo?',
        'projects.cta.description': 'Estou sempre aberto a novos desafios e oportunidades de colaboração.',
        'projects.cta.button': 'Vamos Conversar',
        
        'project.pecci.title': 'Pecci Cuidado Integrado',
        'project.pecci.description': 'Sistema completo de gerenciamento para clínicas de psicologia com dashboard personalizado, gestão de pacientes, agendamentos e sistema de criptografia para dados sensíveis.',
        'project.pecci.tech': 'Python, Flask, PostgreSQL, Bootstrap, JavaScript',
        
        'project.encurta.title': 'Encurta AI',
        'project.encurta.description': 'Encurtador de URLs moderno com interface elegante, sistema de autenticação de usuários e funcionalidades de gerenciamento de links.',
        'project.encurta.tech': 'Flask, SQLAlchemy, Bootstrap, JavaScript',
        
        'skills.title': 'Habilidades & Tecnologias',
        'skills.subtitle': 'Ferramentas que uso no meu dia a dia',
        'skills.backend.title': 'Backend',
        'skills.frontend.title': 'Frontend',
        'skills.database.title': 'Banco de Dados',
        'skills.tools.title': 'Ferramentas',
        
        'contact.title': 'Entre em Contato',
        'contact.subtitle': 'Vamos trabalhar juntos',
        'contact.description': 'Estou sempre interessado em novos projetos e oportunidades. Entre em contato comigo!',
        'contact.form.name': 'Seu Nome',
        'contact.form.email': 'Seu Email',
        'contact.form.subject': 'Assunto',
        'contact.form.message': 'Sua Mensagem',
        'contact.form.send': 'Enviar via WhatsApp',
        'contact.form.name.placeholder': 'Digite seu nome completo',
        'contact.form.email.placeholder': 'Digite seu melhor email',
        'contact.form.subject.placeholder': 'Qual o assunto?',
        'contact.form.message.placeholder': 'Descreva seu projeto ou ideia...',
        'contact.info.title': 'Informações de Contato',
        'contact.info.email': 'arturpvguerra@gmail.com',
        'contact.info.phone': '+55 (22) 99971-4055',
        'contact.info.location': 'Nova Friburgo, RJ - Brasil',
        
        'tech.showcase.title': 'Tecnologias que Utilizo',
        
        'footer.rights': 'Todos os direitos reservados.',
        'footer.made': 'Feito com',
        'footer.by': 'por Artur Guerra',
        
        'skills.soft.teamwork': 'Trabalho em Equipe',
        'skills.soft.learning': 'Rápida Aprendizagem',
        'skills.soft.adaptability': 'Adaptabilidade',
        'skills.soft.integrity': 'Integridade',
        'skills.soft.resilience': 'Resiliência'
      },
      
      en: {
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        
        'hero.greeting': 'Hello, I am',
        'hero.name': 'Artur Guerra',
        'hero.title': 'Full-Stack Developer',
        'hero.subtitle': 'Specialized in Python, Flask and SaaS system development',
        'hero.description': 'Passionate developer focused on creating modern and efficient web solutions, with emphasis on user experience and scalable architectures.',
        'hero.cta.projects': 'View Projects',
        'hero.cta.contact': 'Get in Touch',
        'hero.scroll': 'Scroll down',
        
        'about.title': 'About Me',
        'about.subtitle': 'Full-Stack Developer',
        'about.description': 'I am a full-stack developer focused on creating SaaS systems and web applications with Python and Flask. I have experience in developing custom dashboards, database management, and creating modern and responsive interfaces.',
        'about.stats.projects': 'Projects',
        'about.stats.experience': 'Year',
        'about.stats.technologies': 'Technologies',
        'about.stats.clients': 'Clients',
        'about.download.pt': 'Download CV (PT)',
        'about.download.en': 'Download CV (EN)',
        'about.skills.title': 'Main Technologies',
        
        'experience.title': 'Professional Experience',
        'experience.subtitle': 'My professional journey',
        'experience.freelancer.title': 'SaaS Developer (Freelancer)',
        'experience.freelancer.company': 'Pecci Cuidado Integrado',
        'experience.freelancer.period': '2025',
        'experience.freelancer.description': 'Developed a complete management system for psychology clinics, including patient management, appointments and clinical evolutions with data encryption.',
        'experience.student.title': 'Information Systems Student',
        'experience.student.company': 'CEFET/RJ - UNED Nova Friburgo',
        'experience.student.period': '2025-2028',
        'experience.student.description': 'Pursuing Bachelor\'s Degree in Information Systems, deepening knowledge in software development and system architecture.',
        
        'projects.title': 'My Projects',
        'projects.subtitle': 'Some of my recent work',
        'projects.filter.all': 'All',
        'projects.filter.web': 'Web Apps',
        'projects.filter.saas': 'SaaS',
        'projects.filter.tools': 'Tools',
        'projects.featured': 'Featured',
        'projects.view': 'View Project',
        'projects.code': 'View Code',
        'projects.demo': 'Demo',
        'projects.cta.title': 'Interested in working with me?',
        'projects.cta.description': 'I\'m always open to new challenges and collaboration opportunities.',
        'projects.cta.button': 'Let\'s Talk',
        
        'project.pecci.title': 'Pecci Cuidado Integrado',
        'project.pecci.description': 'Complete management system for psychology clinics with custom dashboard, patient management, appointments and encryption system for sensitive data.',
        'project.pecci.tech': 'Python, Flask, PostgreSQL, Bootstrap, JavaScript',
        
        'project.encurta.title': 'Encurta AI',
        'project.encurta.description': 'Modern URL shortener with elegant interface, user authentication system and link management functionalities.',
        'project.encurta.tech': 'Flask, SQLAlchemy, Bootstrap, JavaScript',
        
        'skills.title': 'Skills & Technologies',
        'skills.subtitle': 'Tools I use in my daily work',
        'skills.backend.title': 'Backend',
        'skills.frontend.title': 'Frontend',
        'skills.database.title': 'Database',
        'skills.tools.title': 'Tools',
        
        'contact.title': 'Get in Touch',
        'contact.subtitle': 'Let\'s work together',
        'contact.description': 'I\'m always interested in new projects and opportunities. Get in touch with me!',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your Message',
        'contact.form.send': 'Send via WhatsApp',
        'contact.form.name.placeholder': 'Enter your full name',
        'contact.form.email.placeholder': 'Enter your best email',
        'contact.form.subject.placeholder': 'What\'s the subject?',
        'contact.form.message.placeholder': 'Describe your project or idea...',
        'contact.info.title': 'Contact Information',
        'contact.info.email': 'arturpvguerra@gmail.com',
        'contact.info.phone': '+55 (22) 99971-4055',
        'contact.info.location': 'Nova Friburgo, RJ - Brazil',
        
        'tech.showcase.title': 'Technologies I Use',
        
        'footer.rights': 'All rights reserved.',
        'footer.made': 'Made with',
        'footer.by': 'by Artur Guerra',
        
        'skills.soft.teamwork': 'Teamwork',
        'skills.soft.learning': 'Quick Learning',
        'skills.soft.adaptability': 'Adaptability',
        'skills.soft.integrity': 'Integrity',
        'skills.soft.resilience': 'Resilience'
      }
    };
  }

  setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  }

  switchLanguage(lang) {
    if (this.currentLanguage === lang) return;
    
    this.currentLanguage = lang;
    localStorage.setItem('portfolio-language', lang);
    this.applyLanguage(lang);
    this.updateLanguageButtons();
  }

  applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key, lang);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (!element.hasAttribute('data-typing')) {
          element.textContent = translation;
        }
      }
    });
    
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.dataset.i18nPlaceholder;
      const translation = this.getTranslation(key, lang);
      if (translation) {
        element.placeholder = translation;
      }
    });
    
    const typingElements = document.querySelectorAll('[data-typing][data-i18n]');
    typingElements.forEach(element => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key, lang);
      if (translation) {
        const speed = parseInt(element.dataset.typingSpeed) || 50;
        this.typeText(element, translation, speed);
      }
    });
    
    const imgElements = document.querySelectorAll('img[data-i18n-alt]');
    imgElements.forEach(img => {
      const key = img.dataset.i18nAlt;
      const translation = this.getTranslation(key, lang);
      if (translation) img.alt = translation;
    });
    
    // Controlar visibilidade dos botões de CV baseado no idioma
    const cvBtnPt = document.querySelector('.cv-btn-pt');
    const cvBtnEn = document.querySelector('.cv-btn-en');
    
    if (cvBtnPt && cvBtnEn) {
      if (lang === 'pt') {
        cvBtnPt.style.display = 'inline-flex';
        cvBtnEn.style.display = 'none';
      } else {
        cvBtnPt.style.display = 'none';
        cvBtnEn.style.display = 'inline-flex';
      }
    }
    
    this.updateLanguageButtons();
  }

  updateLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
    });
  }

  getTranslation(key, lang = this.currentLanguage) {
    return this.translations[lang]?.[key] || key;
  }

  typeText(element, text, speed) {
    element.textContent = '';
    let index = 0;
    
    const timer = setInterval(() => {
      element.textContent += text.charAt(index);
      index++;
      
      if (index >= text.length) {
        clearInterval(timer);
        element.classList.add('typing-complete');
      }
    }, speed);
  }
}

class AnimationSystem {
  constructor(languageSystem) {
    this.languageSystem = languageSystem;
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupTypingEffect();
    this.setupParallaxEffect();
    this.setupCounterAnimations();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: config.intersectionThreshold,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animation || 'fadeInUp';
          
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) translateX(0) scale(1)';
          element.classList.add(`animate-${animationType}`);
          
          // Trigger counter animation if element has counter
          if (element.classList.contains('stat-number')) {
            this.animateCounter(element);
          }
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = this.getInitialTransform(el.dataset.animation);
      observer.observe(el);
    });
  }

  getInitialTransform(animationType) {
    const transforms = {
      'fadeInUp': 'translateY(30px)',
      'fadeInLeft': 'translateX(-30px)',
      'fadeInRight': 'translateX(30px)',
      'fadeInDown': 'translateY(-30px)',
      'zoomIn': 'scale(0.8)',
      'slideInLeft': 'translateX(-100px)',
      'slideInRight': 'translateX(100px)'
    };
    return transforms[animationType] || 'translateY(30px)';
  }

  setupTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(element => {
      let text;
      if (element.dataset.i18n) {
        const key = element.dataset.i18n;
        text = this.languageSystem?.getTranslation(key) || element.textContent;
      } else {
        text = element.textContent;
      }
      const speed = parseInt(element.dataset.typingSpeed) || config.typingSpeed;
      this.typeText(element, text, speed);
    });
  }

  typeText(element, text, speed) {
    element.textContent = '';
    let index = 0;
    
    const timer = setInterval(() => {
      element.textContent += text.charAt(index);
      index++;
      
      if (index >= text.length) {
        clearInterval(timer);
        element.classList.add('typing-complete');
      }
    }, speed);
  }

  setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const rate = parseInt(element.dataset.parallax) || 0.5;
        const translateY = scrolled * rate;
        element.style.transform = `translateY(${translateY}px)`;
      });
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count || element.textContent);
    const duration = parseInt(element.dataset.duration) || 2000;
    const increment = target / (duration / 16);
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      element.textContent = Math.floor(current);
    }, 16);
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }
}

class NavigationSystem {
  constructor() {
    this.header = document.querySelector('.header');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.nav-menu');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupHeaderScroll();
    this.setupMobileMenu();
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - config.scrollOffset;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          if (this.mobileMenu.classList.contains('active')) {
            this.toggleMobileMenu();
          }
        }
      });
    });
  }

  setupActiveNavigation() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: `-${config.scrollOffset}px 0px -50% 0px`
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveNavLink(id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => observer.observe(section));
  }

  updateActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  }

  setupHeaderScroll() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      this.header.classList.toggle('scrolled', currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        this.header.style.transform = 'translateY(-100%)';
      } else {
        this.header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  setupMobileMenu() {
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    document.addEventListener('click', (e) => {
      if (!this.header.contains(e.target) && this.mobileMenu.classList.contains('active')) {
        this.toggleMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.mobileToggle.classList.toggle('active');
    this.mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }
}

class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.filterProjects(filter);
        this.updateActiveFilter(e.target);
      });
    });
  }

  filterProjects(filter) {
    this.projectCards.forEach(card => {
      const categories = card.dataset.category.split(',').map(cat => cat.trim());
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, config.animationDuration);
      }
    });
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }
}

class ContactForm {
  constructor() {
    this.form = document.querySelector('#contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupFormValidation();
    }
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        isValid = value.length >= 2;
        errorMessage = 'Nome deve ter pelo menos 2 caracteres';
        break;
      case 'email':
        isValid = this.isValidEmail(value);
        errorMessage = 'Email inválido';
        break;
      case 'message':
        isValid = value.length >= 10;
        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
        break;
    }

    this.setFieldError(field, isValid ? '' : errorMessage);
    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  setFieldError(field, message) {
    const errorElement = field.parentNode.querySelector('.field-error') ||
                        this.createErrorElement();
    
    if (message) {
      errorElement.textContent = message;
      field.parentNode.appendChild(errorElement);
      field.classList.add('error');
    } else {
      field.classList.remove('error');
      if (errorElement.parentNode) {
        errorElement.remove();
      }
    }
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  createErrorElement() {
    const error = document.createElement('span');
    error.className = 'field-error';
    error.style.color = 'var(--accent-color)';
    error.style.fontSize = 'var(--fs-sm)';
    error.style.marginTop = 'var(--spacing-xs)';
    error.style.display = 'block';
    return error;
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Validar todos os campos
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'pt';
      const errorMsg = currentLang === 'en' ? 
        'Please correct the errors in the form' : 
        'Por favor, corrija os erros no formulário';
      this.showNotification(errorMsg, 'error');
      return;
    }

    const formData = new FormData(this.form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();

    const whatsappMessage = this.formatWhatsAppMessage(name, email, subject, message);
    
    const phoneNumber = '5522999714055';
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'pt';
    
    submitBtn.disabled = true;
    submitBtn.textContent = currentLang === 'en' ? 'Redirecting...' : 'Redirecionando...';

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.open(whatsappURL, '_blank');
      
      const successMsg = currentLang === 'en' ? 
        'Redirecting to WhatsApp...' : 
        'Redirecionando para WhatsApp...';
      this.showNotification(successMsg, 'success');
      
      setTimeout(() => {
        this.form.reset();
      }, 2000);
      
    } catch (error) {
      const errorMsg = currentLang === 'en' ? 
        'Error opening WhatsApp. Please try again.' : 
        'Erro ao abrir WhatsApp. Tente novamente.';
      this.showNotification(errorMsg, 'error');
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 2000);
    }
  }

  formatWhatsAppMessage(name, email, subject, message) {
    const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'pt';
    
    if (currentLang === 'en') {
      return `🌟 *New Portfolio Message* 🌟

👤 *Name:* ${name}
📧 *Email:* ${email}
📋 *Subject:* ${subject}

💬 *Message:*
${message}

---
_Message sent through web portfolio_`;
    } else {
      return `🌟 *Nova Mensagem do Portfólio* 🌟

👤 *Nome:* ${name}
📧 *Email:* ${email}
📋 *Assunto:* ${subject}

💬 *Mensagem:*
${message}

---
_Mensagem enviada através do portfólio web_`;
    }
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: 'var(--spacing-md) var(--spacing-lg)',
      borderRadius: 'var(--radius-md)',
      color: 'white',
      fontWeight: '600',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out',
      backgroundColor: type === 'success' ? 'var(--secondary-color)' : 'var(--accent-color)'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

class PortfolioApp {
  constructor() {
    this.systems = {};
    this.init();
  }

  async init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initSystems());
    } else {
      this.initSystems();
    }
  }

  initSystems() {
    this.systems.language = new LanguageSystem();
    this.systems.animation = new AnimationSystem(this.systems.language);
    this.systems.navigation = new NavigationSystem();
    this.systems.projectFilter = new ProjectFilter();
    this.systems.contactForm = new ContactForm();
    
    this.setupGlobalEvents();
    
    console.log('Portfolio App initialized successfully!');
  }

  setupGlobalEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.systems.navigation.mobileMenu.classList.contains('active')) {
        this.systems.navigation.toggleMobileMenu();
      }
    });

    this.setupLazyLoading();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }
}

const app = new PortfolioApp();

window.PortfolioApp = PortfolioApp;