# 🎁 Shop Frontend
### **Personalized Gift Store | Angular 21 | PrimeNG**

---

## 📖 Overview
The web client of an online store for personalized gifts. Customers browse products, choose a color and a personal text for each item, and place orders. Admins manage products and order statuses. An AI assistant helps customers find the right gift.

This frontend is one of three parts of the project:

| Part | Repository | Tech |
|---|---|---|
| 🖥️ Frontend (this repo) | [sarli-s/shop-frontend](https://github.com/sarli-s/shop-frontend) | Angular 21, PrimeNG |
| ⚙️ Backend API | [sarli-s/APIproject](https://github.com/sarli-s/APIproject) | .NET 9, EF Core, SQL Server, Redis, Kafka |
| 🤖 AI Service | [sarli-s/AI-Services-Chat-and-Semantics](https://github.com/sarli-s/AI-Services-Chat-and-Semantics) | Python, FastAPI, OpenAI |

## Screenshots

**Product catalog** – browsing with price and category filters
<img width="1742" height="972" alt="צילום מסך 2026-11-24 155020" src="https://github.com/user-attachments/assets/acbdf14b-843d-4c7a-8a35-36dfbea257a2" />


**Semantic search** – finds relevant products by meaning, not keywords
<img width="1772" height="961" alt="צילום מסך 2026-11-24 154547" src="https://github.com/user-attachments/assets/89843bea-c72f-4c35-a3b8-5028394c6c9a" />


**AI Shopping Assistant** – chat grounded in live catalog data
<img width="1436" height="796" alt="צילום מסך 2026-11-24 155506" src="https://github.com/user-attachments/assets/cb50f4ee-6c9f-4c9e-8a3d-a85febf97da4" />

---

## ✨ Features

**Customers**
- 🛍️ Product catalog with filtering (name, price, category) and pagination
- 🎨 Personalization per item: color and custom text
- 🛒 Shopping cart saved in the browser (`localStorage`)
- 💳 Checkout and order history
- 👤 Registration with live password-strength check, login and profile editing
- 🤖 AI chat assistant and semantic product search

**Admins**
- ➕ Add, edit and delete products
- 📦 View all orders and advance their status (packing → ready → shipped → at pickup point → arrived)

---

## 🔐 Authentication
The backend issues a **JWT in an HttpOnly cookie** on login. An HTTP interceptor in [app.config.ts](src/app/app.config.ts) sends every request with `withCredentials: true`, so the cookie is attached automatically. Admin-only screens are shown according to the user's role.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── components/      # Pages and UI parts (products, cart, checkout, orders, profile, chat...)
│   ├── services/        # HTTP services (products, users, orders, categories, chat) and the cart
│   ├── models/          # TypeScript interfaces matching the backend DTOs
│   ├── app.routes.ts    # Routing
│   └── app.config.ts    # Providers: router, HttpClient + credentials interceptor, PrimeNG theme
├── environments/        # API address and product-image path
public/
├── productsImages/      # Product images (file names are stored in the database)
└── homePictures/        # Home page images
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 22** and **Angular CLI** (`npm install -g @angular/cli`)
- The **backend API** running on `http://localhost:5222` — see [APIproject](https://github.com/sarli-s/APIproject)
- For the chat and search: the **AI service** running on port `8001` — see [AI-Services-Chat-and-Semantics](https://github.com/sarli-s/AI-Services-Chat-and-Semantics)

### Run
```bash
npm install
npm start          # same as: ng serve
```
Open `http://localhost:4200`.

The API address is set in [src/environments/environment.development.ts](src/environments/environment.development.ts) (`apiUrl`).

### Build
```bash
ng build
```
Output goes to `dist/`.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Angular 21 (standalone components, signals) |
| **UI** | PrimeNG + PrimeFlex + PrimeIcons |
| **Alerts** | SweetAlert2 |
| **HTTP** | Angular HttpClient + RxJS |
| **Styling** | SCSS |

---

## 👩‍💻 Authors
Built together by **Ayala** ([AyalaOnGit](https://github.com/AyalaOnGit)) and **Sarli** ([sarli-s](https://github.com/sarli-s)) — 2026.
