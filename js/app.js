const AppState = {
    currentPage: 'home', activeCategory: 'all', searchQuery: '',
    savedProperties: JSON.parse(localStorage.getItem('savedProperties') || '[]'),
    recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed') || '[]'),
    searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
    theme: localStorage.getItem('theme') || 'light',
    notifications: JSON.parse(localStorage.getItem('notifications') || JSON.stringify(demoNotifications)),
    messages: JSON.parse(localStorage.getItem('messages') || JSON.stringify(demoMessages)),
    inspections: JSON.parse(localStorage.getItem('inspections') || JSON.stringify(demoInspections)),
    userPreferences: JSON.parse(localStorage.getItem('userPreferences') || '{}'),
    currentProperty: null, currentChat: null, heroSlideIndex: 0,
    filterState: { location: [], type: [], bedrooms: [], minPrice: '', maxPrice: '', amenities: [], sortBy: 'recommended' }
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme(); initHeroCarousel(); renderCategories(); renderFeaturedProperties(); renderNearYou(); renderWhyChooseUs();
    renderBottomNav(); initSearch(); loadSavedProperties(); updateNotificationBadge();
});

function initTheme() { if (AppState.theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); }
function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    if (AppState.theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', AppState.theme);
    showToast(AppState.theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
}

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
    AppState.currentPage = page;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === page));
    switch(page) {
        case 'home': renderFeaturedProperties(); renderNearYou(); break;
        case 'search': renderSearchResults(); break;
        case 'saved': renderSavedProperties(); break;
        case 'messages': renderMessages(); break;
        case 'profile': renderProfile(); break;
        case 'notifications': renderNotifications(); break;
        case 'settings': renderSettings(); break;
        case 'inspection': renderInspections(); break;
        case 'applications': renderApplications(); break;
        case 'payment': renderPayment(); break;
    }
}

