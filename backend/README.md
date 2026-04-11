# 🔧 Cognify Backend – AI & Analysis Engine

> Robust Node.js + Express API server powering AI content generation, data analytics, and intelligent learning features.

[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)

---

## 📖 Overview

The Cognify backend is a comprehensive API server that orchestrates AI-powered content generation, advanced data analytics, and secure user management. Built with a modern MVC architecture, it seamlessly integrates multiple AI providers and Python-based data processing.

---

## 🏗️ Architecture

```
backend/
├── app.js                  # Application entry point
├── controllers/            # Business logic layer (MVC)
│   ├── userController.js       # Authentication logic
│   ├── dashboardController.js  # User content management
│   └── featureController.js    # AI feature implementations
│
├── routes/                 # API route definitions
│   ├── user/                   # Auth endpoints
│   ├── dashboard/              # Dashboard endpoints
│   └── features/               # Content generation endpoints
│
├── models/                 # MongoDB schemas
│   ├── User.js                 # User model
│   └── content.js              # Generated content model
│
├── services/               # External AI integrations
│   ├── openAIService.js        # OpenAI integration
│   └── huggingFaceService.js   # HuggingFace integration
│
├── features/               # Modular Service Layer
│   ├── common.js               # Cross-feature AI tools
│   ├── mcqService.js           # MCQ logic
│   ├── dataService.js          # Core Data/EDA logic
│   ├── codeService.js          # Code explainer/reviewer
│   └── (other services...)
│
├── python_services/        # Python analytics engine
│   └── eda_engine.py           # Exploratory Data Analysis (EDA) engine
│
├── utils/                  # Helper functions
│   ├── textExtractor.js        # Document text extraction
│   ├── dataParser.js           # Data file parsing
│   ├── wrapAsync.js            # Async error handler
│   └── expressError.js         # Custom error class
│
├── middleware.js           # Authentication middleware
├── apiCalls.js             # High-level entry point for features
└── cloudinaryConfig.js     # File storage configuration
```

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime**: Node.js 22.x
- **Framework**: Express 5.1.0
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Validation**: Validator.js

### AI & Machine Learning
- **OpenAI**: GPT-4, GPT-4o, GPT-4o-mini
- **Google Gemini**: Gemini 2.5 Flash, Gemini 2.5 Pro
- **Groq**: High-performance inference
- **HuggingFace**: Open-source models (Llama, Qwen, Mixtral)

### Data Processing
- **Python 3.x**: Data analysis engine
- **Pandas**: DataFrame manipulation
- **NumPy**: Numerical computations
- **SciPy**: Statistical analysis
- **XLSX**: Excel file processing

---

## ⚙️ Environment Configuration

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5050
NODE_ENV=development
SECRET=your_jwt_secret_key_here

# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cognify.znnoqkq.mongodb.net/cognify?retryWrites=true&w=majority&appName=cognify
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password

# AI API Keys
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
HUGGINGFACE_TOKEN=your_huggingface_token

# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### Obtaining API Keys

1. **MongoDB Atlas**: 
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get your connection string

