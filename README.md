# Wanderlust Project (Responsive Travel App)

A fully responsive travel web application where users can browse, search, and review listings like beaches, castles, and other attractions. Built with **Node.js**, **Express**, **EJS**, and **MongoDB**, it supports full CRUD operations, user authentication, image uploads via Cloudinary, and map integration for listing locations.  

---

## 🌍 Features

- **User Authentication** – Sign up, log in, and secure actions with **Passport.js**.  
- **Listings Management** – Create, read, update, and delete listings for attractions or stays.  
- **Reviews** – Authenticated users can add, edit, and delete reviews for listings.  
- **Filters & Search** – Browse listings by categories like beaches, castles, etc., and search with a fully functional search bar.  
- **Maps Integration** – Display each listing's location on a map using a Maps API.  
- **Image Uploads** – Upload images for listings via **Cloudinary**.  
- **Responsive Design** – Mobile, tablet, and desktop friendly.  
- **Authentication-Required Features** – Certain actions like writing a review require login.  

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **EJS** – Server-side templating engine  
- **MongoDB & MongoDB Atlas** – Database  
- **Passport.js** – Authentication  
- **Cloudinary** – Image hosting  
- **HTML / CSS / JavaScript** – Frontend  
- **Maps API** – Display listing locations on a map  

---

## 📁 Project Structure

```
wanderlust-project/
│
├── app.js               # Entry point
├── package.json
├── config/              # Database & authentication setup
├── controllers/         # Logic for listings, reviews, auth
├── models/              # Mongoose schemas (Listing, Review, User)
├── routes/              # Express routes
├── views/               # EJS templates
├── public/              # CSS, JS, images
└── utils/               # Helper functions
```

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/shreyagpj/wanderlust-project-responsive.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:  
Create a `.env` file with the following keys:

```env
CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET=<your_cloudinary_api_secret>

ATLAS_URL=<your_mongodb_atlas_url>
appName=Cluster0

ATLAS_ID=<your_mongodb_user_id>
ATLAS_P=<your_mongodb_password>

SECRET=<any_secret_string_for_sessions>
```

4. Start the server:

```bash
node app.js
```

5. Open your browser at:

```
http://localhost:3000
```

---

## 🔧 Features Details

- **CRUD for Listings** – Add attractions, edit, delete, and view details.  
- **Reviews** – Users can post reviews on listings; only authenticated users can add reviews.  
- **Search & Filters** – Search bar and category filters (beaches, castles, etc.) for easy navigation.  
- **Maps Integration** – Each listing shows a map with its exact location.  
- **Cloudinary Image Uploads** – Upload multiple images for listings.  

---

## 📌 Learnings / Goals

- Full-stack web development using Node.js, Express, and MongoDB.  
- Implementing authentication and authorization with Passport.js.  
- Handling file uploads and cloud image hosting.  
- Dynamic rendering with EJS templates.  
- Implementing search, filters, and maps integration.  
- Practicing MVC architecture for scalable code.  

---

## ⭐ Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.
