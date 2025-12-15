# 🎓 Sylani Dashboard Project - Modern Admin Portal

A beautiful, modern, and feature-rich admin dashboard for managing students and courses. Built with React, Firebase, Ant Design, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-11.1.0-FFCA28?logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?logo=tailwindcss)

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Gradient cards, smooth animations, and modern aesthetics
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark Sidebar**: Professional sidebar with gradient logo section
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Custom Components**: Reusable StatsCard, LoadingSpinner, PageHeader, and more

### 📊 Dashboard Features
- **Real-time Statistics**: Live student and course counts
- **Interactive Charts**: Line and Doughnut charts with Chart.js
- **Recent Activity Feed**: Track recent changes and updates
- **Trend Indicators**: Visual trend indicators on stat cards

### 👥 Student Management
- **CRUD Operations**: Add, edit, delete students with ease
- **Advanced Search**: Real-time search across all student fields
- **Table Filtering**: Filter by course, status, and more
- **Data Validation**: Form validation for all inputs
- **Status Tracking**: Track active/inactive students

### 📚 Course Management
- **Course Lifecycle**: Track courses from upcoming to completion
- **Duration Calculation**: Automatic duration calculation
- **Status Badges**: Visual status indicators (In Progress, Completed, Upcoming)
- **Rich Descriptions**: Support for detailed course descriptions

### 🔥 Firebase Integration
- **Real-time Database**: Firestore for data persistence
- **Custom Hooks**: useFirestore hook for easy data management
- **Automatic Timestamps**: CreatedAt and updatedAt tracking
- **Error Handling**: Comprehensive error handling with toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sylani-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `src/config/firebase.jsx` with your Firebase credentials
   - Ensure Firestore is enabled in your Firebase project

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
sylani-dashboard/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── StatsCard/
│   │   ├── LoadingSpinner/
│   │   ├── SkeletonLoader/
│   │   ├── PageHeader/
│   │   ├── Navbar/
│   │   └── ...
│   ├── config/          # Configuration files
│   │   └── firebase.jsx
│   ├── Context/         # React Context providers
│   │   ├── courseData.jsx
│   │   └── studentData.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useFirestore.js
│   │   └── useCollectionCount.js
│   ├── pages/           # Page components
│   │   ├── Dashboard/
│   │   │   ├── index.jsx
│   │   │   ├── Student/StudentNew.jsx
│   │   │   └── Course/CourseNew.jsx
│   │   └── Router.jsx
│   ├── utils/           # Utility functions
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
└── package.json
```

## 🛠️ Technologies Used

### Core
- **React 18.3.1** - UI library
- **React Router DOM 7.1.1** - Routing
- **Firebase 11.1.0** - Backend & Database

### UI & Styling
- **Ant Design 5.22.5** - UI components
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **Material Tailwind 2.1.10** - Material Design components
- **Framer Motion 11.15.0** - Animations

### Charts & Visualization
- **Chart.js 4.4.7** - Charting library
- **React Chartjs 2 5.3.0** - React wrapper for Chart.js
- **Recharts 2.15.0** - Composable charting library

### Icons
- **Ant Design Icons 5.5.1** - Icon library
- **Lucide React 0.468.0** - Modern icon set

### Utilities
- **React Toastify 10.0.6** - Toast notifications

## 📦 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

### `npm run format`
Formats code using Prettier

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1890ff` - Main actions and links
- **Secondary Green**: `#52c41a` - Success states
- **Purple**: `#a855f7` - Secondary actions
- **Orange**: `#f97316` - Warnings and highlights

### Typography
- **Headings**: Poppins font family
- **Body**: Inter font family

### Spacing
- Consistent spacing scale using Tailwind utilities
- Custom spacing: 18, 88, 100, 128

## 🔧 Custom Hooks

### `useFirestore(collectionName)`
Comprehensive hook for Firestore operations:
- `data` - Array of documents
- `loading` - Loading state
- `error` - Error state
- `fetchData()` - Refetch data
- `addDocument(data)` - Add new document
- `updateDocument(id, data)` - Update document
- `deleteDocument(id)` - Delete document
- `queryDocuments(conditions)` - Query with conditions

### `useCollectionCount(collectionName, conditions)`
Get document count with optional filtering:
- `count` - Number of documents
- `loading` - Loading state

## 🎯 Key Features Implementation

### Stats Cards with Gradients
Modern gradient cards with hover effects and animations

### Responsive Sidebar
- Desktop: Fixed sidebar with collapsible option
- Mobile: Overlay sidebar with slide animation

### Advanced Table
- Sorting and filtering
- Pagination with customizable page sizes
- Search functionality
- Action buttons (Edit, Delete)

### Form Validation
- Required field validation
- Email format validation
- Custom error messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
firebase deploy
```

### Deploy to Vercel
```bash
vercel deploy
```

## 📝 Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

## 👨‍💻 Author
Sylani Team

## 🙏 Acknowledgments
- React team for the amazing library
- Ant Design for beautiful components
- Tailwind CSS for utility-first CSS
- Firebase for backend services

---

**Built with ❤️ for Sylani**