2. **OpenAI**:
   - Visit [platform.openai.com](https://platform.openai.com/)
   - Create an API key in your account settings

3. **Google Gemini**:
   - Go to [ai.google.dev](https://ai.google.dev/)
   - Generate an API key from the console

4. **Groq**:
   - Sign up at [console.groq.com](https://console.groq.com/)
   - Generate your API key

5. **Cloudinary**:
   - Register at [cloudinary.com](https://cloudinary.com/)
   - Get your credentials from the dashboard

---

## 🚀 Installation & Setup

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Install Python Dependencies
```bash
pip install pandas numpy scipy openpyxl
```

### 3. Configure Environment
Create and populate your `.env` file with the required credentials (see above).

### 4. Start the Server

**Development Mode** (with auto-restart):
```bash
npm run dev
# or
nodemon app.js
```

**Production Mode**:
```bash
npm start
# or
node app.js
```

The server will start on `http://localhost:5050`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/logout` | User logout | ✅ |

### Content Generation
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/generate/mcq` | Generate MCQs | ✅ |
| POST | `/user/generate/flashcards` | Create flashcards | ✅ |

| POST | `/user/generate/summary` | Generate summary | ✅ |
| POST | `/user/generate/code-tools` | Analyze code | ✅ |
| POST | `/user/generate/visualize` | Data visualization | ✅ |

### Dashboard & User Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard` | Get all user content | ✅ |
| GET | `/dashboard/view/:id` | View specific content | ✅ |
| GET | `/dashboard/filter?type=mcq` | Filter content by type | ✅ |
| DELETE | `/dashboard/delete/:id` | Delete specific content | ✅ |
| DELETE | `/dashboard/delete-all` | Delete all user content | ✅ |
| GET | `/dashboard/profile` | Get user profile | ✅ |
| POST | `/dashboard/profile` | Update user profile | ✅ |

---

## 🔐 Authentication Flow

The backend uses **JWT (JSON Web Tokens)** for stateless authentication:

1. User registers or logs in via `/signup` or `/login`
2. Server validates credentials and returns a JWT token
3. Client stores token and includes it in subsequent requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
4. Middleware validates token on protected routes
5. Token expires after 24 hours (configurable)

---

## 💡 Key Features

### Hybrid EDA Engine
- **Python Backend**: Performs statistical computations (mean, median, correlation, etc.)
- **AI Intelligence**: Generates human-readable insights and recommendations
- **Automatic Chart Selection**: Chooses optimal visualizations based on data types
- **Interactive Dashboards**: Recharts-compatible JSON output

### Multi-Model AI Intelligence
- **Senior Persona Engines**: Every feature uses specialized AI personas (e.g., Psychometricians for MCQs, Security Architects for Code Audit).
- **Deep JSON Schemas**: High-fidelity structured output for consistent UI rendering and PDF generation.
- **Fail-Safe Inference**: Multi-provider fallback across OpenAI, Gemini, and Groq.

### Reliability-First File Processing
- **Restricted Support**: Strictly focused on **PDF and TXT** for documents to ensure 100% text extraction accuracy.
- **Cloudinary Integration**: Secure cloud storage for all source materials.
- **Data Parsing**: Smart detection of CSV/Excel for the Python EDA engine.

### MVC Architecture
- **Separation of Concerns**: Routes → Controllers → Services → Models
- **Maintainability**: Easy to extend with new features
- **Testability**: Isolated business logic for unit testing

---

## 📊 Data Analysis Capabilities

The Python EDA engine (`python_services/eda_engine.py`) provides:

- **Statistical Analysis**: Mean, median, mode, standard deviation, quartiles
- **Data Quality Metrics**: Missing values, duplicates, data types
- **Correlation Analysis**: Heatmaps and relationship discovery
- **Distribution Analysis**: Histograms and density plots
- **Categorical Analysis**: Frequency counts and treemaps
- **Time Series Detection**: Automatic date column identification
- **Outlier Detection**: Z-score and IQR methods
- **AI-Enhanced Insights**: Strategic recommendations based on patterns

---

## 🧪 Testing

### Manual Testing
Use tools like **Postman** or **Thunder Client** to test endpoints:

```bash
# Example: User Login
POST http://localhost:5050/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Running Tests
```bash
# Run test suite (when implemented)
npm test
```

---

## 🐛 Debugging

### Enable Detailed Logs
Set `NODE_ENV=development` in your `.env` file for verbose error messages.

### Common Issues

**MongoDB Connection Fails**:
- Verify your `MONGODB_URI` is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

**AI API Errors**:
- Verify API keys are valid and active
- Check API usage limits and quotas
- Ensure sufficient credits/quota

**File Upload Errors**:
- Verify Cloudinary credentials
- Check file size limits (default: 10MB)
- Ensure correct MIME types

---

## 🔄 Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  fileUrl: [{ path: String, fileId: String }],
  createdAt: Date
}
```

### GeneratedContent Model
```javascript
{
  user: ObjectId (ref: User),
  type: String (mcq, flashcards, summary, etc.),
  fileId: String,
  meta: Object (generation parameters),
  inputContent: String,
  data: Mixed (generated content),
  createdAt: Date
}
```

---

## 🚢 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in your environment
2. Use a strong `SECRET` key for JWT
3. Enable MongoDB Atlas IP whitelisting
4. Configure CORS for your frontend domain

### Recommended Platforms
- **Render**: Easy Node.js deployment
- **Railway**: Automatic deployments from Git
- **Heroku**: Mature platform with add-ons
- **DigitalOcean**: App Platform or Droplets

### Pre-Deployment Checklist
- [ ] All environment variables configured
- [ ] MongoDB Atlas cluster created and connected
- [ ] API keys validated and active
- [ ] Cloudinary storage configured
- [ ] Python dependencies installable on server
- [ ] CORS configured for production domain
- [ ] Error logging configured (optional: Sentry, LogRocket)

---

## 📝 Scripts

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow the coding standards:
- Use **MVC pattern** for new features
- Add JSDoc comments for functions
- Follow **async/await** patterns
- Use **wrapAsync** for route handlers
- Validate inputs properly

---

## 📄 License

Educational project by Ankush Verma.

---

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Review the [main README](../README.md)
- Check API documentation above

---

**Built with Node.js + Express + Python + AI**