function renderBottomNav() {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    const items = [
        { page: 'home', label: 'Home', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
        { page: 'search', label: 'Search', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
        { page: 'saved', label: 'Saved', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
        { page: 'messages', label: 'Messages', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
        { page: 'profile', label: 'Profile', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' }
    ];
    nav.innerHTML = items.map(item => `<button class="nav-item ${item.page === 'home' ? 'active' : ''}" data-page="${item.page}" onclick="navigateTo('${item.page}')">${item.icon}<span>${item.label}</span></button>`).join('');
}

function initHeroCarousel() {
    renderHeroSlides();
    setInterval(() => nextHeroSlide(), 5000);
}

function renderHeroSlides() {
    const container = document.getElementById('hero-slides');
    const dots = document.getElementById('hero-dots');
    if (!container || !dots) return;
    container.innerHTML = heroSlides.map((slide, i) => {
        const [line1, line2] = slide.title.split('\\n');
        return `<div class="hero-slide ${i === 0 ? 'active' : ''}" data-slide="${i}"><div class="hero-content"><h2>${line1}<br>${line2}</h2><p>${slide.subtitle}</p><button class="hero-btn" onclick="navigateTo('search')">${slide.cta}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button></div><div class="hero-pin"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div class="hero-img-wrap"><img src="${slide.image}" alt="Hero" loading="lazy"></div></div>`;
    }).join('');
    dots.innerHTML = heroSlides.map((_, i) => `<button class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goToHeroSlide(${i})"></button>`).join('');
}

function nextHeroSlide() { goToHeroSlide((AppState.heroSlideIndex + 1) % heroSlides.length); }
function goToHeroSlide(index) {
    AppState.heroSlideIndex = index;
    document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === index));
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

function renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;
    const icons = {
        all: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        Apartment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 9h4"/><path d="M10 13h4"/></svg>',
        "Self Contain": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        Duplex: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-4 7 4v11"/><path d="M9 21v-5h6v5"/><path d="M10 9h4"/><path d="M10 13h4"/></svg>',
        Bungalow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        Shortlet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
    };
    container.innerHTML = categories.map(cat => `<button class="cat-item ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}" onclick="selectCategory('${cat.id}')"><div class="cat-icon-wrap">${icons[cat.id] || icons.all}</div><span class="cat-label">${cat.label}</span></button>`).join('');
}

function selectCategory(categoryId) {
    AppState.activeCategory = categoryId;
    document.querySelectorAll('.cat-item').forEach(item => item.classList.toggle('active', item.dataset.category === categoryId));
    filterAndRenderProperties();
}

function filterAndRenderProperties() {
    let filtered = properties;
    if (AppState.activeCategory !== 'all') filtered = properties.filter(p => p.type === AppState.activeCategory);
    if (AppState.searchQuery) {
        const q = AppState.searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.bedrooms.toString().includes(q));
    }
    renderFeaturedProperties(filtered);
    renderNearYou(filtered.slice(0, 5));
}

function renderFeaturedProperties(props) {
    const container = document.getElementById('featured-properties');
    if (!container) return;
    const data = props || properties.filter(p => p.featured);
    if (data.length === 0) { container.innerHTML = renderEmptyState('No properties found', 'Try adjusting your filters.'); return; }
    container.innerHTML = data.map(p => renderPropertyCard(p)).join('');
}

function renderNearYou(props) {
    const container = document.getElementById('near-you-properties');
    if (!container) return;
    const data = props || properties.slice(3, 8);
    container.innerHTML = data.map(p => renderNearCard(p)).join('');
}

function renderPropertyCard(p) {
    const isSaved = AppState.savedProperties.includes(p.id);
    return `<div class="prop-card" onclick="openPropertyDetails(${p.id})"><div class="prop-img-wrap"><img src="${p.images[0]}" alt="${p.title}" loading="lazy"><button class="prop-heart ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); toggleSaveProperty(${p.id})" aria-label="${isSaved ? 'Remove' : 'Save'}"><svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button><div class="prop-price-badge">${formatPrice(p.price)} <span>/ ${p.period}</span></div></div><div class="prop-info"><div class="prop-title">${p.title}</div><div class="prop-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${p.location}</div><div class="prop-features"><span class="prop-feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>${p.bedrooms} Beds</span><span class="prop-feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M19 21h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M12 15h.01"/></svg>${p.bathrooms} Baths</span><span class="prop-feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>${p.parking} Parking</span></div></div></div>`;
}

function renderNearCard(p) {
    return `<div class="near-card" onclick="openPropertyDetails(${p.id})"><img class="near-thumb" src="${p.images[0]}" alt="${p.title}" loading="lazy"><div class="near-info"><div class="near-title">${p.title}</div><div class="near-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${p.location}</div><div class="near-price">${formatPrice(p.price)} <span style="font-size:0.6875rem;color:var(--muted);font-weight:500;">/ ${p.period}</span></div></div></div>`;
}

function renderWhyChooseUs() {
    const container = document.getElementById('why-choose-us');
    if (!container) return;
    const reasons = [
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', title: "Verified Listings", desc: "All properties are verified and trusted" },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', title: "Best Prices", desc: "Get the best rental prices in the market" },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>', title: "24/7 Support", desc: "We are here to help you anytime" },
        { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', title: "Secure Payments", desc: "Your payments are safe and secure" }
    ];
    container.innerHTML = reasons.map(r => `<div class="why-card"><div class="why-icon">${r.icon}</div><div class="why-title">${r.title}</div><div class="why-desc">${r.desc}</div></div>`).join('');
}

function toggleSaveProperty(id) {
    const idx = AppState.savedProperties.indexOf(id);
    if (idx > -1) { AppState.savedProperties.splice(idx, 1); showToast('Removed from saved'); }
    else { AppState.savedProperties.push(id); showToast('Property saved'); }
    localStorage.setItem('savedProperties', JSON.stringify(AppState.savedProperties));
    if (AppState.currentPage === 'saved') renderSavedProperties();
    document.querySelectorAll('.prop-heart').forEach(btn => {
        const card = btn.closest('.prop-card');
        if (card) {
            const m = card.getAttribute('onclick').match(/openPropertyDetails\((\d+)\)/);
            if (m) { const pid = parseInt(m[1]); const saved = AppState.savedProperties.includes(pid); btn.classList.toggle('saved', saved); const svg = btn.querySelector('svg'); if (svg) svg.setAttribute('fill', saved ? 'currentColor' : 'none'); }
        }
    });
}

function loadSavedProperties() {}

function renderSavedProperties() {
    const container = document.getElementById('saved-properties-list');
    if (!container) return;
    if (AppState.savedProperties.length === 0) { container.innerHTML = renderEmptyState('No Saved Properties', 'Save properties you love and find them here later.', 'Explore Properties', "navigateTo('home')"); return; }
    const saved = properties.filter(p => AppState.savedProperties.includes(p.id));
    container.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">${saved.map(p => renderPropertyCard(p)).join('')}</div>`;
}

function initSearch() {
    const inputs = document.querySelectorAll('#search-input, #search-input-page');
    inputs.forEach(inp => {
        if (!inp) return;
        inp.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value.trim();
            inputs.forEach(i => { if (i !== e.target) i.value = e.target.value; });
            if (AppState.searchQuery && !AppState.searchHistory.includes(AppState.searchQuery)) {
                AppState.searchHistory.unshift(AppState.searchQuery); if (AppState.searchHistory.length > 10) AppState.searchHistory.pop();
                localStorage.setItem('searchHistory', JSON.stringify(AppState.searchHistory));
            }
            if (AppState.currentPage === 'home') filterAndRenderProperties();
            else if (AppState.currentPage === 'search') renderSearchResults();
        });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && AppState.searchQuery) navigateTo('search'); });
    });
}

