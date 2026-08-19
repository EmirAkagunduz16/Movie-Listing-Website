# CineVault – Movie Listing Website

A modern movie listing web application built with **Vue 3**, **Vite**, and **Bootstrap 5**. Browse popular, top-rated, upcoming, and now playing movies powered by the TMDB API.

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Vue 3 | ^3.5.40 | Frontend framework (Composition API) |
| Vite | ^8.1.5 | Build tool & dev server |
| Bootstrap | ^5.3.8 | CSS framework, responsive layout, components |
| Bootstrap Icons | ^1.x | Icon library |
| Pinia | ^4.0.2 | State management |
| Vue Router | ^5.2.0 | Client-side routing |
| Axios | ^1.19.0 | HTTP client for TMDB API |
| TypeScript | ~6.0.0 | Type safety |

## 🎨 Bootstrap Entegrasyonu

### Bootstrap Projeye Nasıl Entegre Edildi?

Bootstrap, `npm` paketi olarak yüklendi ve `main.ts` üzerinden CSS ve JS bundle olarak import edildi:

```typescript
// src/main.ts
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// ...
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
```

Dark/Light tema desteği Bootstrap 5.3'ün `data-bs-theme` attribute'u ile sağlanmaktadır.

### Kullanılan Bootstrap Component'leri

| Component | Kullanım Yeri |
|---|---|
| **Navbar** | Ana navigasyon (`navbar`, `navbar-expand-sm`, `navbar-toggler`, `collapse`) |
| **Card** | Film kartları (`card`, `card-img-top`, `card-body`) |
| **Pagination** | Sayfalama (`pagination`, `page-item`, `page-link`) |
| **Badge** | Rating badge, genre pills (`badge`, `rounded-pill`) |
| **Alert** | Hata mesajları (`alert alert-danger`) |
| **Button** | Tüm butonlar (`btn`, `btn-danger`, `btn-outline-light`, `btn-success`) |
| **Form Control** | Arama inputu (`form-control`, `input-group`) |
| **Placeholder** | Skeleton loader (`placeholder-glow`, `placeholder`) |

### Kullanılan Bootstrap Utility Class'ları

| Kategori | Kullanılan Class'lar |
|---|---|
| **Layout** | `container`, `row`, `col-*`, `row-cols-*` |
| **Flexbox** | `d-flex`, `flex-column`, `flex-wrap`, `align-items-center`, `justify-content-between`, `gap-*` |
| **Spacing** | `p-*`, `m-*`, `py-*`, `px-*`, `mb-*`, `mt-*`, `g-3` |
| **Display** | `d-none`, `d-sm-inline`, `d-flex`, `d-block`, `d-inline-flex` |
| **Position** | `position-relative`, `position-absolute`, `top-0`, `start-0`, `end-0` |
| **Text** | `fw-bold`, `fw-semibold`, `fs-5`, `display-5`, `text-center`, `lh-sm`, `fst-italic` |
| **Color** | `text-white`, `text-body-secondary`, `text-body-tertiary`, `text-warning`, `text-danger`, `bg-dark`, `bg-opacity-75` |
| **Border** | `border`, `border-top`, `border-bottom`, `rounded-3`, `rounded-circle`, `rounded-pill` |
| **Sizing** | `w-100`, `h-100`, `min-vh-100` |
| **Other** | `shadow`, `shadow-lg`, `overflow-hidden`, `object-fit-cover`, `img-fluid`, `opacity-75` |

### Responsive Yapılar

| Breakpoint | Navbar | Film Grid | Detay Sayfa |
|---|---|---|---|
| **xs** (< 576px) | Hamburger menü | 2 kolon | Tek kolon (poster üst) |
| **sm** (≥ 576px) | Tam navbar | 3 kolon | Tek kolon |
| **md** (≥ 768px) | Tam navbar | 4 kolon | 2 kolon (poster sol) |
| **lg** (≥ 992px) | Tam navbar | 5 kolon | 2 kolon |
| **xl** (≥ 1200px) | Tam navbar | 6 kolon | 2 kolon |

### Yapılan Temel Değişiklikler

1. **HeadlessUI kaldırıldı** → Bootstrap Navbar `collapse` ve `navbar-toggler` kullanıldı
2. **Heroicons kaldırıldı** → Bootstrap Icons (`bi-*` class'ları) kullanıldı
3. **Tailwind utility class'ları kaldırıldı** → Bootstrap utility class'ları ile değiştirildi
4. **Film grid yapısı** → Bootstrap `row-cols-*` responsive grid sistemi
5. **Film kartları** → Bootstrap `card` component'i
6. **Sayfalama** → Bootstrap `pagination` component'i
7. **Hata mesajları** → Bootstrap `alert` component'i
8. **Skeleton loader** → Bootstrap `placeholder-glow` component'i
9. **Custom CSS minimuma indirildi** → Sadece proje'ye özel stiller (card hover efekti, hero arka plan, indigo accent renk) korundu

## 🚀 Projenin Çalıştırılması

### Gereksinimler

- Node.js ^22.18.0 veya >=24.12.0
- npm

### Kurulum

```sh
npm install
```

### Geliştirme (Development)

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Build Önizleme

```sh
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── assets/
│   └── main.css              # Bootstrap override'ları ve custom stiller
├── components/
│   ├── layout/
│   │   ├── Navbar.vue         # Bootstrap Navbar component'i
│   │   ├── MovieListLayout.vue # Ana sayfa layout'u (grid + pagination)
│   │   └── AppFooter.vue      # Footer
│   ├── movie/
│   │   └── MovieCard.vue      # Bootstrap Card component'i
│   └── shared/
│       ├── HeroSection.vue    # Hero banner
│       ├── Pagination.vue     # Bootstrap Pagination
│       ├── SkeletonLoader.vue # Bootstrap Placeholder loader
│       └── ErrorMessage.vue   # Bootstrap Alert
├── composables/
│   └── useTheme.ts           # Dark/Light tema (data-bs-theme)
├── constants/
│   └── categories.ts         # Film kategorileri
├── router/
│   └── index.ts              # Vue Router yapılandırması
├── service/
│   ├── api.ts                # Axios instance
│   └── tmdb.ts               # TMDB API çağrıları
├── stores/
│   └── movieStore.ts         # Pinia store
├── types/
│   └── index.ts              # TypeScript tip tanımları
├── utils/
│   ├── formatters.ts         # Tarih, süre, rating formatlama
│   └── storage.ts            # LocalStorage yardımcıları
├── views/
│   ├── HomeView.vue           # Ana sayfa / Kategori sayfaları
│   ├── MovieDetailView.vue    # Film detay sayfası
│   ├── SearchView.vue         # Arama sonuçları
│   ├── FavoritesView.vue      # Favori filmler
│   └── NotFoundView.vue       # 404 sayfası
├── App.vue                    # Root component
└── main.ts                    # Giriş noktası
```

## 📝 Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
