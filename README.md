# Next.js Project with React 19, TypeScript, DaisyUI, and ag-Grid

This project is built with [Next.js](https://nextjs.org/) updated to **React 19**, **TypeScript**, and styled using **DaisyUI**.

## Project Overview

The application is designed to:

- **Retrieve log data from an FTP server**, automatically download and extract the data.
- **Process raw data** into **typed data structures** for efficient handling and display.
- Display data in **customized tables** using [**ag-Grid**](https://www.ag-grid.com/) with advanced features.
- Implement both **native filters** and **SQL-based filters** to query specific data.
- Enable **interactive filtering**, including opening new windows for querying data on specific dates.
- Allow users to **double-click on table rows** to trigger external **API queries**, filter the results, and display them in **modal dialogs**.
- Perform **server-side data manipulation** using libraries like **Protocol Buffers (Protobuf)** for deserializing `.proto` files.
- Package and distribute the entire application using **Docker** for streamlined deployment.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the app.

## Technologies Used
	•	Next.js with React 19 for the frontend framework.
	•	TypeScript for type-safe development.
	•	DaisyUI for styling with Tailwind CSS components.
	•	ag-Grid for high-performance data grids.
	•	Protocol Buffers (Protobuf) for server-side data deserialization.
	•	Docker for containerization and deployment.

## Key Features
	•	FTP Integration: Automated download and extraction of log files.
	•	Data Processing: From raw logs to structured, typed data.
	•	Custom ag-Grid Tables: Tailored views and interactions for complex data.
	•	Advanced Filtering: Native and SQL-based filtering capabilities.
	•	Interactive Queries: Dynamic dialogs triggered by table interactions.
	•	API Integrations: Fetch and display external data on demand.
	•	Docker Deployment: Simplified and consistent deployment process.

## Learn More
	•	Next.js Documentation – Learn about Next.js features and APIs.
	•	ag-Grid Documentation – Explore ag-Grid’s capabilities.
	•	DaisyUI Documentation – Learn how DaisyUI works with Tailwind CSS.
	•	Docker Documentation – Understand Docker for deployment.