function renderSearchResults() {
    const container = document.getElementById('search-results');
    const qd = document.getElementById('search-query-display');
    if (!container) return;
    const q = AppState.searchQuery;
    if (qd) qd.textContent = q ? `Results for "${q}"` : 'All Properties';
    let results = properties;
    if (q) {
        const ql = q.toLowerCase();
        results = properties.filter(p => p.title.toLowerCase().includes(ql) || p.location.toLowerCase().includes(ql) || p.city.toLowerCase().includes(ql) || p.type.toLowerCase().includes(ql) || p.bedrooms.toString().includes(ql) || p.price.toString().includes(ql));
    }
    results = applyFilters(results);
    if (results.length === 0) { container.innerHTML = renderEmptyState('No properties found', 'Try another location or adjust your filters.'); return; }
    container.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">${results.map(p => renderPropertyCard(p)).join('')}</div>`;
}

function openFilterDrawer() {
    document.getElementById('filter-overlay').classList.add('active');
    document.getElementById('filter-drawer').classList.add('active');
    document.body.style.overflow = 'hidden';
    renderFilterContent();
}
function closeFilterDrawer() {
    document.getElementById('filter-overlay').classList.remove('active');
    document.getElementById('filter-drawer').classList.remove('active');
    document.body.style.overflow = '';
}
function renderFilterContent() {
    renderChips('filter-location', ['Lagos','Abuja','Port Harcourt','Enugu','Ibadan'], AppState.filterState.location);
    renderChips('filter-type', ['Apartment','Self Contain','Duplex','Bungalow','Shortlet'], AppState.filterState.type);
    renderChips('filter-bedrooms', ['1','2','3','4+'], AppState.filterState.bedrooms);
    renderChips('filter-amenities', ['Parking','Security','Generator','Water','Air Conditioning','Furnished','POP Ceiling','Kitchen','Swimming Pool'], AppState.filterState.amenities);
}
function renderChips(id, items, selected) {
    const el = document.getElementById(id); if (!el) return;
    el.innerHTML = items.map(item => `<button class="filter-chip ${selected.includes(item)?'active':''}" onclick="toggleChip('${id}','${item}')">${item}</button>`).join('');
}
function toggleChip(containerId, value) {
    const key = containerId==='filter-location'?'location':containerId==='filter-type'?'type':containerId==='filter-bedrooms'?'bedrooms':'amenities';
    const arr = AppState.filterState[key]; const idx = arr.indexOf(value);
    if (idx > -1) arr.splice(idx, 1); else arr.push(value);
    renderFilterContent();
}
function applyFilters(data) {
    let r = [...data]; const f = AppState.filterState;
    if (f.location.length) r = r.filter(p => f.location.some(loc => p.city===loc || p.location.includes(loc)));
    if (f.type.length) r = r.filter(p => f.type.includes(p.type));
    if (f.bedrooms.length) r = r.filter(p => f.bedrooms.some(b => b==='4+'?p.bedrooms>=4:p.bedrooms===parseInt(b)));
    if (f.minPrice) r = r.filter(p => p.price >= parseInt(f.minPrice));
    if (f.maxPrice) r = r.filter(p => p.price <= parseInt(f.maxPrice));
    if (f.amenities.length) r = r.filter(p => f.amenities.every(a => p.amenities.includes(a)));
    switch(f.sortBy) { case 'lowest': r.sort((a,b)=>a.price-b.price); break; case 'highest': r.sort((a,b)=>b.price-a.price); break; case 'newest': r.sort((a,b)=>b.id-a.id); break; }
    return r;
}
function resetFilters() {
    AppState.filterState = { location:[], type:[], bedrooms:[], minPrice:'', maxPrice:'', amenities:[], sortBy:'recommended' };
    document.getElementById('min-price').value=''; document.getElementById('max-price').value=''; document.getElementById('sort-by').value='recommended';
    renderFilterContent(); showToast('Filters reset');
}
function applyFilterChanges() {
    AppState.filterState.minPrice = document.getElementById('min-price').value;
    AppState.filterState.maxPrice = document.getElementById('max-price').value;
    AppState.filterState.sortBy = document.getElementById('sort-by').value;
    closeFilterDrawer();
    if (AppState.currentPage === 'search') renderSearchResults(); else navigateTo('search');
    showToast('Filters applied');
}

