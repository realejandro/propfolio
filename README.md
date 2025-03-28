# 🏠 Propfolio - Real Estate Portfolio Manager

## 📋 Description
Propfolio is a web application designed for independent property owners who need an intuitive and efficient tool to track and manage their real estate investments. With Propfolio, users can sign up, log in, and maintain an organized inventory of all their properties. The app simplifies property management through an easy-to-use interface and essential features that support better decision-making and record-keeping.

---

## 📂 Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Future Development](#future-development)
5. [Deployed Application](#deployed-application)
6. [Screenshot](#screenshot)
7. [Contributors](#contributors)
8. [License](#license)

---

## 🛠 Installation
This application is deployed on Render, so installation is not necessary for general users. However, developers wishing to run the project locally should ensure the following:

- Node.js and npm installed
- Clone the repository
- Navigate to the `client/` and `server/` directories and run `npm install` in both
- Set up environment variables for MongoDB connection and JWT secret in a `.env` file
- Run the development server using `npm run dev` in the `client/` folder and appropriate start script in the `server/` folder

---

## 🚀 Usage
1. Navigate to the deployed application on Render.
2. Create an account via the signup form.
3. Log in with your credentials.
4. Use the Add Property page to add property details to your account.
5. View your saved properties on the Properties page.
6. Edit or delete properties directly from the card.
7. Access the contact form to reach out for support or questions.

---

## ✨ Features
- User authentication (signup/login/logout)
- Add, view, and delete properties
- Inline editing of property details
- Predefined image selection for property photos
- Responsive design for optimal mobile and desktop experience

---

## 🔮 Future Development
- Add more functionality to the property form and cards, (e.g., ability to add "rooms" which will have their own input fields for things such as square footage, # of windows, # of closets, # of bathrooms, a picture of the specific room, etc). These rooms could be displayed to users by editing the state of the property page to display a single properties "room cards" instead of the users property cards. This is just one of the ideas we have for adding more user friendly functionality to the application.
- Enable photo uploads for users to add custom property images
- Integrate Google Maps or Mapbox API for geolocation and visual property placement
- Add filtering and sorting functionality on the Properties page
- PDF export or print-friendly reports of property portfolio

---

## 🌐 Deployed Application
🔗 [https://real-state-portfolio.onrender.com]  

### 🚀 CI/CD with GitHub Actions
This project uses GitHub Actions for continuous integration and deployment to Render:

1. Every push to the `main` branch triggers automatic testing and deployment
2. Configure the following GitHub repository secrets:
   - `RENDER_SERVICE_ID`: Your Render service ID
   - `RENDER_API_KEY`: Your Render API key
   - `JWT_SECRET_KEY`: JWT secret (same as your environment variable)
3. The workflow will run tests, build the application, and deploy to Render

To manually trigger a deployment, use the "Run workflow" button in the Actions tab.

---

## 📸 Screenshot

![Image](https://github.com/user-attachments/assets/314170dd-3ceb-4cf3-baf2-6c3b0c78d707)


---

## 👥 Contributors

- **Paolo Sierra** – [GitHub](https://github.com/Narupo)
- **Alejandro Cabrera** – [GitHub](https://github.com/realalejandrocf)
- **Justin Rakestraw** – [GitHub](https://github.com/jrakestr)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
Feel free to use, modify, and distribute as needed!
