# Quran Recitation App

![Preview](./public/preview.gif)

## Features ✨

- **Dark Mode Toggle 🌙**

  - Switch between light and dark themes.

- **Custom Audio Player 🎵**

  - Play, pause, and control volume for Quran recitations.
  - Custom audio player with playback progress and duration.
  - Handle events for play, pause, volume change, and time update.

- **Favorites ⭐**

  - Add and remove surahs to your favorites list.
  - View and manage your favorite surahs.

- **Search Functionality 🔍**

  - Search for surahs and reciters.
  - Filter results dynamically as you type.

- **Responsive Design 📱**

  - Optimized for both desktop and mobile views.

- **Multilingual Support 🌐**

  - Switch between English and Arabic languages.

- **Download Surahs ⬇️**

  - Download individual surahs for offline listening using axios.

- **Fetching Data from API 🌐**
  - Fetch and display data from external APIs.

## Technologies and Concepts Used 🛠️

### React Fundamentals

- Created functional components.
- Used React Hooks like `useState`, `useRef`, and `useEffect`.

### JavaScript Skills

- Managed state, handled events, and worked with arrays and objects.

### Props and State Management

- Passed props to components and managed state.

### Event Handling

- Handled user interactions and events.

### Conditional Rendering

- Rendered components and elements conditionally.

### Styling

- Used Tailwind CSS for styling and applying animations.

### List Rendering

- Rendered lists dynamically based on data.

### Custom Hooks

- Used custom hooks like `useLocalStorage`:
  - **Volume**: Stored the user's preferred volume level.
  - **Audio Value**: Stored the current playback time of the audio.
  - **Current Percent**: Stored the percentage of audio progress.
  - **Current Duration**: Stored the total duration of the audio.
  - **Favourite Surahs**: Stored the user's favourite surahs for easy access.
  - **Language (lang)**: Stored the preferred language (English or Arabic).
  - **Dark Mode (isDark)**: Stored the user's dark mode preference.
  - **Current Surah**: Stored the current surah being played.
  - **Playing Reciter**: Stored the current reciter for the surah.
  - **Current Reciter**: Stored the details of the current reciter.

### Component Composition

- Composed complex components from smaller, reusable components.

### Error Handling and Fallbacks

- Implemented a 404 error component for missing pages.

### Dynamic Content Display

- Displayed dynamic content based on props and state.

### Search Functionality

- Implemented search functionality with filtered results.

### Theming

- Implemented a dark mode toggle feature.

### Local Storage

- Used `localStorage` for persisting state across sessions.

### Fetching Data from API

- Used external APIs to fetch and display data.

### Axios

- Used axios library for handling file downloads and making API requests.

## Live Demo 🚀

Check out the live demo [here](https://quran-recitation-mo3bassias-projects.vercel.app).

## Learning Journey 📘

I started learning React 4 weeks ago and embarked on this project as a way to apply what I've learned. Throughout this journey, I have enhanced my skills in various areas and gained hands-on experience with real-world applications. The journey continues as I keep learning and improving my skills. Stay tuned for more updates!

## Contribution 🤝

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please feel free to open an issue or submit a pull request. Let's make this project even better together!

---

**© 2024, Created by mo3bassia using React.**