function openPropertyDetails(id) {
    const p = properties.find(x => x.id === id); if (!p) return;
    AppState.currentProperty = p;
    if (!AppState.recentlyViewed.includes(id)) { AppState.recentlyViewed.unshift(id); if (AppState.recentlyViewed.length > 10) AppState.recentlyViewed.pop(); localStorage.setItem('recentlyViewed', JSON.stringify(AppState.recentlyViewed)); }
    renderPropertyDetails(p); navigateTo('property-details');
}

function renderPropertyDetails(p) {
    const container = document.getElementById('property-details-content'); if (!container) return;
    const isSaved = AppState.savedProperties.includes(p.id);
    container.innerHTML = `<div class="details-gallery"><img id="detail-image" src="${p.images[0]}" alt="${p.title}"><button class="gallery-nav prev" onclick="changeDetailImage(-1)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button><button class="gallery-nav next" onclick="changeDetailImage(1)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button><div class="gallery-dots">${p.images.map((_,i) => `<button class="gallery-dot ${i===0?'active':''}" onclick="setDetailImage(${i})"></button>`).join('')}</div></div><div class="details-title-section"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;"><h1 class="details-title">${p.title}</h1><button class="neu-btn-circle" style="width:40px;height:40px;flex-shrink:0;color:${isSaved?'#ef4444':'var(--muted)'};" onclick="toggleSaveProperty(${p.id})"><svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button></div><div class="details-rating"><svg class="star" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span style="font-weight:700;font-size:0.875rem;">${p.rating}</span><span style="color:var(--muted);font-size:0.8125rem;">(${p.reviews} reviews)</span></div><div class="prop-loc" style="margin-bottom:6px;"><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${p.location}</div><div class="details-price">${formatPricePeriod(p)}</div>${p.verified?'<span style="display:inline-flex;margin-top:8px;padding:4px 10px;background:linear-gradient(135deg,var(--success),#16a34a);color:white;font-size:0.625rem;font-weight:700;border-radius:var(--radius-full);">✓ Verified Property</span>':''}</div><div class="details-amenities-grid"><div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg><span class="val">${p.bedrooms}</span><span class="lbl">Bedrooms</span></div><div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M19 21h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/></svg><span class="val">${p.bathrooms}</span><span class="lbl">Bathrooms</span></div><div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg><span class="val">${p.parking}</span><span class="lbl">Parking</span></div><div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg><span class="val">${p.area}</span><span class="lbl">m²</span></div><div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span class="val">${p.type}</span><span class="lbl">Type</span></div></div><div class="details-section"><h3 class="details-section-title">Description</h3><p>${p.description}</p></div><div class="details-section"><h3 class="details-section-title">Amenities</h3><div class="amenities-list">${p.amenities.map(a => `<span class="amenity-tag"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${a}</span>`).join('')}</div></div><div class="details-section"><h3 class="details-section-title">Location</h3><div class="map-placeholder"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span style="margin-left:8px;">${p.location}</span></div></div><div class="details-section"><h3 class="details-section-title">Property Agent</h3><div class="agent-card"><img class="agent-avatar" src="${p.agent.avatar}" alt="${p.agent.name}"><div class="agent-info"><div class="agent-name">${p.agent.name}${p.agent.verified?'<span class="agent-badge">✓ Verified</span>':''}</div><div class="agent-rating"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${p.agent.rating} rating</div></div><div class="agent-actions"><button class="neu-btn-circle" style="width:40px;height:40px;" onclick="showToast('Calling ${p.agent.name}...')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button><button class="neu-btn-circle" style="width:40px;height:40px;" onclick="openChat(${p.id})"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button></div></div></div><div style="height:80px;"></div>`;
    container.dataset.imageIndex = '0'; container.dataset.images = JSON.stringify(p.images);
}

