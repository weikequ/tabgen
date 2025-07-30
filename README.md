# `tabgen`

**Generate data in a tabular format with LLMs**

`tabgen` is a general purpose research tool that uses LLMs to help you research, organize, and populate data tables automatically. Simply describe what information you're looking for, and `tabgen` will generate the appropriate table structure and fill it with relevant data.

## ✨ What `tabgen` Does

`tabgen` transforms your research ideas into structured data tables through three simple steps:

1. **Describe Your Data**: Tell `tabgen` what kind of information you're researching (e.g., "tech startups in San Francisco," "renewable energy companies," "popular programming languages", "good tropical vacation spots")

2. **AI Generates Structure**: `tabgen` automatically creates:
   - **Column headers** (fields) relevant to your topic
   - **Row headers** (entities/items) to research
   - **Data cells** filled with accurate information

3. **Interactive Exploration**: Navigate your data using an interactive canvas

## 🚀 Key Features

- **AI-Powered Table Generation**: Automatic creation of columns, rows, and data based on natural language descriptions
- **Interactive Canvas**: Zoom, pan, and navigate large datasets with ease
- **Real-time Streaming**: Watch your table populate in real-time as AI generates content
- **Flexible Schema**: Support for different data types (strings, numbers, booleans)
- **Customizable Prompts**: Add additional context for both columns and rows to refine results

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui components
- **AI Integration**: Azure OpenAI (GPT-4.1-mini)
- **State Management**: Zustand
- **Spreadsheet**: react-spreadsheet
- **Schema Validation**: Zod

## 🎯 Use Cases

- **Market Research**: Generate tables of companies, products, or competitors
- **Academic Research**: Organize information about topics, people, or concepts
- **Data Collection**: Structure and populate datasets for analysis
- **Content Planning**: Create organized lists with detailed attributes
- **Competitive Analysis**: Compare features, pricing, or specifications

## 🔮 Roadmap

Upcoming features include:

- Web search integration for real-time data
- Citation tracking and sources
- Export capabilities (CSV, Excel, JSON)
- Multiple data source support (PDFs, images, audio)
- User authentication and premium features
- Advanced search and filtering
- n-dimensional searching (beyond tables)

## 🚦 Getting Started

1. **Install dependencies**:

   ```bash
   bun install
   ```

2. **Set up environment variables**:
   Configure your Azure OpenAI credentials

3. **Run the development server**:

   ```bash
   bun dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

5. **Start generating**:
   - Enter a description of the data you want to research
   - Click "Generate Column Headers"
   - Click "Generate Row Headers"
   - Click "Generate All" to populate the table

## 🤝 Contributing

`tabgen` is actively being developed. Check out the [ROADMAP.md](./ROADMAP.md) to see planned features and contribute to the project.

---

_Transform your research ideas into structured data with the power of AI._
