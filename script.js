// Sweet Pharmacy — vanilla JS shop logic (no frameworks, no build step)
(function () {
  'use strict';

  /* ---------------- Data ---------------- */

  const CATEGORIES = [
    { id: 'hair', name: 'Коса и скалп', desc: 'Шампоани и серуми', icon: iconHair() },
    { id: 'skin', name: 'Дерматокозметика', desc: 'Кремове и почистване', icon: iconSkin() },
    { id: 'supplements', name: 'Добавки', desc: 'Витамини и минерали', icon: iconPill() },
    { id: 'immune', name: 'Имунитет', desc: 'Защита през сезона', icon: iconShield() },
  ];

  const PRODUCTS = [
    {
      id: 'p1', name: 'Anti-Hairloss Шампоан', cat: 'hair',
      desc: 'Стимулира растежа и укрепва фоликула с кофеин и биотин.',
      price: 32.9, oldPrice: 39.9, badge: 'Best seller', color: '#2f6f5e',
    },
    {
      id: 'p2', name: 'Успокояващ шампоан за чувствителна кожа', cat: 'hair',
      desc: 'Без сулфати, с пантенол — за раздразнена скалп.',
      price: 27.5, badge: null, color: '#3c7d69',
    },
    {
      id: 'p3', name: 'Серум против косопад', cat: 'hair',
      desc: 'Концентрирана формула с редензил за видим резултат.',
      price: 48.0, badge: 'Ново', color: '#265244',
    },
    {
      id: 'p4', name: 'Хидратиращ крем за лице', cat: 'skin',
      desc: 'С хиалуронова киселина за 24-часова хидратация.',
      price: 36.2, badge: null, color: '#c9a15a',
    },
    {
      id: 'p5', name: 'Почистващ гел с пробиотици', cat: 'skin',
      desc: 'Балансира микробиома на кожата, без изсушаване.',
      price: 24.9, badge: null, color: '#b6893f',
    },
    {
      id: 'p6', name: 'Регенериращ нощен крем', cat: 'skin',
      desc: 'Ретинол и пептиди за възстановяване през нощта.',
      price: 42.0, oldPrice: 49.0, badge: 'Промо', color: '#8f6a30',
    },
    {
      id: 'p7', name: 'Omega-3 Капсули', cat: 'supplements',
      desc: '1000мг рибено масло за сърце и мозък, 90 капсули.',
      price: 29.9, badge: 'Ново', color: '#235b47',
    },
    {
      id: 'p8', name: 'Магнезий + Витамин B6', cat: 'supplements',
      desc: 'Подпомага нервната система и намалява умората.',
      price: 18.4, badge: null, color: '#2f6f5e',
    },
    {
      id: 'p9', name: 'Колаген пептиди на прах', cat: 'supplements',
      desc: 'За кожа, коса и стави — 300г, вкус ванилия.',
      price: 44.5, badge: null, color: '#16352c',
    },
    {
      id: 'p10', name: 'Витамин C 1000мг + Цинк', cat: 'immune',
      desc: 'Ефервесцентни таблетки за силен имунитет.',
      price: 15.9, badge: null, color: '#c9a15a',
    },
    {
      id: 'p11', name: 'Пробиотичен комплекс 20 млрд', cat: 'immune',
      desc: '10 щама за здрав чревен микробиом и имунитет.',
      price: 34.9, badge: 'Best seller', color: '#b6893f',
    },
    {
      id: 'p12', name: 'Витамин D3 + K2 капки', cat: 'immune',
      desc: 'За здрави кости и подсилена имунна защита, 30мл.',
      price: 21.0, badge: null, color: '#3c7d69',
    },
  ];

  const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
  const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  /* ---------------- Icons (inline SVG, no external assets) ---------------- */

  function iconHair() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 3c3 0 4 3 4 6s-2 4-2 7 2 5 2 5M12 3c3 0 4 3 4 6s-2 4-2 7 2 5 2 5M18 3c2 0 3 2 3 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }
  function iconSkin() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M9 12a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }
  function iconPill() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="10.5" width="16" height="7" rx="3.5" transform="rotate(-45 12 14)" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9.5l5 5" stroke="currentColor" stroke-width="1.6"/></svg>';
  }
  function iconShield() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function iconBottle(color) {
    return `<svg viewBox="0 0 100 100" fill="none">
      <rect x="34" y="10" width="32" height="14" rx="3" fill="${color}" opacity="0.9"/>
      <rect x="30" y="24" width="40" height="60" rx="10" fill="${color}"/>
      <rect x="38" y="38" width="24" height="30" rx="3" fill="#faf8f3" opacity="0.85"/>
    </svg>`;
  }

  /* ---------------- State ---------------- */

  const CART_KEY = 'sweetpharmacy_cart_v1';
  let cart = loadCart();
  let activeFilter = 'all';
  let searchQuery = '';

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  /* ---------------- Rendering ---------------- */

  const categoryGrid = document.getElementById('categoryGrid');
  const productGrid = document.getElementById('productGrid');
  const filterRow = document.getElementById('filterRow');
  const emptyState = document.getElementById('emptyState');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const drawerFooter = document.getElementById('drawerFooter');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountEl = document.getElementById('cartCount');

  function renderCategories() {
    categoryGrid.innerHTML = CATEGORIES.map((c) => `
      <button class="category-card" data-cat="${c.id}">
        <span class="category-icon">${c.icon}</span>
        <h3>${c.name}</h3>
        <span>${c.desc}</span>
      </button>
    `).join('');

    categoryGrid.querySelectorAll('.category-card').forEach((el) => {
      el.addEventListener('click', () => {
        activeFilter = el.dataset.cat;
        syncFilterChips();
        renderProducts();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function renderFilterChips() {
    const chips = [{ id: 'all', name: 'Всички' }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name }))];
    filterRow.innerHTML = chips.map((c) => `<button class="filter-chip${c.id === activeFilter ? ' is-active' : ''}" data-filter="${c.id}">${c.name}</button>`).join('');
    filterRow.querySelectorAll('.filter-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        syncFilterChips();
        renderProducts();
      });
    });
  }

  function syncFilterChips() {
    filterRow.querySelectorAll('.filter-chip').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.filter === activeFilter);
    });
  }

  function renderProducts() {
    const query = searchQuery.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchesCat = activeFilter === 'all' || p.cat === activeFilter;
      const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });

    emptyState.hidden = filtered.length !== 0;
    productGrid.classList.remove('is-filtering');
    productGrid.innerHTML = filtered.map((p) => `
      <article class="product-card">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-media" style="background:${hexToSoft(p.color)}">${iconBottle(p.color)}</div>
        <div class="product-body">
          <span class="product-cat">${CATEGORY_MAP[p.cat].name}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-foot">
            <span class="product-price">${p.oldPrice ? `<small>${p.oldPrice.toFixed(2)} лв</small>` : ''}${p.price.toFixed(2)} лв</span>
            <button class="add-btn" data-add="${p.id}" aria-label="Добави в кошницата">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');
    requestAnimationFrame(() => productGrid.classList.add('is-filtering'));

    productGrid.querySelectorAll('[data-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.add);
        btn.classList.add('is-added');
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        setTimeout(() => {
          btn.classList.remove('is-added');
          btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        }, 1100);
      });
    });
  }

  function hexToSoft(hex) {
    return `${hex}1a`; // ~10% opacity backdrop
  }

  /* ---------------- Cart ---------------- */

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    bumpCartIcon();
    showToast(`${PRODUCT_MAP[id].name} добавен в кошницата`);
  }

  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    // Update state immediately so cart totals/checkout are always accurate;
    // only the DOM removal itself is deferred for the exit animation.
    delete cart[id];
    saveCart();

    const row = cartItemsEl.querySelector(`.cart-item[data-id="${id}"]`);
    if (row) {
      row.classList.add('is-removing');
      setTimeout(renderCart, 200);
    } else {
      renderCart();
    }
  }

  function cartEntries() {
    return Object.entries(cart)
      .map(([id, qty]) => ({ product: PRODUCT_MAP[id], qty }))
      .filter((e) => e.product);
  }

  function cartTotal() {
    return cartEntries().reduce((sum, e) => sum + e.product.price * e.qty, 0);
  }

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function renderCart() {
    const entries = cartEntries();
    cartCountEl.textContent = String(cartCount());

    if (entries.length === 0) {
      cartItemsEl.innerHTML = '';
      cartEmptyEl.classList.add('is-visible');
      drawerFooter.style.display = 'none';
      return;
    }

    cartEmptyEl.classList.remove('is-visible');
    drawerFooter.style.display = 'block';

    cartItemsEl.innerHTML = entries.map(({ product, qty }) => `
      <div class="cart-item" data-id="${product.id}">
        <div class="cart-item-media" style="background:${hexToSoft(product.color)}">${iconBottle(product.color)}</div>
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <div class="cart-item-price">${product.price.toFixed(2)} лв</div>
          <div class="qty-controls">
            <button data-dec="${product.id}" aria-label="Намали">−</button>
            <span>${qty}</span>
            <button data-inc="${product.id}" aria-label="Увеличи">+</button>
            <button class="remove-btn" data-remove="${product.id}">Премахни</button>
          </div>
        </div>
      </div>
    `).join('');

    cartItemsEl.querySelectorAll('[data-inc]').forEach((b) => b.addEventListener('click', () => changeQty(b.dataset.inc, 1)));
    cartItemsEl.querySelectorAll('[data-dec]').forEach((b) => b.addEventListener('click', () => changeQty(b.dataset.dec, -1)));
    cartItemsEl.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => removeFromCart(b.dataset.remove)));

    cartTotalEl.textContent = `${cartTotal().toFixed(2)} лв`;
  }

  /* ---------------- Drawer / Modal / Nav / Search ---------------- */

  const cartDrawer = document.getElementById('cartDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const mainNav = document.getElementById('mainNav');
  const searchBar = document.getElementById('searchBar');

  function openCart() {
    cartDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
  }

  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('drawerOverlay').addEventListener('click', () => {
    closeCart();
    closeCheckout();
  });
  document.getElementById('cartEmptyCta').addEventListener('click', closeCart);

  document.getElementById('navToggle').addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
  });
  mainNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mainNav.classList.remove('is-open')));

  document.getElementById('searchToggle').addEventListener('click', () => {
    searchBar.classList.toggle('is-open');
    if (searchBar.classList.contains('is-open')) {
      document.getElementById('searchInput').focus();
    }
  });
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  function openCheckout() {
    if (cartCount() === 0) return;
    renderCheckoutSummary();
    checkoutOverlay.classList.add('is-open');
  }
  function closeCheckout() {
    checkoutOverlay.classList.remove('is-open');
  }
  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
  checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) closeCheckout();
  });

  function renderCheckoutSummary() {
    const entries = cartEntries();
    const rows = entries.map((e) => `<div class="sum-row"><span>${e.product.name} × ${e.qty}</span><span>${(e.product.price * e.qty).toFixed(2)} лв</span></div>`).join('');
    document.getElementById('checkoutSummary').innerHTML = `${rows}<div class="sum-row sum-total"><span>Общо</span><span>${cartTotal().toFixed(2)} лв</span></div>`;
  }

  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    cart = {};
    saveCart();
    renderCart();
    closeCheckout();
    closeCart();
    e.target.reset();
    showToast('Поръчката е приета! Ще се свържем с вас за потвърждение.');
  });

  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast('Абонирахте се успешно за нашия бюлетин.');
  });

  /* ---------------- Toast ---------------- */

  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  /* ---------------- Scroll reveal ---------------- */

  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    targets.forEach((el) => observer.observe(el));
  }

  /* ---------------- Header scroll state ---------------- */

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Cart icon bump ---------------- */

  function bumpCartIcon() {
    const btn = document.getElementById('cartToggle');
    const count = document.getElementById('cartCount');
    [btn, count].forEach((el) => {
      el.classList.remove('is-bumped');
      requestAnimationFrame(() => el.classList.add('is-bumped'));
    });
  }

  /* ---------------- Init ---------------- */

  document.getElementById('year').textContent = String(new Date().getFullYear());
  renderCategories();
  renderFilterChips();
  renderProducts();
  renderCart();
  initReveal();
  initHeaderScroll();
})();