function changeDetailImage(dir) {
    const c = document.getElementById('property-details-content');
    const imgs = JSON.parse(c.dataset.images || '[]');
    let idx = parseInt(c.dataset.imageIndex || '0');
    idx = (idx + dir + imgs.length) % imgs.length; setDetailImage(idx);
}
function setDetailImage(idx) {
    const c = document.getElementById('property-details-content');
    const imgs = JSON.parse(c.dataset.images || '[]');
    const img = document.getElementById('detail-image');
    if (img && imgs[idx]) { img.src = imgs[idx]; c.dataset.imageIndex = idx.toString(); document.querySelectorAll('.gallery-dot').forEach((d,i) => d.classList.toggle('active', i===idx)); }
}

function renderMessages() {
    const container = document.getElementById('messages-list');
    if (!container) return;
    if (AppState.messages.length === 0) { container.innerHTML = renderEmptyState('No Messages', 'Start a conversation with an agent.'); return; }
    container.innerHTML = AppState.messages.map(chat => `<div class="chat-item" onclick="openChatScreen(${chat.id})"><img class="chat-avatar" src="${chat.avatar}" alt="${chat.agentName}"><div class="chat-info"><div class="chat-name">${chat.agentName}</div><div class="chat-preview">${chat.lastMessage}</div></div><div class="chat-meta"><div class="chat-time">${chat.time}</div>${chat.unread>0?`<span class="chat-unread">${chat.unread}</span>`:''}</div></div>`).join('');
}

