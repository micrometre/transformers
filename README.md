# 🤗 Transformers.js Demo

A beginner-friendly demo showcasing [Transformers.js](https://huggingface.co/docs/transformers.js) - run machine learning models directly in your browser!

![Demo](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **😊 Sentiment Analysis** - Analyze text for positive/negative sentiment
- **✨ Text2Text Generation** - Translate text, answer questions, and more
- **📊 Progress Tracking** - Visual progress bars during model download
- **🚀 No Backend Required** - Everything runs in the browser!

## 🛠️ Models Used

| Task | Model | Size |
|------|-------|------|
| Sentiment Analysis | `Xenova/distilbert-base-uncased-finetuned-sst-2-english` | ~67MB |
| Text2Text Generation | `Xenova/flan-t5-small` | ~330MB |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
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

## 📁 Project Structure

```
transfromers/
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

### Specify Model Options
```javascript
const classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
    dtype: 'fp32',  // 'fp32', 'fp16', or 'q8'
    progress_callback: (progress) => {
        console.log(progress);
    }
});
```

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

MIT
