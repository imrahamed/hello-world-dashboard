# Logs Dashboard Angular App

This is an Angular application for logs dashboard. It provides a user-friendly interface to visualize logs and perform various operations related to them.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Dashboard View:** Provides a quick overview of logs with visualizations.
- **Log Listing:** Allows users to view logs with details such as timestamp, user ID, status, and more.
- **Date Range Selection:** Enables users to select a custom date range for log retrieval.
- **Expandable Logs:** Users can expand individual logs to view request, response, and error details.
- **Graphical Representation:** Presents log data in graphical format for better insights.
- **Metric Counts:** Displays counts of various metrics like total users, API calls, and failed API calls.

## Installation

1. Clone the repository to your local machine.

```bash
git clone https://github.com/your-username/angular-logs-dashboard.git
```

2. Navigate to the project directory.

```bash
cd angular-logs-dashboard
```

3. Install dependencies.

```bash
npm install
```

## Usage

1. Start the Angular application.

```bash
ng serve
```

2. Open your browser and go to `http://localhost:4200` to access the Logs Dashboard.

## Configuration

The application connects to a backend server for log data. Make sure to configure the API endpoint in the `DataService` located at `src/app/data.service.ts`.

```typescript
ApiUrl = "http://localhost:3000/api/analytics";
```

## Tests
This project includes unit and integration tests. To run the tests:

```bash
npm test
```


## Acknowledgments

- [Angular](https://angular.io/)
- [ng-zorro-antd](https://ng.ant.design/)
- [date-fns](https://date-fns.org/)
- [ngx-charts](https://swimlane.gitbook.io/ngx-charts/)
- [FontAwesome](https://fontawesome.com/)

---