function openChat(propertyId) {
    const p = properties.find(x => x.id === propertyId); if (!p) return;
    let chat = AppState.messages.find(c => c.agentId === p.agent.name);
    if (!chat) {
        chat = { id: Date.now(), agentId: p.agent.name, agentName: p.agent.name, propertyTitle: p.title, avatar: p.agent.avatar, lastMessage: "Start a conversation...", time: "Now", unread: 0, messages: [] };
        AppState.messages.unshift(chat); localStorage.setItem('messages', JSON.stringify(AppState.messages));
    }
    AppState.currentChat = chat; renderChatScreen(); navigateTo('chat');
}
function openChatScreen(chatId) {
    const chat = AppState.messages.find(c => c.id === chatId); if (!chat) return;
    AppState.currentChat = chat; chat.unread = 0;
    localStorage.setItem('messages', JSON.stringify(AppState.messages));
    updateNotificationBadge(); renderChatScreen(); navigateTo('chat');
}
function renderChatScreen() {
    const container = document.getElementById('chat-screen-content');
    const header = document.getElementById('chat-header-info');
    if (!container || !AppState.currentChat) return;
    const chat = AppState.currentChat;
    if (header) header.innerHTML = `<img class="chat-avatar" src="${chat.avatar}" alt="${chat.agentName}" style="width:38px;height:38px;"><div><div style="font-weight:700;font-size:0.875rem;">${chat.agentName}</div><div style="font-size:0.6875rem;color:var(--muted);">${chat.propertyTitle}</div></div>`;
    container.innerHTML = chat.messages.map(msg => `<div class="message ${msg.sent?'sent':'received'}"><div>${msg.text}</div><div class="message-time">${msg.time}</div></div>`).join('');
    setTimeout(() => container.scrollTop = container.scrollHeight, 50);
}
function sendChatMessage() {
    const input = document.getElementById('chat-input'); if (!input || !AppState.currentChat) return;
    const text = input.value.trim(); if (!text) return;
    const time = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    AppState.currentChat.messages.push({text, sent:true, time});
    AppState.currentChat.lastMessage = text; AppState.currentChat.time = time;
    input.value = ''; localStorage.setItem('messages', JSON.stringify(AppState.messages));
    renderChatScreen();
    setTimeout(() => {
        const replies = ["Thank you for your message. I'll get back to you shortly.","Yes, that works for me. Looking forward to meeting you.","The property is still available. Would you like to schedule a visit?","I can arrange a virtual tour if you're unable to visit in person.","The price is negotiable for serious buyers. Let's discuss."];
        const reply = replies[Math.floor(Math.random()*replies.length)];
        AppState.currentChat.messages.push({text:reply, sent:false, time:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})});
        AppState.currentChat.lastMessage = reply; localStorage.setItem('messages', JSON.stringify(AppState.messages));
        renderChatScreen(); showToast('New message received');
    }, 2000);
}

function renderNotifications() {
    const container = document.getElementById('notifications-list');
    if (!container) return;
    if (AppState.notifications.length === 0) { container.innerHTML = renderEmptyState('No Notifications', "You're all caught up!"); return; }
    container.innerHTML = AppState.notifications.map(n => `<div class="notif-item ${n.unread?'unread':''}" onclick="markNotifRead(${n.id})"><div class="notif-icon">${n.type==='property'?'🏠':n.type==='price'?'₦':n.type==='reminder'?'⏰':'💬'}</div><div class="notif-content"><div class="notif-title">${n.title}</div><div class="notif-desc">${n.description}</div></div><div class="notif-time">${n.time}</div></div>`).join('');
    AppState.notifications.forEach(n => n.unread = false); localStorage.setItem('notifications', JSON.stringify(AppState.notifications)); updateNotificationBadge();
}
function markNotifRead(id) { const n = AppState.notifications.find(x => x.id === id); if (n) { n.unread = false; localStorage.setItem('notifications', JSON.stringify(AppState.notifications)); } }
function updateNotificationBadge() {
    const badge = document.getElementById('nav-notification-badge');
    const count = AppState.notifications.filter(n => n.unread).length + AppState.messages.reduce((s,c) => s+c.unread, 0);
    if (badge) { if (count > 0) { badge.textContent = count > 9 ? '9+' : count; badge.style.display = 'flex'; } else badge.style.display = 'none'; }
}

function renderProfile() {
    const container = document.getElementById('profile-content'); if (!container) return;
    container.innerHTML = `<div class="profile-header"><img class="profile-avatar-lg" src="${userProfile.avatar}" alt="${userProfile.name}"><div class="profile-name">${userProfile.name}</div><div class="profile-email">${userProfile.email}</div><div class="profile-stats"><div class="profile-stat"><div class="profile-stat-val">${AppState.savedProperties.length}</div><div class="profile-stat-lbl">Saved</div></div><div class="profile-stat"><div class="profile-stat-val">${AppState.inspections.length}</div><div class="profile-stat-lbl">Inspections</div></div><div class="profile-stat"><div class="profile-stat-val">${AppState.messages.length}</div><div class="profile-stat-lbl">Messages</div></div></div></div><div class="profile-menu"><div class="profile-menu-item" onclick="navigateTo('saved')"><div class="profile-menu-icon">❤️</div><div class="profile-menu-text">Saved Properties</div><svg class="profile-menu-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="profile-menu-item" onclick="navigateTo('inspection')"><div class="profile-menu-icon">📅</div><div class="profile-menu-text">My Inspections</div><svg class="profile-menu-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="profile-menu-item" onclick="navigateTo('applications')"><div class="profile-menu-icon">📝</div><div class="profile-menu-text">My Applications</div><svg class="profile-menu-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="profile-menu-item" onclick="navigateTo('messages')"><div class="profile-menu-icon">💬</div><div class="profile-menu-text">Messages</div><svg class="profile-menu-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="profile-menu-item" onclick="navigateTo('notifications')"><div class="profile-menu-icon">🔔</div><div class="profile-menu-text">Notifications</div><svg class="profile-menu-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="profile-menu-item" onclick="navigateTo('settings')"><div class="profile-menu-icon">⚙️</div><div class="profile-menu-text">Settings</div><svg class="profile-menu-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div></div>`;
}

