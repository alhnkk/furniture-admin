# 🏠 Derya Mimarlık Tasarım - Kapsamlı Roadmap

## 📋 Proje Özeti

Modern teknolojilerle geliştirilecek mutfak, banyo ve ev dekorasyon portfolyo sitesi için detaylı roadmap. Proje iki ayrı uygulama olarak geliştirilecektir:

### 🎨 **Frontend (Showcase Site)** - `derya-showcase`

Müşterilerin projeleri, mobilyaları ve iç mimari çalışmaları görüntüleyebileceği, 3D modelleri inceleyebileceği ve randevu alabileceği profesyonel vitrin sitesi

### ⚙️ **Admin Panel** - `derya-admin`

İç mimarların ve yöneticilerin projeleri, ürünleri, randevuları ve site içeriğini yönetebileceği kapsamlı yönetim paneli

---

## 🛠 Teknoloji Stack

### 🎨 Frontend (Showcase Site)

- **Next.js 14** - React framework (App Router, TypeScript)
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN** - Modern UI component library
- **Framer Motion** - Smooth animasyonlar
- **Three.js** - 3D model görüntüleme
- **next-i18next** - Çoklu dil desteği
- **Prisma Client** - Database queries (Read-only)
- **Domain**: `www.deryamimarlik.com`

### ⚙️ Admin Panel (API Provider + Management Interface)

- **Next.js 14** - React framework (App Router, TypeScript)
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN** - Modern UI component library
- **Clerk** - Authentication ve user management
- **Cloudinary** - Image storage ve optimization
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Primary database
- **Next.js API Routes** - Public API endpoints (Frontend için)
- **Domain**: `admin.deryamimarlik.com`

### 🗄️ Backend Architecture

- **PostgreSQL** - Primary database
- **Prisma** - ORM ve database yönetimi
- **Clerk** - Authentication ve authorization
- **Cloudinary** - Media storage ve CDN
- **Admin Panel API** - Public API routes (`admin.deryamimarlik.com/api/*`)
- **Rate Limiting** - API güvenliği

---

## 🚀 Faz 1: Backend ve Database Kurulumu (1-3)

### 1. Backend Setup

- [x] Prisma ve PostgreSQL kurulumu
- [x] Clerk authentication kurulumu
- [x] Cloudinary storage yapılandırması (resimler için)
- [x] API anahtarları ve environment variables
- [x] Middleware ve güvenlik politikaları

### 2. Database Schema Tasarımı

- [x] Prisma schema tasarımı:
  - [x] **Project** tablosu (id, name, description, category, status, images, client, year, location)
  - [x] **Category** tablosu (id, name, slug, description, image_url, parent_id)
    - Mutfak Dolabı
    - Banyo Dolabı
    - İç Oda Kapıları
    - Parke
    - Genç Odası
    - Yatak Odası
    - Portmanto
    - TV Ünitesi
    - Ofis Mobilyası
    - Koltuk
    - Merdiven
    - Çelik Kapı
    - Giyinme Odası
    - Ranza
    - Resepsiyon Bankosu
  - [x] **Material** tablosu (id, name, description, image_url)
  - [x] **Color** tablosu (id, name, value, material_id)
  - [x] **Dimension** tablosu (id, name, width, height, depth, unit)
  - [x] **Gallery** tablosu (id, project_id, image_url, alt_text, display_order, before_after)
  - [ ] **Appointment** tablosu (id, name, email, phone, date, message, status)
  - [ ] **Translation** tablosu (id, key, tr_text, en_text)
  - [x] **User** tablosu (Clerk entegrasyonu için)
  - [x] **Settings** tablosu (id, site_name, contact_info, social_media, meta_data)
- [x] Database migration çalıştırma
- [x] Test data ekleme

### 3. Admin Panel API Routes Tasarımı

- [x] Public API endpoints (Admin panel içinde, Frontend için):
  - [x] `GET admin.deryamimarlik.com/api/projects` - Proje listesi
  - [x] `GET admin.deryamimarlik.com/api/projects/[slug]` - Proje detayı
  - [x] `GET admin.deryamimarlik.com/api/categories` - Kategori listesi
  - [x] `GET admin.deryamimarlik.com/api/materials` - Materyal listesi
  - [x] `GET admin.deryamimarlik.com/api/colors` - Renk listesi
  - [ ] `GET admin.deryamimarlik.com/api/search` - Arama endpoint'i
- [x] Protected Admin API endpoints (Admin panel için):
  - [x] `POST/PUT/DELETE /api/admin/*` - Full CRUD operations
  - [ ] `POST /api/admin/bulk/*` - Bulk upload operations
  - [x] `GET /api/admin/analytics` - Analytics endpoints
- [x] API middleware ve rate limiting

---

## 🎨 Faz 2: Frontend (Showcase Site) Geliştirme (4-9)

### 4. Frontend Projesi Kurulumu

