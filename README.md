# Award Assistant - Advertising Awards Entry Web Application

AI-powered web application to help Artefact employees submit entries to major advertising awards. The app analyzes projects, recommends categories, and assists with form completion through an interactive AI chat interface.

## 🎯 Supported Awards

1. **Cannes Lions** (International - France)
2. **One Show** (International - USA)
3. **Clios Awards** (International - USA)
4. **The ANDYS** (International - USA)
5. **LIA** (London International Awards - UK)
6. **D&AD** (International - UK)
7. **Eurobest** (European)
8. **Club des DA** (French)
9. **Grand Prix Stratégies** (French)

## 🏗️ Technology Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (development) / PostgreSQL (production) with Prisma ORM
- **AI**: Claude API (Anthropic)
- **PDF Processing**: pdf-parse
- **Authentication**: NextAuth.js (ready for implementation)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Claude API key from Anthropic

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Award_Assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and add your Claude API key:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY="your_anthropic_api_key_here"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Award_Assistant/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── awards/               # Award management endpoints
│   │   ├── projects/             # Project management endpoints
│   │   ├── submissions/          # Submission endpoints
│   │   └── chat/                 # AI chat endpoint
│   ├── awards/                   # Awards pages
│   ├── projects/                 # Projects pages
│   ├── submissions/              # Submission/chat pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ChatInterface.tsx         # AI chat interface
│   ├── CreateProjectButton.tsx   # Project creation modal
│   ├── StartSubmissionButton.tsx # Submission starter
│   └── UploadEntryKitButton.tsx  # Entry kit upload modal
├── lib/                          # Libraries and utilities
│   └── db/
│       └── prisma.ts             # Prisma client
├── prisma/                       # Database schema and migrations
│   └── schema.prisma             # Database schema
├── public/                       # Static files
│   └── uploads/                  # Uploaded PDFs
│       ├── entry-kits/           # Award entry kits
│       └── projects/             # Project boards
├── utils/                        # Utility functions
│   └── cn.ts                     # Class name utility
└── README.md                     # This file
```

## 💡 Features

### 1. Award Management
- Upload entry kits (PDF) for any supported award
- View all available awards
- Replace outdated entry kits
- Each award stores: name, country, language, entry kit, upload date

### 2. Project Management
- Upload project one-pager (PDF)
- Create multiple projects for different campaigns
- View project details and submission status

### 3. AI-Powered Assistance
- Analyze project against award entry kits
- Recommend best-fit categories
- Answer form questions interactively
- Provide strategic advice for submissions

### 4. Multi-Award Support
- Submit same project to multiple awards
- Track status of each submission
- Award-specific recommendations

### 5. Interactive Chat Interface
- Real-time AI conversation
- Context-aware responses
- Chat history persistence

## 🔄 Workflow

1. **Upload Entry Kits**
   - Navigate to Awards page
   - Upload PDF entry kit for each award you want to target
   - System stores entry kit for analysis

2. **Create Project**
   - Navigate to Projects page
   - Upload campaign one-pager (PDF with project details)
   - Add project name and description

3. **Start Submission**
   - Open your project
   - Select an award to submit to
   - Click "Start Submission"

4. **Chat with AI Assistant**
   - Ask AI to analyze your project
   - Get category recommendations
   - Request help with form questions
   - Receive strategic guidance

5. **Complete Submission**
   - Follow AI recommendations
   - Save your progress (status: draft → in_progress → completed)

## 🗄️ Database Schema

### Awards
- Stores information about advertising awards
- Links to uploaded entry kits

### Categories
- Award categories extracted from entry kits
- Criteria and eligibility requirements

### Projects
- Campaign projects with one-pager boards
- Links to multiple submissions

### Submissions
- Links project to award
- Tracks selected categories and status
- Stores form responses

### ChatSessions
- Conversation history for each submission
- AI recommendations and insights

## 🔐 Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"          # SQLite for dev, PostgreSQL for prod

# Anthropic API
ANTHROPIC_API_KEY="sk-ant-..."        # Your Claude API key

# NextAuth (for future authentication)
NEXTAUTH_SECRET="..."                 # Random secret key
NEXTAUTH_URL="http://localhost:3000"  # Your app URL
```

## 🚧 Future Enhancements

- [ ] PDF parsing to auto-extract categories from entry kits
- [ ] User authentication and multi-user support
- [ ] Export submission data to various formats
- [ ] Email notifications for submission updates
- [ ] Advanced category matching algorithm
- [ ] Multi-language support (English/French UI)
- [ ] Form builder for structured data collection
- [ ] Analytics and submission success tracking

## 🐛 Troubleshooting

### Prisma Issues
If you encounter Prisma engine download issues:
```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
```

### API Key Issues
If you see "Invalid API key" errors:
- Verify your ANTHROPIC_API_KEY in `.env`
- Ensure it starts with `sk-ant-`
- Restart the development server after changing `.env`

### File Upload Issues
- Ensure `public/uploads/` directories are writable
- Check file size limits in `next.config.js`
- Verify PDF file formats are valid

## 📝 License

This project is internal to Artefact and is not licensed for external use.

## 👥 Support

For questions or issues, please contact the development team or create an issue in the repository.