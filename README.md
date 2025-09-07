
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/st9phanie/MERN-Chat-App">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">MERN Chat App</h3>

  <p align="center">
    Real-time chat application built using the MERN stack and Vite.
    <br />
    <a href="https://github.com/st9phanie/MERN-Chat-App">View Demo</a>
    &middot;
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Chat App Screenshot][product-screenshot]](https://example.com)

This is a **real-time chat application** built using the **MERN stack** and **Vite** for the frontend. Users can sign up, log in, create conversations, and chat in real-time using WebSockets (Socket.IO). The project emphasizes responsiveness, performance, and clean code structure.

Key Highlights:
* Real-time messaging with Socket.IO
* RESTful API using Express and MongoDB
* Authentication with JWT
* Responsive design 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* ![Node][Node]
* ![Express][Express]
* ![MongoDB][MongoDB]
* ![Vite][Vite]
* ![Socket.io][Socket.io]
* ![Tailwind][Tailwind]
* ![JWT][JWT]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow the steps below to run the application locally.

### Prerequisites

- Node.js
- MongoDB (local or cloud-based like MongoDB Atlas)
- npm

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/st9phanie/MERN-Chat-App.git
   cd MERN-Chat-App
   ```
   
2. Install server dependencies
  ```sh
  cd backend
  npm install
  ```
  
3. Create a .env file in the backend folder and add:
  ```sh
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

4. Run the sever
  ```sh
  npm run dev
```

5. Install frontend dependencies
  ```sh
  npm install
```
6. Run the frontend
  ```sh
  npm run dev
````

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Usage

* Register and log in with your credentials.
* Start a conversation with other users.
* Send and receive messages in real-time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

* ✅ Real-time messaging and image sharing
* ✅ User authentication (JWT)
* ✅ Responsive UI
* ✅ MongoDB for data persistence
* ✅ Socket.IO for WebSocket communication

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### License

Distributed under the Unlicense License. 
<p align="right">(<a href="#readme-top">back to top</a>)</p> <!-- CONTACT -->

### Contact

* GitHub: st9phanie
* Project Link: 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[MongoDB]: https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white
[React-url]: https://reactjs.org/
[Express]: https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat
[Node]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[Socket.io]: https://img.shields.io/badge/Socket.io-4.1.3-010101??style=flat-square&logo=Socket.io&logoColor=white
[JWT]: https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