- [ ] Next.js 14 projesi oluşturma (`derya-showcase`)
- [ ] TypeScript, ESLint, Prettier konfigürasyonu
- [ ] Tailwind CSS kurulumu
- [ ] ShadCN UI kurulumu
- [ ] Framer Motion kurulumu
- [ ] API client setup (Admin panel API'lerine erişim için)
- [ ] Environment variables (Admin panel API URL)

### 5. Frontend UI Components

- [ ] Layout komponenti (Header, Footer, Navigation)
- [ ] ProjectCard komponenti
- [ ] ProjectGrid komponenti
- [ ] BeforeAfter komponenti
- [ ] MaterialCard komponenti
- [ ] ColorPicker komponenti
- [ ] SearchBar komponenti
- [ ] FilterSidebar komponenti
- [ ] LoadingStates ve Error komponenti

### 6. Homepage & Hero Section

- [ ] Full-screen video/slider hero section
- [ ] Parallax scrolling efektleri
- [ ] Featured projects showcase
- [ ] Kategoriler bölümü
- [ ] Son projeler galerisi
- [ ] İstatistikler bölümü (yıl, proje sayısı, vb.)
- [ ] Instagram feed entegrasyonu
- [ ] WhatsApp iletişim butonu

### 7. Proje ve Portfolyo Sayfaları

- [ ] Proje listeleme sayfası (`/projects`)
- [ ] Detaylı proje sayfaları (`/project/[slug]`)
- [ ] Proje kategorileri ve filtreleme
- [ ] Before/After görsel karşılaştırma
- [ ] 3D model görüntüleyici
- [ ] Sanal tur entegrasyonu
- [ ] Materyal ve renk seçimi
- [ ] Boyut ve ölçü gösterimi

### 8. Hizmetler ve İletişim

- [ ] Kategori detay sayfaları
- [ ] Online randevu sistemi
- [ ] İletişim formu ve harita
- [ ] WhatsApp/Telefon hızlı erişim
- [ ] Sosyal medya entegrasyonu
- [ ] Çoklu dil desteği (TR/EN)

### 9. Search & Filter System

- [ ] Real-time search implementation
- [ ] Advanced filtreleme:
  - Kategori
  - Materyal
  - Renk
  - Boyut
  - Lokasyon
- [ ] Search suggestions/autocomplete
- [ ] Search results pagination
- [ ] Filter persistence (URL params)

---

## ⚙️ Faz 3: Admin Panel Geliştirme (10-15)

### 10. Admin Panel Projesi Kurulumu

- [x] Next.js 14 projesi oluşturma (`derya-admin`)
- [x] TypeScript, ESLint, Prettier konfigürasyonu
- [x] Tailwind CSS ve ShadCN UI kurulumu
- [x] Clerk authentication kurulumu
- [x] Prisma ORM kurulumu
- [x] Next.js API Routes kurulumu (Public + Protected)
- [x] CORS konfigürasyonu (Frontend erişimi için)

### 11. Authentication & Authorization

- [x] Clerk provider kurulumu
- [x] Admin role tanımlama ve middleware
- [x] Protected routes oluşturma
- [x] Login/logout sayfaları
- [ ] User permissions sistemi

### 12. Admin Dashboard

- [x] Dashboard ana sayfa tasarımı
- [x] İstatistik kartları:
  - Toplam proje sayısı
  - Aktif randevular
  - Tamamlanan projeler
  - Ziyaretçi istatistikleri
- [ ] Recent activities feed
- [x] Quick actions menüsü
- [x] Analytics grafikler (Chart.js)

### 13. Project Management

- [x] Proje listeleme sayfası (tablo view)
- [x] Yeni proje ekleme formu
- [x] Proje düzenleme sayfası
- [x] Before/After resim yönetimi
- [ ] 3D model yükleme
- [x] Materyal ve renk seçimi
- [x] Boyut ve ölçü girişi
- [ ] Bulk operations (çoklu seçim, silme)
- [x] Draft/Published status

### 14. Image & Gallery Management

- [x] Çoklu resim upload sistemi (drag & drop)
- [x] Image preview ve crop functionality
- [ ] Before/After resim eşleştirme
- [ ] Resim sıralama (drag & drop)
- [x] Alt text ve SEO optimizasyonu
- [x] Image compression ve WebP conversion
- [ ] Bulk image operations

### 15. Site Settings & Configuration

- [x] Site ayarları sayfası (logo, başlık, açıklama)
- [x] Kategori yönetimi (CRUD)
- [x] Materyal yönetimi
- [x] Renk yönetimi
- [ ] SEO settings (meta tags, schema markup)
- [x] Contact information management
- [ ] Social media links
- [x] Theme customization

---

## 🚄 Faz 4: Optimizasyon & Entegrasyon (16-19)

### 16. Performance Optimization

- [x] **Frontend**: Next.js Image optimization
- [x] **Frontend**: Code splitting ve lazy loading
- [x] **Frontend**: Static site generation (SSG)
- [x] **Frontend**: Incremental Static Regeneration (ISR)
- [ ] **Frontend**: Service Worker ve PWA desteği
- [x] **Backend**: API route caching
- [x] **Backend**: Database query optimization
- [x] **Backend**: Rate limiting implementation
- [x] **Media**: Image compression ve WebP dönüşümü
- [x] **Media**: Cloudinary CDN kullanımı
- [ ] **Media**: Responsive image serving
- [ ] **Media**: Video optimization

### 17. SEO & Analytics

- [ ] Meta tags implementation
- [ ] Sitemap generation
- [ ] Robots.txt configuration
- [ ] Schema markup implementation
- [ ] Google Analytics setup
- [ ] Google Search Console setup
- [ ] Performance monitoring
- [ ] User behavior tracking

### 18. Testing & Quality Assurance

- [x] ESLint ve Prettier entegrasyonu
- [x] TypeScript type checking
- [ ] Unit testing setup
- [ ] Integration testing
- [ ] End-to-end testing
- [ ] Performance testing
- [ ] Security testing
- [ ] Cross-browser testing

### 19. Deployment & DevOps

- [x] Vercel deployment setup
- [x] Environment variables configuration
- [x] CI/CD pipeline setup
- [x] Domain configuration
- [ ] SSL sertifikası
- [ ] Backup strategy
- [ ] Monitoring setup
- [ ] Error tracking (Sentry)

---

## 🎯 Faz 5: Deployment & Launch (20-22)

### 20. Frontend Deployment

- [ ] Vercel deployment konfigürasyonu
- [ ] Custom domain bağlama (`www.deryamimarlik.com`)
- [ ] SSL sertifikası kurulumu
- [ ] Environment variables ayarları
- [ ] Build ve deploy scripts

### 21. Admin Panel Deployment

- [ ] Vercel deployment konfigürasyonu
- [ ] Custom domain bağlama (`admin.deryamimarlik.com`)
- [ ] SSL sertifikası kurulumu
- [ ] Environment variables ayarları
- [ ] Build ve deploy scripts

### 22. Launch & Monitoring

- [ ] Final security checks
- [ ] Performance monitoring setup
- [ ] Error tracking (Sentry)
- [ ] Backup stratejisi
- [ ] Documentation
- [ ] Training ve handover

---

## 📈 Beklenen Performans Metrikleri

### Frontend (Showcase) Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Admin Panel Lighthouse Scores

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: N/A (Private)

### Teknik Özellikler

- ⚡ **Frontend**: First Contentful Paint < 1.2s
- 🖼️ **Frontend**: Largest Contentful Paint < 2.0s
- 📱 Fully responsive (320px - 2560px)
- 🔐 Enterprise-level security
- 🔍 Advanced search capabilities
- 📊 Real-time analytics

---

## 🏗️ Proje Yapısı

```
📦 workspace/
├── 📂 derya-showcase/          # Frontend (Showcase Site)
│   ├── 📂 app/
│   ├── 📂 components/
│   ├── 📂 lib/
│   │   └── 📄 api-client.ts        # Admin panel API client
│   └── 📂 public/
└── 📂 derya-admin/             # Admin Panel (API + Management)
    ├── 📂 app/
    │   ├── 📂 api/                 # Public API routes (Frontend için)
    │   │   ├── 📄 projects/
    │   │   ├── 📄 categories/
    │   │   ├── 📄 materials/
    │   │   ├── 📄 colors/
    │   │   ├── 📄 search/
    │   │   └── 📂 admin/           # Protected API routes
    │   └── 📂 (dashboard)/         # Admin UI pages
    ├── 📂 components/
    ├── 📂 lib/
    │   ├── 📄 prisma.ts
    │   └── 📄 supabase.ts
    └── 📂 prisma/
        └── 📄 schema.prisma
```

---

## 💡 Önemli Notlar

### Geliştirme Stratejisi

1. **Admin Panel önce**: Database, API routes ve admin interface
2. **Frontend sonra**: Admin panel API'lerini consume eden showcase site
3. **Ayrı repository'ler**: Her proje için ayrı Git repo
4. **API-first yaklaşım**: Admin panel hem yönetim hem API provider

### Güvenlik Yaklaşımı

- **Frontend**: Admin panel public API'lerine HTTP call (read-only)
- **Admin**: Clerk authentication, protected routes ve API endpoints
- **Database**: Row Level Security (RLS) policies
- **API**: Rate limiting, CORS ve input validation
- **Public API**: Sadece GET endpoints, protected data

### Deployment Stratejisi

- **Frontend**: Vercel Edge Network (global)
- **Admin**: Vercel (restricted access)
- **Database**: Supabase (managed PostgreSQL)
- **Images**: Supabase Storage + CDN

---

## 🎯 Sonuç

Bu roadmap ile modern, hızlı ve güvenli bir mobilya showcase ekosistemi geliştirilecektir:

- **2 ayrı Next.js uygulaması**
- **1 paylaşılan Supabase backend**
- **Toplam tahmini süre**: 6-8 hafta
- **Ayrı domainler ve deployment**
- **Enterprise-level güvenlik**

**Frontend URL**: `https://www.deryamimarlik.com`
**Admin URL**: `https://admin.deryamimarlik.com`

**Proje Başlangıç Tarihi**: _Belirtilecek_
**Tahmini Tamamlanma Tarihi**: _Belirtilecek_
**Geliştirici**: _Belirtilecek_
