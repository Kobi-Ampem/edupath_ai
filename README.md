This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## EduPath AI - Career Guidance Platform for JHS Students in Ghana

EduPath AI helps Junior High School (JHS) students in Ghana make informed decisions about their education and career paths through personalized AI-powered guidance.

### Features

- 📚 **Subject Guidance**: Choose the right Senior High School (SHS) program and subjects
- 💼 **Career Guidance**: Explore career paths relevant to the Ghanaian job market
- 💚 **Mental Health Support**: Get help managing exam stress and academic anxiety
- 📊 **Career Assessments**: Take quizzes to discover your interests, personality, and skills
- 🎓 **Education Planning**: Plan your path from JHS to tertiary education

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google AI Studio API key (for AI chat functionality)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd edupath-ai
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Google AI Studio API key:

```bash
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

- Get your API key from: https://aistudio.google.com/apikey
- Sign in with your Google account and create a new API key

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### AI Chat Configuration

The chat feature uses Google's Gemini Pro model by default (stable and reliable). You can set a different model using the `GOOGLE_AI_MODEL` environment variable:

Available models:

- `gemini-pro` (default, recommended) - Stable, uses v1 API
- `gemini-1.5-pro-latest` - More capable, uses v1beta API
- `gemini-1.5-pro` - Previous version, uses v1beta API
- `gemini-1.0-pro` - Legacy version, uses v1 API

**Note:** The API automatically selects the correct API version (v1 or v1beta) based on the model name. If you encounter a 404 error, check the console for specific error messages and try a different model.

### Environment Variables

Required:

- `GOOGLE_AI_API_KEY`: Your Google AI Studio API key for AI chat functionality

Optional:

- `GOOGLE_AI_MODEL`: Override the default model (default: `gemini-2.5-flash`)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
