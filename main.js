import { pipeline, env } from '@huggingface/transformers';

// Skip local model check (always use remote/cached)
env.allowLocalModels = false;

// ============================================
// SENTIMENT ANALYSIS
// ============================================
const SENTIMENT_MODEL = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
const SENTIMENT_TASK = 'sentiment-analysis';

// DOM elements for sentiment
const sentimentInput = document.getElementById('sentimentInput');
const sentimentBtn = document.getElementById('sentimentBtn');
const sentimentStatus = document.getElementById('sentimentStatus');
const sentimentResult = document.getElementById('sentimentResult');
const sentimentProgressContainer = document.getElementById('sentimentProgressContainer');
const sentimentProgressBar = document.getElementById('sentimentProgressBar');
const sentimentProgressInfo = document.getElementById('sentimentProgressInfo');
const sentimentModelName = document.getElementById('sentimentModelName');
const sentimentModelDetails = document.getElementById('sentimentModelDetails');

// ============================================
// TEXT2TEXT GENERATION
// ============================================
const TEXT2TEXT_MODEL = 'Xenova/flan-t5-small';
const TEXT2TEXT_TASK = 'text2text-generation';

// DOM elements for text2text
const text2textInput = document.getElementById('text2textInput');
const text2textBtn = document.getElementById('text2textBtn');
const text2textStatus = document.getElementById('text2textStatus');
const text2textResult = document.getElementById('text2textResult');
const text2textProgressContainer = document.getElementById('text2textProgressContainer');
const text2textProgressBar = document.getElementById('text2textProgressBar');
const text2textProgressInfo = document.getElementById('text2textProgressInfo');
const text2textModelName = document.getElementById('text2textModelName');
const text2textModelDetails = document.getElementById('text2textModelDetails');

// ============================================
// PROGRESS CALLBACK FACTORY
// ============================================
function createProgressCallback(statusEl, progressContainerEl, progressBarEl, progressInfoEl) {
    return (progress) => {
        if (progress.status === 'initiate') {
            progressContainerEl.style.display = 'block';
            statusEl.textContent = `⏳ Downloading: ${progress.file}`;
        } else if (progress.status === 'progress') {
            const percent = Math.round(progress.progress);
            progressBarEl.style.width = `${percent}%`;
            const sizeMB = (progress.loaded / 1024 / 1024).toFixed(1);
            const totalMB = (progress.total / 1024 / 1024).toFixed(1);
            progressInfoEl.textContent = `${progress.file}: ${sizeMB}MB / ${totalMB}MB (${percent}%)`;
        } else if (progress.status === 'done') {
            progressInfoEl.textContent = `✓ ${progress.file} complete`;
        } else if (progress.status === 'ready') {
            progressContainerEl.style.display = 'none';
            progressInfoEl.textContent = '';
        }
    };
}

// ============================================
// LOAD MODELS
// ============================================

// Display initial model info
sentimentModelName.textContent = SENTIMENT_MODEL;
sentimentModelDetails.innerHTML = `<span>📋 ${SENTIMENT_TASK}</span><span>⚡ fp32</span><span>⏳ Loading...</span>`;
sentimentStatus.textContent = '⏳ Loading model...';

text2textModelName.textContent = TEXT2TEXT_MODEL;
text2textModelDetails.innerHTML = `<span>📋 ${TEXT2TEXT_TASK}</span><span>⚡ fp32</span><span>⏳ Loading...</span>`;
text2textStatus.textContent = '⏳ Loading model...';

// Load sentiment model
const classifier = await pipeline(SENTIMENT_TASK, SENTIMENT_MODEL, {
    dtype: 'fp32',
    progress_callback: createProgressCallback(
        sentimentStatus, sentimentProgressContainer, sentimentProgressBar, sentimentProgressInfo
    ),
});
sentimentProgressContainer.style.display = 'none';
sentimentProgressInfo.textContent = '';
sentimentStatus.textContent = '✅ Ready!';
sentimentModelDetails.innerHTML = `<span>📋 ${SENTIMENT_TASK}</span><span>⚡ fp32</span><span>✅ Ready</span>`;
sentimentBtn.disabled = false;

// Load text2text model
const generator = await pipeline(TEXT2TEXT_TASK, TEXT2TEXT_MODEL, {
    dtype: 'fp32',
    progress_callback: createProgressCallback(
        text2textStatus, text2textProgressContainer, text2textProgressBar, text2textProgressInfo
    ),
});
text2textProgressContainer.style.display = 'none';
text2textProgressInfo.textContent = '';
text2textStatus.textContent = '✅ Ready!';
text2textModelDetails.innerHTML = `<span>📋 ${TEXT2TEXT_TASK}</span><span>⚡ fp32</span><span>✅ Ready</span>`;
text2textBtn.disabled = false;

// ============================================
// EVENT HANDLERS
// ============================================

// Sentiment Analysis
sentimentBtn.addEventListener('click', async () => {
    const text = sentimentInput.value.trim();
    if (!text) return;

    sentimentBtn.disabled = true;
    sentimentStatus.textContent = '🔍 Analyzing...';

    const output = await classifier(text);
    const { label, score } = output[0];

    sentimentResult.innerHTML = `
        <strong class="${label.toLowerCase()}">${label}</strong><br>
        Confidence: ${(score * 100).toFixed(1)}%
    `;

    sentimentStatus.textContent = '';
    sentimentBtn.disabled = false;
});

// Text2Text Generation
text2textBtn.addEventListener('click', async () => {
    const text = text2textInput.value.trim();
    if (!text) return;

    text2textBtn.disabled = true;
    text2textStatus.textContent = '✨ Generating...';

    const output = await generator(text, {
        max_new_tokens: 100,
    });

    text2textResult.innerHTML = `<strong>${output[0].generated_text}</strong>`;

    text2textStatus.textContent = '';
    text2textBtn.disabled = false;
});