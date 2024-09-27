# To-Do App

A simple, web-based To-Do application built using **Bun** as the runtime, **TypeScript** for server-side logic, and **jQuery** for client-side interactivity. Tasks are stored persistently in a JSON file, allowing you to track, complete, and delete tasks.

## Features
- Add new tasks to the list.
- Mark tasks as completed.
- Delete tasks from the list.
- Data persistence using a JSON file.
- Fully functional web interface using jQuery.

## Technologies
- **Bun**: High-performance JavaScript runtime.
- **TypeScript**: For server-side code.
- **jQuery**: For client-side DOM manipulation.
- **JSON File Storage**: For persisting tasks.

---

## Setup Instructions

### Prerequisites
Ensure that **Bun** is installed. You can install Bun using the following command:

```powershell
-c "irm bun.sh/install.ps1|iex"
```

### Install Dependencies

This app uses only built-in modules in Bun, so no additional dependencies are required for the backend.
For frontend dependencies, jQuery is loaded via CDN in the index.html.

### Running the Application
Once you're in the project directory, you can run:
```powershell
bun run src/index.ts
```

### Access the Application

In a browser, go to:

```
http://localhost:3000
```

## API Endpoints

## Future Enhancements

## License