function renderSettings() {
    const container = document.getElementById('settings-content'); if (!container) return;
    const isDark = AppState.theme === 'dark'; const notifOn = AppState.userPreferences.notifications !== false;
    container.innerHTML = `<div class="settings-section"><div class="settings-section-title">Appearance</div><div class="settings-item"><div class="settings-icon">🌙</div><div class="settings-text">Dark Mode</div><div class="toggle-switch ${isDark?'on':''}" onclick="toggleTheme();renderSettings();"></div></div></div><div class="settings-section"><div class="settings-section-title">Preferences</div><div class="settings-item"><div class="settings-icon">🔔</div><div class="settings-text">Notifications</div><div class="toggle-switch ${notifOn?'on':''}" onclick="togglePref('notifications');renderSettings();"></div></div><div class="settings-item"><div class="settings-icon">💱</div><div class="settings-text">Currency</div><span style="color:var(--muted);font-size:0.8125rem;">Nigerian Naira (₦)</span></div><div class="settings-item"><div class="settings-icon">🌐</div><div class="settings-text">Language</div><span style="color:var(--muted);font-size:0.8125rem;">English</span></div></div><div class="settings-section"><div class="settings-section-title">Support</div><div class="settings-item" onclick="showToast('Help center coming soon')"><div class="settings-icon">❓</div><div class="settings-text">Help & Support</div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="settings-item" onclick="showToast('Privacy policy coming soon')"><div class="settings-icon">🔒</div><div class="settings-text">Privacy Policy</div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div><div class="settings-item" onclick="showToast('Terms of service coming soon')"><div class="settings-icon">📄</div><div class="settings-text">Terms of Service</div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div></div><div style="text-align:center;padding:24px;color:var(--muted);font-size:0.6875rem;">House Rental App v1.0</div>`;
}
function togglePref(key) { AppState.userPreferences[key] = !AppState.userPreferences[key]; localStorage.setItem('userPreferences', JSON.stringify(AppState.userPreferences)); showToast('Preferences updated'); }

function renderInspections() {
    const container = document.getElementById('inspections-list'); if (!container) return;
    if (AppState.inspections.length === 0) { container.innerHTML = renderEmptyState('No Inspections', 'Schedule property inspections to see them here.', 'Browse Properties', "navigateTo('home')"); return; }
    container.innerHTML = AppState.inspections.map(ins => { const p = properties.find(x => x.id === ins.propertyId); return `<div class="neu-soft" style="padding:14px;margin-bottom:10px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;"><h3 style="font-size:0.9375rem;font-weight:700;">${p?p.title:'Unknown'}</h3><span style="padding:3px 8px;background:${ins.status==='confirmed'?'var(--success)':'var(--warning)'};color:white;font-size:0.625rem;font-weight:700;border-radius:var(--radius-full);text-transform:uppercase;">${ins.status}</span></div><div style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:3px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${ins.date} at ${ins.time}</div><div style="font-size:0.75rem;color:var(--muted);">${ins.name}</div></div>`; }).join('');
}

