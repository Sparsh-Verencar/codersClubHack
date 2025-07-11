This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Here’s a draft **README.md** for **Festival Sphere**, with sensible placeholders where you can drop in your Firebase env vars and screenshots. Copy this into your repo root and tweak any sections as you see fit!

````md
# Festival Sphere 🎉

_Explore, discover, and experience festivals around the world. Find your next adventure, from vibrant parades to hidden cultural gems._

---

## Table of Contents

1. [About](#about)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Configuration](#configuration)  
7. [Screenshots](#screenshots)  
8. [Roadmap](#roadmap)  
9. [Contributing](#contributing)  
10. [License](#license)  
11. [Contact](#contact)  

---

## About

**Festival Sphere** lets you find out about events, festivals, and holidays anywhere in the world that’s been recorded. Pinpoint dates on an interactive map, read community reviews, and plan your next cultural adventure—all in one place.

---

## Features

- 🎯 **Interactive Map**  
  Pinpoint festivals globally and plan your journey effortlessly.  
- 🗓️ **Festival Calendar**  
  Keep track of festival dates, highlights, and updates.  
- 💬 **Community Reviews**  
  Get real tips and stories from fellow festival explorers.  

---

## Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Frontend  | Next.js, Tailwind CSS         |
| Backend   | Node.js, Express.js           |
| Database  | Firebase (Auth, Firestore)    |
| Hosting   | *(coming soon)*               |

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/Sparsh-Verencar/codersClubHack.git festival-sphere
cd festival-sphere

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
````

To build for production:

```bash
npm run build
npm run start
```

---

## Usage

1. Open your browser at [http://localhost:3000](http://localhost:3000).
2. Browse the world map to discover festivals.
3. Click any date on the calendar to see festivals happening then.
4. Read and write community reviews to share your experiences!

---

## Configuration

Create a `.env.local` file in the root of your project and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> 🔧 Replace each placeholder with your actual Firebase project settings (you can find these in the Firebase console).

---

## Screenshots

![Homepage Map View](./assets/map-view.png)
*Map-based festival explorer.*

![Festival Modal](./assets/modal-view.png)
*Detailed festival info in a modal.*

> 📸 **Pro tip:** Drop your actual screenshots in an `assets/` folder and update the paths above!


## Roadmap

* [x] MVP: Map + Calendar + Modal details
* [ ] User authentication & profiles
* [ ] Deploy to Vercel with CI/CD
* [ ] Add filtering by region & festival type
* [ ] Mobile‑friendly enhancements


## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request—let’s review! 🎉

---

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## Contact

**Your Name** – [@sparshverencar](https://github.com/Sparsh-Verencar) – [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/Sparsh-Verencar/codersClubHack](https://github.com/Sparsh-Verencar/codersClubHack)

Feel free to:

- Swap in your actual screenshot files.  
- Update the Firebase env var list to match any other services you use.  
- Adjust the Roadmap as features land.  

Let me know if you’d like badges (build status, coverage), or any other section added!
```
