/* =============================================
   PORTFOLIO ARTUR GUERRA — Main JS
   ============================================= */

const translations = {
    pt: {
        'nav.about': 'Sobre',
        'nav.skills': 'Skills',
        'nav.experience': 'Experiencia',
        'nav.projects': 'Projetos',
        'nav.contact': 'Contato',

        'hero.badge': 'Disponivel para projetos',
        'hero.role': 'Full-Stack Developer',
        'hero.description': 'Transformando ideias em solucoes digitais robustas, escalaveis e elegantes. Especializado em backend, frontend, mobile e infraestrutura completa.',
        'hero.cta_projects': 'Ver Projetos',
        'hero.cta_contact': 'Fale Comigo',

        'about.title': 'Sobre Mim',
        'about.text': 'Sou um desenvolvedor full-stack apaixonado por criar solucoes digitais completas — do backend ao deploy. Trabalho com Python, FastAPI, Flask, React, Next.js, Node.js, React Native, Angular e toda a stack de infraestrutura. Meu foco e entregar sistemas robustos, seguros e escalaveis que resolvem problemas reais.',
        'about.stat_projects': 'Projetos',
        'about.stat_experience': 'Ano XP',
        'about.stat_technologies': 'Tecnologias',
        'about.stat_clients': 'Cliente',
        'about.cv_pt': 'Baixar CV (PT)',
        'about.cv_en': 'Download CV (EN)',

        'skills.title': 'Tech Stack',
        'skills.backend': 'Backend',
        'skills.frontend': 'Frontend & Mobile',
        'skills.database': 'Database',
        'skills.devops': 'DevOps & Infra',

        'experience.title': 'Experiencia',
        'exp.freelancer.period': '2025',
        'exp.freelancer.title': 'Desenvolvedor SaaS (Freelancer)',
        'exp.freelancer.company': 'Pecci Cuidado Integrado',
        'exp.freelancer.desc': 'Desenvolvi um sistema completo de gerenciamento para clinicas de psicologia, incluindo gestao de pacientes, agendamentos e evolucoes clinicas com criptografia de dados (LGPD). Stack: Python, Flask, PostgreSQL, Bootstrap, JavaScript.',
        'exp.student.period': '2025 - 2028',
        'exp.student.title': 'Sistemas de Informacao',
        'exp.student.company': 'CEFET/RJ - UNED Nova Friburgo',
        'exp.student.desc': 'Cursando Bacharelado em Sistemas de Informacao, aprofundando conhecimentos em desenvolvimento de software, arquitetura de sistemas, banco de dados e metodologias de desenvolvimento.',

        'projects.title': 'Projetos',
        'projects.featured': 'Destaque',
        'projects.view': 'Ver Projeto',
        'projects.code': 'Codigo',
        'projects.all': 'Ver todos no GitHub',
        'project.pecci.title': 'Pecci Cuidado Integrado',
        'project.pecci.desc': 'Sistema completo de gerenciamento para clinicas de psicologia com dashboard personalizado, gestao de pacientes, agendamentos e criptografia de dados sensiveis conforme LGPD.',
        'project.pecci.security': 'Seguranca',
        'project.pecci.compliant': 'Conforme',
        'project.pecci.modules': 'Modulos',
        'project.encurta.title': 'Encurta AI',
        'project.encurta.desc': 'Encurtador de URLs moderno com interface elegante, sistema de autenticacao e gerenciamento completo de links.',
        'project.fantasy.title': 'Fantasy Game',
        'project.fantasy.desc': 'Fantasy game completo com arquitetura inovadora, sistema de ligas, pontuacao em tempo real e ranking dinamico.',
        'project.cesh.title': 'CESH',
        'project.cesh.desc': 'Alternativa moderna ao portal academico do CEFET, feita por alunos. Horarios, notas, calendario, rede social entre alunos e discussao sobre materias. Facilita a rotina academica.',
        'project.futuresports.title': 'Future Sports CRM',
        'project.futuresports.desc': 'Sistema CRM completo para gestao de academias e centros esportivos, com controle de alunos, planos, pagamentos e relatorios.',
        'project.zelo.title': 'Zelo App',
        'project.zelo.desc': 'Aplicativo mobile em desenvolvimento para cuidado e bem-estar, com foco em experiencia do usuario e design moderno.',
        'projects.wip': 'Em construcao',

        'contact.title': 'Contato',
        'contact.intro': 'Estou sempre aberto a novos projetos e oportunidades. Vamos construir algo incrivel juntos.',
        'contact.location_label': 'Localizacao',
        'contact.location': 'Nova Friburgo, RJ - Brasil',
        'contact.form.name_ph': 'Seu nome',
        'contact.form.email_ph': 'Seu email',
        'contact.form.subject_ph': 'Assunto',
        'contact.form.message_ph': 'Sua mensagem...',
        'contact.form.send': 'Enviar via WhatsApp',

        'footer.desc': 'Full-Stack Developer',
        'footer.rights': 'Todos os direitos reservados.'
    },
    en: {
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        'hero.badge': 'Available for projects',
        'hero.role': 'Full-Stack Developer',
        'hero.description': 'Turning ideas into robust, scalable, and elegant digital solutions. Specialized in backend, frontend, mobile, and full infrastructure.',
        'hero.cta_projects': 'View Projects',
        'hero.cta_contact': 'Get in Touch',

        'about.title': 'About Me',
        'about.text': 'I\'m a full-stack developer passionate about building complete digital solutions — from backend to deployment. I work with Python, FastAPI, Flask, React, Next.js, Node.js, React Native, Angular, and the full infrastructure stack. My focus is delivering robust, secure, and scalable systems that solve real problems.',
        'about.stat_projects': 'Projects',
        'about.stat_experience': 'Year XP',
        'about.stat_technologies': 'Technologies',
        'about.stat_clients': 'Client',
        'about.cv_pt': 'Download CV (PT)',
        'about.cv_en': 'Download CV (EN)',

        'skills.title': 'Tech Stack',
        'skills.backend': 'Backend',
        'skills.frontend': 'Frontend & Mobile',
        'skills.database': 'Database',
        'skills.devops': 'DevOps & Infra',

        'experience.title': 'Experience',
        'exp.freelancer.period': '2025',
        'exp.freelancer.title': 'SaaS Developer (Freelancer)',
        'exp.freelancer.company': 'Pecci Cuidado Integrado',
        'exp.freelancer.desc': 'Developed a complete management system for psychology clinics, including patient management, appointments, and clinical evolution tracking with data encryption (LGPD). Stack: Python, Flask, PostgreSQL, Bootstrap, JavaScript.',
        'exp.student.period': '2025 - 2028',
        'exp.student.title': 'Information Systems',
        'exp.student.company': 'CEFET/RJ - UNED Nova Friburgo',
        'exp.student.desc': 'Pursuing Bachelor\'s in Information Systems, deepening knowledge in software development, system architecture, databases, and development methodologies.',

        'projects.title': 'Projects',
        'projects.featured': 'Featured',
        'projects.view': 'View Project',
        'projects.code': 'Code',
        'projects.all': 'See all on GitHub',
        'project.pecci.title': 'Pecci Cuidado Integrado',
        'project.pecci.desc': 'Complete management system for psychology clinics with custom dashboard, patient management, appointments, and encryption for sensitive data (LGPD compliant).',
        'project.pecci.security': 'Security',
        'project.pecci.compliant': 'Compliant',
        'project.pecci.modules': 'Modules',
        'project.encurta.title': 'Encurta AI',
        'project.encurta.desc': 'Modern URL shortener with elegant interface, user authentication, and complete link management.',
        'project.fantasy.title': 'Fantasy Game',
        'project.fantasy.desc': 'Complete fantasy game with innovative architecture, league system, real-time scoring, and dynamic rankings.',
        'project.cesh.title': 'CESH',
        'project.cesh.desc': 'Modern alternative to the CEFET academic portal, built by students. Schedules, grades, calendar, social networking between students, and course discussions. Simplifies academic life.',
        'project.futuresports.title': 'Future Sports CRM',
        'project.futuresports.desc': 'Complete CRM system for gyms and sports centers, with student management, plans, payments, and reports.',
        'project.zelo.title': 'Zelo App',
        'project.zelo.desc': 'Mobile app under development focused on care and well-being, with emphasis on user experience and modern design.',
        'projects.wip': 'Under construction',

        'contact.title': 'Contact',
        'contact.intro': 'I\'m always open to new projects and opportunities. Let\'s build something amazing together.',
        'contact.location_label': 'Location',
        'contact.location': 'Nova Friburgo, RJ - Brazil',
        'contact.form.name_ph': 'Your name',
        'contact.form.email_ph': 'Your email',
        'contact.form.subject_ph': 'Subject',
        'contact.form.message_ph': 'Your message...',
        'contact.form.send': 'Send via WhatsApp',

        'footer.desc': 'Full-Stack Developer',
        'footer.rights': 'All rights reserved.'
    }
};