function submitInspection() {
    const ps = document.getElementById('inspection-property');
    const d = document.getElementById('inspection-date');
    const t = document.getElementById('inspection-time');
    const n = document.getElementById('inspection-name');
    const ph = document.getElementById('inspection-phone');
    const msg = document.getElementById('inspection-message');
    if (!d.value || !t.value || !n.value || !ph.value) { showToast('Please fill all required fields', 'error'); return; }
    const ins = { id: Date.now(), propertyId: parseInt(ps.value), propertyTitle: ps.options[ps.selectedIndex].text, date: d.value, time: t.value, name: n.value, phone: ph.value, message: msg.value, status: 'pending' };
    AppState.inspections.push(ins); localStorage.setItem('inspections', JSON.stringify(AppState.inspections));
    showToast('Inspection request submitted'); d.value=''; t.value=''; n.value=''; ph.value=''; msg.value='';
    setTimeout(() => navigateTo('inspection'), 1500);
}

function renderApplications() {
    const container = document.getElementById('applications-list'); if (!container) return;
    container.innerHTML = renderEmptyState('No Applications', 'Your rental applications will appear here.', 'Browse Properties', "navigateTo('home')");
}

function renderPayment() {
    const container = document.getElementById('payment-content'); if (!container || !AppState.currentProperty) return;
    const p = AppState.currentProperty; const fee = Math.round(p.price * 0.05); const total = p.price + fee;
    container.innerHTML = `<div class="payment-summary"><div class="pay-row"><span>Property</span><span style="font-weight:600;">${p.title}</span></div><div class="pay-row"><span>Rental Price</span><span>${formatPrice(p.price)}</span></div><div class="pay-row"><span>Service Fee (5%)</span><span>${formatPrice(fee)}</span></div><div class="pay-row total"><span>Total</span><span>${formatPrice(total)}</span></div></div><h3 style="font-size:0.9375rem;font-weight:700;margin-bottom:14px;">Payment Method</h3><div class="pay-methods"><div class="pay-method selected" onclick="selectPayMethod(this)"><div class="pay-method-icon">💳</div><div class="pay-method-info"><div class="pay-method-name">Card Payment</div><div class="pay-method-desc">Pay with debit/credit card</div></div></div><div class="pay-method" onclick="selectPayMethod(this)"><div class="pay-method-icon">🏦</div><div class="pay-method-info"><div class="pay-method-name">Bank Transfer</div><div class="pay-method-desc">Transfer to our account</div></div></div><div class="pay-method" onclick="selectPayMethod(this)"><div class="pay-method-icon">👛</div><div class="pay-method-info"><div class="pay-method-name">Wallet</div><div class="pay-method-desc">Pay from your wallet balance</div></div></div></div><button class="btn-primary" style="width:100%;padding:14px;border-radius:var(--radius-lg);background:linear-gradient(135deg,var(--primary),var(--primary-light));color:white;font-weight:700;font-size:0.9375rem;border:none;box-shadow:0 6px 20px rgba(107,78,255,0.35);" onclick="processPayment()">Complete Payment</button><p style="text-align:center;font-size:0.6875rem;color:var(--muted);margin-top:14px;">This is a demo. No real payment will be processed.</p>`;
}
function selectPayMethod(el) { document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected')); el.classList.add('selected'); }
function processPayment() { showToast('Processing payment...'); setTimeout(() => { showToast('Payment successful!'); setTimeout(() => navigateTo('home'), 1500); }, 2000); }
function openPaymentFromDetails() { if (AppState.currentProperty) { renderPayment(); navigateTo('payment'); } }

function showToast(message, type) {
    const container = document.getElementById('toast-container'); if (!container) return;
    const toast = document.createElement('div'); toast.className = 'toast';
    toast.innerHTML = `<span style="font-weight:700;color:${type==='error'?'var(--danger)':'var(--primary)'}">${type==='error'?'✕':'✓'}</span> ${message}`;
    container.appendChild(toast); setTimeout(() => toast.remove(), 2800);
}

function renderEmptyState(title, desc, btnText, btnAction) {
    return `<div class="empty-state"><div class="empty-icon">🏠</div><div class="empty-title">${title}</div><div class="empty-desc">${desc}</div>${btnText?`<button class="btn-primary" style="padding:12px 24px;border-radius:var(--radius-full);background:linear-gradient(135deg,var(--primary),var(--primary-light));color:white;font-weight:700;border:none;box-shadow:0 4px 15px rgba(107,78,255,0.35);" onclick="${btnAction}">${btnText}</button>`:''}</div>`;
}
