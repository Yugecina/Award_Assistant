# Setup Guide - Award Assistant

This guide will help you complete the setup and test the Award Assistant application locally.

## ✅ What's Already Done

The following has been set up for you:

- ✅ Next.js 14 project with TypeScript
- ✅ Tailwind CSS configuration
- ✅ Prisma database schema (SQLite)
- ✅ All core pages and components
- ✅ API routes for awards, projects, and chat
- ✅ Claude AI integration
- ✅ File upload system
- ✅ Dependencies installed

## 🔧 Steps to Complete Setup

### Step 1: Initialize Database

Since Prisma engines couldn't be downloaded in the build environment, you'll need to initialize the database in your local environment:

```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
npx prisma db push
```

If you encounter issues, try:
```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma db push
```

### Step 2: Configure API Key

Edit the `.env` file and add your Anthropic Claude API key:

```bash
ANTHROPIC_API_KEY="sk-ant-api03-your_actual_key_here"
```

You can get an API key from: https://console.anthropic.com/

### Step 3: Create Upload Directories

The application will create these automatically, but you can create them manually if needed:

```bash
mkdir -p public/uploads/entry-kits
mkdir -p public/uploads/projects
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:3000

## 🧪 Testing the Application

### Test 1: Home Page

1. Open http://localhost:3000
2. You should see:
   - Welcome page with feature cards
   - List of 9 supported awards
   - Navigation to Awards and Projects

### Test 2: Upload Entry Kit

1. Navigate to the **Awards** page
2. Click **"Upload Entry Kit"** button
3. Fill in the form:
   - **Award Name**: Select "Cannes Lions" (or any other)
   - **Country**: "International - France"
   - **Language**: English
   - **Description**: (optional) "Premier international creative excellence awards"
   - **Entry Kit PDF**: Upload any PDF file (ideally a real entry kit)
4. Click **Upload**
5. Verify:
   - You're redirected to the Awards page
   - The award card appears with your uploaded data
   - You can click "View PDF" to see the uploaded file

### Test 3: Create Project

1. Navigate to the **Projects** page
2. Click **"Create Project"** button
3. Fill in the form:
   - **Project Name**: "FutureGuessr Campaign"
   - **Description**: (optional) "Climate gaming campaign for environmental awareness"
   - **Project Board PDF**: Upload any PDF file (ideally a project one-pager)
4. Click **Create**
5. Verify:
   - You're redirected to the project detail page
   - Project name and description are displayed
   - You can view the uploaded board PDF

### Test 4: Start Submission and Chat

1. From the project detail page
2. In the "Start New Submission" section, find an available award
3. Click **"Start Submission"** on any award
4. Verify:
   - You're redirected to the submission/chat page
   - The chat interface loads
   - Project and award details are shown in the sidebar

### Test 5: AI Chat Assistant

**Important**: This requires a valid Anthropic API key!

1. In the chat interface, click **"Start Analysis"** or type a message
2. Example messages to try:
   - "Analyze my project for this award"
   - "What categories would be best for my campaign?"
   - "Help me understand the judging criteria"
3. Verify:
   - AI responds with relevant insights
   - Messages appear in the chat history
   - Chat is persistent (refresh the page and messages remain)

### Test 6: Multiple Submissions

1. Go back to the project detail page
2. Start submissions for additional awards
3. Verify:
   - Each submission has its own chat session
   - Active submissions are listed on the project page
   - You can switch between different award submissions

## 🔍 Verification Checklist

- [ ] Application runs without errors on http://localhost:3000
- [ ] Awards page displays and allows uploads
- [ ] Projects page displays and allows creation
- [ ] Entry kit PDFs are accessible
- [ ] Project board PDFs are accessible
- [ ] Submission creation works
- [ ] Chat interface loads correctly
- [ ] AI responses are generated (with valid API key)
- [ ] Chat history persists after refresh
- [ ] Multiple submissions can be created for one project
- [ ] Navigation between pages works smoothly

## 🐛 Common Issues and Solutions

### Issue: "Failed to fetch Prisma engines"

**Solution**: Run with checksum bypass:
```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
```

### Issue: "Invalid API key" in chat

**Solution**:
1. Check your `.env` file has `ANTHROPIC_API_KEY` set
2. Verify the key starts with `sk-ant-`
3. Restart the dev server after changing `.env`
4. Test the key at https://console.anthropic.com/

### Issue: "File upload failed"

**Solution**:
1. Check that `public/uploads/` directories exist
2. Verify file permissions (should be writable)
3. Check file size (default limit is 10MB in `next.config.js`)
4. Ensure you're uploading PDF files

### Issue: Database errors

**Solution**:
```bash
# Reset database
rm prisma/dev.db
npx prisma db push

# Or migrate
npx prisma migrate reset
```

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill existing process
lsof -ti:3000 | xargs kill
```

## 📊 Database Inspection

To inspect your database:

```bash
# Open Prisma Studio (visual database browser)
npx prisma studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all tables and data
- Add/edit/delete records
- Test database queries

## 🚀 Next Steps After Testing

1. **Add Real Entry Kits**: Upload actual PDF entry kits for the 9 supported awards
2. **Test with Real Projects**: Upload real campaign one-pagers
3. **Refine AI Prompts**: Adjust the system prompt in `app/api/chat/route.ts` for better responses
4. **Add PDF Parsing**: Implement automatic category extraction from entry kits
5. **Deploy to Production**: Use Vercel, Railway, or another hosting platform
6. **Add Authentication**: Implement NextAuth for user management
7. **Enhance UI**: Add more interactive elements, better error handling

## 📝 Test Data Suggestions

For realistic testing, prepare:

1. **Entry Kits** (PDF):
   - Download from award websites (usually 100-200 pages)
   - Contains categories, criteria, rules

2. **Project One-Pagers** (PDF):
   - Campaign overview
   - Objectives and strategy
   - Results and metrics
   - Visuals/screenshots

3. **Test Scenarios**:
   - Tech/Innovation campaigns → Cannes Lions Innovation, D&AD Digital
   - Social Impact campaigns → LIA Social Impact, One Show Purpose
   - Creative campaigns → Club des DA, Grand Prix Stratégies

## 💡 Usage Tips

1. **Start with one award**: Upload one entry kit and one project to test the full flow
2. **Test AI thoroughly**: The AI is the core feature - test various question types
3. **Check persistence**: Refresh pages to ensure data is saved correctly
4. **Test edge cases**: Empty forms, large files, special characters in names
5. **Monitor logs**: Check terminal for any errors or warnings

## 📧 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review the main README.md
3. Check the Next.js and Prisma documentation
4. Create an issue in the repository

## 🎉 Success Criteria

Your setup is complete when you can:

✅ Upload an entry kit for an award
✅ Create a project with a board
✅ Start a submission
✅ Have a conversation with the AI about your project
✅ Get category recommendations from the AI
✅ See all data persist after page refresh

Happy testing! 🚀
