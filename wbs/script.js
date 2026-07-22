/* ========================================
   Avangard - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded');
    var o = document.getElementById('introOverlay');
    if (o) { o.style.display = 'none'; }
    document.body.style.overflow = '';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var lenis = null;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } catch(e) {
    console.warn('Lenis failed', e);
  }

  /* ========================================
     Intro Animation
     ======================================== */
  var introOverlay = document.getElementById('introOverlay');
  var introLetters = document.querySelectorAll('.intro-letter');
  var introLogo = document.querySelector('.intro-overlay-logo');

  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  if (lenis) lenis.stop();

  function hideIntro() {
    if (!introOverlay || introOverlay.dataset.hidden === 'true') return;
    introOverlay.dataset.hidden = 'true';
    introOverlay.style.display = 'none';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (lenis) lenis.start();
  }

  var introTL = gsap.timeline({ onComplete: hideIntro });

  introTL
    .fromTo(introLogo,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      0.1
    )
    .fromTo(introLetters,
      { opacity: 0, y: '2rem' },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06 },
      0.3
    )
    .to(introOverlay, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '+=0.8');

  setTimeout(hideIntro, 6000);

  /* ========================================
     Header Logo Reveal
     ======================================== */
  var logoSvg = document.querySelector('.logo-svg');
  if (logoSvg) {
    gsap.fromTo(logoSvg,
      { opacity: 0, x: '2rem' },
      { opacity: 1, x: 0, duration: 1, ease: 'expo.out', delay: 1.6 }
    );
  }

  /* ========================================
     Header Scroll Behavior
     ======================================== */
  var header = document.getElementById('siteHeader');
  var logoSvg = document.querySelector('.logo-svg');
  var logoImg = document.querySelector('.logo-img');
  var headerAnimated = false;
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: function(self) {
      if (isMenuOpen) return;
      if (self.progress > 0.3 && !headerAnimated) {
        headerAnimated = true;
        header.classList.add('collapsed');
        if (logoSvg) gsap.to(logoSvg, { width: 0, opacity: 0, duration: 0.8, ease: 'power3.inOut' });
      } else if (self.progress <= 0.3 && headerAnimated) {
        headerAnimated = false;
        header.classList.remove('collapsed');
        if (logoSvg) gsap.to(logoSvg, { width: 'auto', opacity: 1, duration: 0.8, ease: 'power3.inOut' });
      }
    }
  });

  /* ========================================
     Menu Toggle
     ======================================== */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var isMenuOpen = false;

  menuToggle.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active', isMenuOpen);
    mobileMenu.classList.toggle('open', isMenuOpen);
    if (isMenuOpen) {
      header.classList.remove('collapsed');
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  });

  document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
    link.addEventListener('click', function() {
      isMenuOpen = false;
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    });
  });

  /* ========================================
     Hero Content Reveal
     ======================================== */
  var heroVideo = document.querySelector('.hero-video');
  var heroTagline = document.querySelector('.hero-tagline');
  var heroScroll = document.querySelector('.hero-scroll-btn');

  if (heroVideo) {
    gsap.fromTo(heroVideo,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.inOut', delay: 0.5 }
    );
  }

  if (heroTagline) {
    gsap.fromTo(heroTagline,
      { opacity: 0, y: '2rem' },
      { opacity: 0.9, y: 0, duration: 1, ease: 'expo.out', delay: 2 }
    );
  }

  if (heroScroll) {
    gsap.fromTo(heroScroll,
      { opacity: 0 },
      { opacity: 0.6, duration: 1, ease: 'expo.out', delay: 2.3, onComplete: function() {
        heroScroll.classList.add('visible');
      }}
    );
  }

  /* ========================================
     Intro Section Parallax
     ======================================== */
  var introMedia = document.querySelector('.media-wrap');
  if (introMedia) {
    gsap.fromTo(introMedia,
      { y: '10rem', scale: 1.1 },
      {
        y: '-5rem', scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      }
    );
  }

  /* ========================================
     Section Black Background Reveal on Scroll
     ======================================== */
  var darkSections = ['.intro-section', '.gallery-section', '.case-list', '.storytelling'];
  darkSections.forEach(function(sel) {
    var el = document.querySelector(sel);
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        }
      }
    );
  });

  /* ========================================
     Gallery Grid Parallax
     ======================================== */
  var galleryCols = document.querySelectorAll('.gallery-col');
  galleryCols.forEach(function(col, index) {
    var direction = index === 0 ? -1 : index === 2 ? 1 : 0;
    gsap.fromTo(col,
      { y: direction * -60 },
      {
        y: direction * 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      }
    );
  });

  var galleryTiles = document.querySelectorAll('.js-gallery-tile');
  galleryTiles.forEach(function(tile) {
    gsap.fromTo(tile,
      { opacity: 0, y: '4rem', scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: 'expo.out',
        scrollTrigger: {
          trigger: tile,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  /* ========================================
     Text Reveal Animations (SplitType)
     ======================================== */
  setTimeout(function() {
    if (typeof SplitType === 'undefined') return;
    try {
      var textEls = document.querySelectorAll('.h2, .h2-alt, .h4, .footer-1, .body-large');
      textEls.forEach(function(el) {
        if (el.closest('.intro-overlay')) return;
        el.classList.add('js-reveal-text');
        var split = new SplitType(el, { types: 'words, chars' });
        gsap.fromTo(split.chars,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1, filter: 'blur(0px)',
            duration: 0.8, stagger: 0.02, ease: 'linear',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      });
    } catch(e) { console.warn('SplitType failed', e); }
  }, 100);

  /* ========================================
     Case Cards Reveal
     ======================================== */
  var caseCards = document.querySelectorAll('.case-card');
  caseCards.forEach(function(card) {
    var inner = card.querySelector('.case-card-inner');
    if (!inner) return;
    gsap.fromTo(inner,
      { opacity: 0, y: '3rem' },
      {
        opacity: 1, y: 0,
        duration: 1, ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 60%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  /* ========================================
     Statement Reveal
     ======================================== */
  var statementText = document.querySelector('.media-hero-exp .h4');
  if (statementText) {
    gsap.fromTo(statementText,
      { opacity: 0, y: '4rem' },
      {
        opacity: 1, y: 0,
        duration: 1.2, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.media-hero-exp',
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  /* ========================================
     Story Section Reveal
     ======================================== */
  var storyMedia1 = document.querySelector('.story-media-1');
  var storyMedia2 = document.querySelector('.story-media-2');

  if (storyMedia1) {
    gsap.fromTo(storyMedia1,
      { opacity: 0, y: '4rem', scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.storytelling',
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  if (storyMedia2) {
    gsap.fromTo(storyMedia2,
      { opacity: 0, y: '6rem', scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1, ease: 'expo.out', delay: 0.15,
        scrollTrigger: {
          trigger: '.storytelling',
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  /* ========================================
     Footer Reveal
     ======================================== */
  var footerHeading = document.querySelector('.footer-1');
  var footerBtn = document.querySelector('.site-footer .btn');

  if (footerHeading) {
    gsap.fromTo(footerHeading,
      { opacity: 0, y: '3rem' },
      {
        opacity: 1, y: 0,
        duration: 1, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  if (footerBtn) {
    gsap.fromTo(footerBtn,
      { opacity: 0, y: '2rem' },
      {
        opacity: 1, y: 0,
        duration: 1, ease: 'expo.out', delay: 0.1,
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  /* ========================================
     Button Hover Effects
     ======================================== */
  document.querySelectorAll('.btn, .menu-toggle, .lang-toggle').forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
      gsap.to(btn, { scale: 1.02, duration: 0.4, ease: 'expo.out' });
    });
    btn.addEventListener('mouseleave', function() {
      gsap.to(btn, { scale: 1, duration: 0.4, ease: 'expo.out' });
    });
  });

  /* ========================================
     Auto-play Music
     ======================================== */
  var bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.play().catch(function() {
      document.addEventListener('click', function playOnFirstClick() {
        bgMusic.play();
        document.removeEventListener('click', playOnFirstClick);
      });
    });
  }

  /* ========================================
     Smooth Scroll for Anchor Links
     ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.5 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ========================================
     Language Toggle
     ======================================== */
  var translations = {
    bg: {
      nav_portfolio: 'Портфолио',
      nav_services: 'Услуги',
      nav_about: 'За нас',
      nav_contact: 'Контакт',
      hero_tagline: 'Водени от Дизайна и AI',
      intro_text: 'Като специалисти в дигиталния маркетинг, ние помагаме на нашите клиенти да се адаптират и да ускорят растежа си<em>\u2014трансформирайки техните платформи, хора и процеси, за да водят на пазара.</em>',
      gallery_heading: 'Изграждаме следващото поколение<em>умни преживявания.</em>',
      service_1: 'Meta ADS<br>Реклама',
      service_2: 'Управление на<br>Социални профили',
      service_3: 'Изработка на<br>Уебсайтове',
      service_4_label: 'Клиентски резултат',
      service_4: 'Успешни<br>Кампании',
      statement: 'Помагаме на бизнесите да постигнат място в ръцете, домовете и сърцата на милиони<em>\u2014съчетавайки световноизследване, креативен дизайн и технологии, които реализират немислимото.</em>',
      story: 'Творческата агенция, избрана от лидери да визионира утрешния ден<em>\u2014и да го стартира днес.</em>',
      footer_heading: 'Да поговорим. <em>Ще се радваме<br>да чуем от вас.</em>',
      footer_btn: 'Контакт',
      footer_privacy: 'Поверителност & Условия',
      menu_label: 'Меню'
    },
    en: {
      nav_portfolio: 'Portfolio',
      nav_services: 'Services',
      nav_about: 'About',
      nav_contact: 'Contact',
      hero_tagline: 'Led by Design and AI',
      intro_text: 'As digital marketing specialists, we help our clients adapt and accelerate their growth<em>\u2014transforming their platforms, people and processes to lead the market.</em>',
      gallery_heading: 'We build the next generation of<em>smart experiences.</em>',
      service_1: 'Meta ADS<br>Advertising',
      service_2: 'Social Media<br>Management',
      service_3: 'Website<br>Development',
      service_4_label: 'Client Results',
      service_4: 'Successful<br>Campaigns',
      statement: 'We help businesses reach the hands, homes and hearts of millions<em>\u2014combining world-class research, creative design and technologies that make the impossible possible.</em>',
      story: 'The creative agency chosen by leaders to envision tomorrow<em>\u2014and launch it today.</em>',
      footer_heading: 'Let\'s talk. <em>We\'d love to<br>hear from you.</em>',
      footer_btn: 'Contact',
      footer_privacy: 'Privacy & Terms',
      menu_label: 'Menu'
    }
  };

  var currentLang = 'bg';
  var langToggle = document.getElementById('langToggle');
  var menuLabel = document.querySelector('.menu-toggle-label');

  function setLang(lang) {
    currentLang = lang;
    var t = translations[lang];
    document.querySelectorAll('[data-t]').forEach(function(el) {
      var key = el.getAttribute('data-t');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });
    if (menuLabel) menuLabel.textContent = t.menu_label;
    document.documentElement.lang = lang;
    var lbl = langToggle.querySelector('.lang-toggle-label');
    if (lbl) lbl.textContent = lang === 'bg' ? 'EN' : 'BG';
  }

  if (langToggle) {
    langToggle.addEventListener('click', function() {
      setLang(currentLang === 'bg' ? 'en' : 'bg');
    });
  }

});