/* =============================================
   APP
   ============================================= */
class PortfolioApp {
    constructor() {
        this.lang = localStorage.getItem('portfolio-lang') || 'pt';
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initLanguage();
        this.initHeader();
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initActiveNav();
        this.initRevealAnimations();
        this.initCounters();
        this.initContactForm();
        this.initScrollTop();
    }

    /* ---- Language ---- */
    initLanguage() {
        this.applyLanguage(this.lang);
        this.updateLangToggle();

        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const newLang = opt.dataset.lang;
                if (newLang === this.lang) return;
                this.lang = newLang;
                localStorage.setItem('portfolio-lang', newLang);
                this.applyLanguage(newLang);
                this.updateLangToggle();
                this.updateCVButtons();
            });
        });

        this.updateCVButtons();
    }

    applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const t = translations[lang]?.[key];
            if (t) el.textContent = t;
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const t = translations[lang]?.[key];
            if (t) el.placeholder = t;
        });
    }

    updateLangToggle() {
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === this.lang);
        });
    }

    updateCVButtons() {
        const ptBtn = document.querySelector('.cv-btn-pt');
        const enBtn = document.querySelector('.cv-btn-en');
        if (ptBtn) ptBtn.style.display = this.lang === 'pt' ? 'inline-flex' : 'none';
        if (enBtn) enBtn.style.display = this.lang === 'en' ? 'inline-flex' : 'none';
    }

    /* ---- Header ---- */
    initHeader() {
        const header = document.getElementById('header');
        let lastY = 0;

        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            header.classList.toggle('scrolled', y > 50);
            header.classList.toggle('hidden', y > lastY && y > 120);
            lastY = y;
        }, { passive: true });
    }

    /* ---- Mobile Menu ---- */
    initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const menu = document.getElementById('mobileMenu');
        if (!toggle || !menu) return;

        const links = menu.querySelectorAll('.mobile-link');

        const close = () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', () => {
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        links.forEach(link => link.addEventListener('click', close));

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menu.classList.contains('active')) close();
        });
    }

    /* ---- Smooth Scroll ---- */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ---- Active Nav ---- */
    initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(s => observer.observe(s));
    }

    /* ---- Reveal Animations ---- */
    initRevealAnimations() {
        const elements = document.querySelectorAll('[data-reveal]');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    /* ---- Stat Counters ---- */
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');

        const animate = (el) => {
            const target = parseInt(el.dataset.count);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            const tick = () => {
                current += step;
                if (current >= target) {
                    el.textContent = target + '+';
                    return;
                }
                el.textContent = Math.floor(current);
                requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    /* ---- Contact Form ---- */
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', e => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            // Validation
            let valid = true;
            this.clearErrors(form);

            if (name.length < 2) { this.showFieldError(form.name); valid = false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.showFieldError(form.email); valid = false; }
            if (subject.length < 2) { this.showFieldError(form.subject); valid = false; }
            if (message.length < 10) { this.showFieldError(form.message); valid = false; }

            if (!valid) {
                const msg = this.lang === 'en'
                    ? 'Please fill all fields correctly'
                    : 'Preencha todos os campos corretamente';
                this.toast(msg, 'error');
                return;
            }

            // Format WhatsApp message
            const waMsg = this.lang === 'en'
                ? `*New Portfolio Message*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}\n\n---\n_Sent from web portfolio_`
                : `*Nova Mensagem do Portfolio*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Assunto:* ${subject}\n\n*Mensagem:*\n${message}\n\n---\n_Enviada pelo portfolio web_`;

            const waURL = `https://api.whatsapp.com/send?phone=5522999714055&text=${encodeURIComponent(waMsg)}`;

            window.open(waURL, '_blank');

            const successMsg = this.lang === 'en'
                ? 'Redirecting to WhatsApp...'
                : 'Redirecionando para WhatsApp...';
            this.toast(successMsg, 'success');

            setTimeout(() => form.reset(), 2000);
        });
    }

    showFieldError(field) {
        field.classList.add('error');
    }

    clearErrors(form) {
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }

    toast(message, type) {
        const el = document.createElement('div');
        el.className = `toast toast-${type}`;
        el.textContent = message;
        document.body.appendChild(el);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => el.classList.add('show'));
        });

        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 400);
        }, 4000);
    }

    /* ---- Scroll to Top ---- */
    initScrollTop() {
        const btn = document.getElementById('scrollTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* Boot */
new PortfolioApp();
