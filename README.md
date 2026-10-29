# MyCalc — Platform Kalkulator Cepat & Akurat

**MyCalc** adalah platform kalkulator praktis untuk kebutuhan sehari-hari: keuangan, kesehatan, pendidikan, dan teknik. Dibangun dengan filosofi: **cepat, akurat, privasi, dan bebas iklan**.

## ✨ Fitur Utama

| Kategori       | Kalkulator             | Deskripsi                                                                         |
| -------------- | ---------------------- | --------------------------------------------------------------------------------- |
| **Kesehatan**  | BMI & Berat Ideal      | Indeks Massa Tubuh (standar WHO Asia-Pasifik), berat ideal Broca, BMR, TDEE       |
| **Kesehatan**  | Kalori (BMR & TDEE)    | Estimasi kebutuhan kalori harian dengan formula Mifflin-St Jeor & Harris-Benedict |
| **Keuangan**   | Diskon & Cashback      | Diskon bertingkat, voucher, cashback, promo beli X gratis Y                       |
| **Pendidikan** | IPK & Nilai Rata-rata  | IPS semester, IPK kumulatif, proyeksi target, konversi skala nilai                |
| **Teknik**     | Konversi Satuan        | Panjang, berat, suhu, luas, volume, kecepatan, waktu, penyimpanan digital         |
| **Umum**       | Matematika & Saintifik | Aritmatika, persentase, dan riwayat perhitungan                                   |

## 🚀 Teknologi

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **UI**: React 19 + Tailwind CSS v4
- **Compiler**: [React Compiler](https://react.dev/learn/react-compiler) (optimasi otomatis)
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/) (Material Design)
- **Fonts**: [Geist](https://vercel.com/font) via `next/font`
- **Language**: JavaScript (ESM) dengan JSDoc
- **Deployment**: Vercel / Static Export ready

## 📦 Instalasi & Menjalankan

```bash
# Clone repository
git clone https://github.com/username/my-calc.git
cd my-calc

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run start

# Linting
npm run lint
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🏗️ Struktur Proyek

```
my-calc/
├── app/                    # Next.js App Router
│   ├── kalkulator/         # Route halaman kalkulator
│   │   ├── bmi/
│   │   ├── diskon/
│   │   ├── ipk/
│   │   ├── konversi/
│   │   ├── matematika/
│   │   └── tdee/
│   ├── tentang/            # Halaman About
│   ├── layout.js           # Root layout + fonts
│   ├── page.js             # Halaman beranda (katalog)
│   └── globals.css         # Global styles + CSS variables
├── components/
│   ├── calculators/        # Komponen kalkulator per domain
│   │   ├── bmi/
│   │   ├── conversion/
│   │   ├── discount/
│   │   ├── education/
│   │   ├── math/
│   │   └── tdee/
│   ├── layout/             # Header, Footer
│   ├── pages/              # Page components (BmiPage, TdeePage, dll)
│   └── ui/                 # Shared UI components
│       ├── actions/        # IconButton, ShareActions
│       ├── catalog/        # CalculatorCard, CategoryTabs, RelatedCalculators
│       ├── controls/       # CalcButton, InputField, NumberField, SelectField, Keypad
│       ├── documentation/  # DocumentationSection
│       ├── feedback/       # EmptyState
│       └── navigation/     # Breadcrumbs, PageHeader, SearchInput
├── data/                   # Konstanta & konfigurasi
│   ├── bmi.js
│   ├── calculators.js      # Registry kalkulator & kategori
│   └── tdee.js
├── hooks/                  # Custom React hooks
│   ├── math/               # Hooks kalkulator matematika
│   ├── gpa/                # Hooks kalkulator IPK
│   ├── useCalculator.js    # Generic calculator hook
│   ├── useNumberCalculator.js
│   ├── useTheme.js         # Dark mode management
│   └── useSearchShortcut.js # Ctrl/Cmd+K shortcut
├── lib/calculators/        # Pure calculation logic (framework-agnostic)
│   ├── bmi.js              # Core + React adapter + field constants
│   ├── tdee.js             # Core + format utilities
│   ├── math.js             # Shunting-yard expression evaluator
│   ├── gpa.js              # GPA calculation logic
│   ├── discount.js         # Discount/promotion logic
│   └── conversion.js       # Unit conversion with SI/Imperial data
└── public/                 # Static assets
```

## 🔑 Fitur Unggulan

### 🔍 Shortcut Pencarian Global

Tekan **`Ctrl/Cmd + K`** di mana saja untuk fokus ke input pencarian.

### 🌙 Dark Mode

Dukungan penuh dark/light mode dengan persistensi di `localStorage` dan deteksi preferensi sistem.

### 📤 Bagikan & Salin Hasil

Setiap kalkulator memiliki tombol **Salin** (clipboard) dan **Bagikan** (Web Share API).

### ⌨️ Keyboard Support (Kalkulator Matematika)

- Angka `0-9`, operator `+ - * / ^`, desimal `.`
- `Enter` / `=` untuk hitung
- `Escape` untuk clear all, `Backspace` untuk hapus karakter
- `%` untuk persentase, `(` `)` untuk kurung

### 📱 Responsive & Accessible

- Mobile-first design
- ARIA labels, semantic HTML, focus management
- Reduced motion support

### 🔒 Privasi First

- **100% client-side** — tidak ada backend, database, atau tracking
- Semua perhitungan di browser pengguna
- Tidak ada cookies, analytics, atau third-party scripts

## 🧪 Testing & Kualitas

```bash
# Linting (ESLint + Next.js config)
npm run lint

# Type checking (JSDoc-based)
# Manual: periksa konsol browser untuk warning
```

> Dibangun dengan ❤️ untuk mempermudah perhitungan sehari-hari tanpa kerumitan.
