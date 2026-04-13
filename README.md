# Notes App

This project is included in the Dicoding curriculum. This project's objective is to use HTML, CSS, and modern JavaScript to create a functional Notes App while implementing web components and API integrations.

## Project Overview

A dynamic web application intended to be a fully functional notes manager. It emphasizes using JavaScript to handle application logic, Webpack for modular bundling, Web Components for reusable UI, and interacting with a RESTful API to manage the notes data.

This project strengthened my comprehension of:

- Interacting with REST APIs (Fetch API, Promises, Async/Await)
- Building customized Web Components
- JavaScript module bundling using Webpack
- Asynchronous data handling and state management

## Features

- Display a list of notes fetched from an API
- Add new notes with a dynamic input form
- Archive and unarchive notes
- Delete notes
- Loading indicators for asynchronous operations
- Responsive layout and styling

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack
- Web Components

## Project Structure

```text
Notes-App/
│
├── src/
│   ├── components/
│   │   ├── AppBar.js
│   │   ├── ArchiveModal.js
│   │   ├── LoadingIndicator.js
│   │   ├── NoteInput.js
│   │   └── NoteItem.js
│   ├── data/
│   │   ├── notesApi.js
│   │   └── notesData.js
│   ├── app.js
│   ├── index.html
│   └── style.css
├── package.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## What I Learned

While working on this project, I gained experience in:

- Organizing JavaScript code into modular structures and Web Components
- Configuring Webpack for development and production environments
- Handling REST API requests seamlessly
- Managing asynchronous UI states (like loading indicators)
- Maintaining a clean and organized project structure

## Future Improvements

Possible improvements for this project include:

- Adding user authentication
- Offline support (Progressive Web App / PWA capabilities)
- Adding animations and transitions for better UX
- Improving accessibility (a11y)

## Acknowledgements

This project was completed as part of a learning path provided by Dicoding.
