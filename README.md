# 🤗 Transformers.js Playground

A beginner-friendly demo showcasing [Transformers.js](https://huggingface.co/docs/transformers.js) - run machine learning models directly in your browser!

[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Demo-black?logo=vercel)](https://transformers-micrometre.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-micrometre-181717?logo=github)](https://github.com/micrometre/transformers)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

**🔗 [Live Demo](https://transformers-micrometre.vercel.app)** | **📂 [GitHub Repo](https://github.com/micrometre/transformers)**

## ✨ Features

- **😊 Sentiment Analysis** - Analyze text for positive/negative sentiment
- **⭐ Sentiment Rating** - Rate text on a 1-5 star scale (multilingual)
- **📝 Text Summarization** - Condense long articles into brief summaries
- **✨ Text2Text Generation** - Translate text, answer questions, and more
- **🔤 Fill in the Blank** - Predict missing words in sentences
- **🇬🇧 UK History Quiz** - AI-powered question answering
- **🌍 Language Detection** - Detect what language text is written in
- **📊 Progress Tracking** - Visual progress bars during model download
- **🚀 No Backend Required** - Everything runs in the browser!

## 🛠️ Models Used

| Task | Model | Size |
|------|-------|------|
| Text Summarization | `Xenova/distilbart-cnn-6-6` | ~300MB |
| Sentiment Analysis | `Xenova/distilbert-base-uncased-finetuned-sst-2-english` | ~67MB |
| Sentiment Rating | `Xenova/bert-base-multilingual-uncased-sentiment` | ~200MB |
| Text2Text Generation | `Xenova/flan-t5-small` | ~330MB |
| Fill in the Blank | `Xenova/bert-base-uncased` | ~440MB |
| Language Detection | `onnx-community/language_detection-ONNX` | ~450MB |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/micrometre/transformers
cd transfromers

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

The easiest way to deploy this app:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/micrometre/transformers)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

That's it! Vercel auto-detects Vite and configures everything.

## 📁 Project Structure

```
transformers/
├── index.html      # Main HTML with UI
├── main.js         # App logic with Transformers.js
├── package.json    # Dependencies and scripts
└── scripts/        # Standalone examples
    └── text2text-gen.js
```

## 🎓 Learning Resources

- [Transformers.js Documentation](https://huggingface.co/docs/transformers.js)
- [Available Models](https://huggingface.co/models?library=transformers.js)
- [Xenova's Models](https://huggingface.co/Xenova) - Pre-converted ONNX models

## 📝 Examples

### Sentiment Analysis
```javascript
import { pipeline } from '@huggingface/transformers';

const classifier = await pipeline('sentiment-analysis');
const result = await classifier('I love coding!');
// [{ label: 'POSITIVE', score: 0.999 }]
```

### Text2Text Generation
```javascript
import { pipeline } from '@huggingface/transformers';

const generator = await pipeline('text2text-generation', 'Xenova/flan-t5-small');
const result = await generator('Translate to French: Hello!');
// [{ generated_text: 'Bonjour!' }]
```

### Sentiment Rating (Multilingual)
```javascript
import { pipeline } from '@huggingface/transformers';

const rater = await pipeline('text-classification', 'Xenova/bert-base-multilingual-uncased-sentiment');
const result = await rater('This product exceeded my expectations!');
// [{ label: '5 stars', score: 0.85 }]
```

### Specify Model Options
```javascript
const classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
    dtype: 'fp32',  // 'fp32', 'fp16', or 'q8'
    progress_callback: (progress) => {
        console.log(progress);
    }
});
```

## To dos

- 🖼️ Image Classification - Classify images into categories


## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

MIT
