import { pipeline, env } from '@huggingface/transformers';

// Skip local model check (always use remote/cached)
env.allowLocalModels = false;

// ============================================
// TEXT SUMMARIZATION
// ============================================
const SUMMARIZE_MODEL = 'Xenova/distilbart-cnn-6-6';
const SUMMARIZE_TASK = 'summarization';

// DOM elements for summarization
const summarizeInput = document.getElementById('summarizeInput');
const summarizeBtn = document.getElementById('summarizeBtn');
const summarizeStatus = document.getElementById('summarizeStatus');
const summarizeResult = document.getElementById('summarizeResult');
const summarizeProgressContainer = document.getElementById('summarizeProgressContainer');
const summarizeProgressBar = document.getElementById('summarizeProgressBar');
const summarizeProgressInfo = document.getElementById('summarizeProgressInfo');
const summarizeModelName = document.getElementById('summarizeModelName');
const summarizeModelDetails = document.getElementById('summarizeModelDetails');

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
// FILL-MASK
// ============================================
const FILLMASK_MODEL = 'Xenova/bert-base-uncased';
const FILLMASK_TASK = 'fill-mask';

// DOM elements for fill-mask
const fillmaskInput = document.getElementById('fillmaskInput');
const fillmaskBtn = document.getElementById('fillmaskBtn');
const fillmaskStatus = document.getElementById('fillmaskStatus');
const fillmaskResult = document.getElementById('fillmaskResult');
const fillmaskProgressContainer = document.getElementById('fillmaskProgressContainer');
const fillmaskProgressBar = document.getElementById('fillmaskProgressBar');
const fillmaskProgressInfo = document.getElementById('fillmaskProgressInfo');
const fillmaskModelName = document.getElementById('fillmaskModelName');
const fillmaskModelDetails = document.getElementById('fillmaskModelDetails');

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
// LOADING BANNER
// ============================================
const loadingBanner = document.getElementById('loadingBanner');
const loadingProgress = document.getElementById('loadingProgress');
let modelsLoaded = 0;
const totalModels = 4;

function updateLoadingProgress() {
    modelsLoaded++;
    loadingProgress.textContent = `${modelsLoaded} / ${totalModels}`;
    
    if (modelsLoaded >= totalModels) {
        // All models loaded - hide banner with fade
        loadingBanner.style.transition = 'opacity 0.5s, transform 0.5s';
        loadingBanner.style.opacity = '0';
        loadingBanner.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            loadingBanner.classList.add('hidden');
        }, 500);
    }
}

// ============================================
// LOAD MODELS
// ============================================

// Display initial model info
summarizeModelName.textContent = SUMMARIZE_MODEL;
summarizeModelDetails.innerHTML = `<span>📋 ${SUMMARIZE_TASK}</span><span>⚡ fp32</span><span>⏳ Loading...</span>`;
summarizeStatus.textContent = '⏳ Loading model...';

sentimentModelName.textContent = SENTIMENT_MODEL;
sentimentModelDetails.innerHTML = `<span>📋 ${SENTIMENT_TASK}</span><span>⚡ fp32</span><span>⏳ Loading...</span>`;
sentimentStatus.textContent = '⏳ Loading model...';

text2textModelName.textContent = TEXT2TEXT_MODEL;
text2textModelDetails.innerHTML = `<span>📋 ${TEXT2TEXT_TASK}</span><span>⚡ fp32</span><span>⏳ Loading...</span>`;
text2textStatus.textContent = '⏳ Loading model...';

fillmaskModelName.textContent = FILLMASK_MODEL;
fillmaskModelDetails.innerHTML = `<span>📋 ${FILLMASK_TASK}</span><span>⚡ fp32</span><span>⏳ Loading...</span>`;
fillmaskStatus.textContent = '⏳ Loading model...';

// Load summarization model (first, since it's at the top)
const summarizer = await pipeline(SUMMARIZE_TASK, SUMMARIZE_MODEL, {
    dtype: 'fp32',
    progress_callback: createProgressCallback(
        summarizeStatus, summarizeProgressContainer, summarizeProgressBar, summarizeProgressInfo
    ),
});
summarizeProgressContainer.style.display = 'none';
summarizeProgressInfo.textContent = '';
summarizeStatus.textContent = '✅ Ready!';
summarizeModelDetails.innerHTML = `<span>📋 ${SUMMARIZE_TASK}</span><span>⚡ fp32</span><span>✅ Ready</span>`;
summarizeBtn.disabled = false;
updateLoadingProgress();

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
updateLoadingProgress();

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
updateLoadingProgress();

// Load fill-mask model
const filler = await pipeline(FILLMASK_TASK, FILLMASK_MODEL, {
    dtype: 'fp32',
    progress_callback: createProgressCallback(
        fillmaskStatus, fillmaskProgressContainer, fillmaskProgressBar, fillmaskProgressInfo
    ),
});
fillmaskProgressContainer.style.display = 'none';
fillmaskProgressInfo.textContent = '';
fillmaskStatus.textContent = '✅ Ready!';
fillmaskModelDetails.innerHTML = `<span>📋 ${FILLMASK_TASK}</span><span>⚡ fp32</span><span>✅ Ready</span>`;
fillmaskBtn.disabled = false;
updateLoadingProgress();

// ============================================
// UK HISTORY QUIZ
// ============================================
const quizBtns = document.querySelectorAll('.quiz-btn');
const quizBtn = document.getElementById('quizBtn');
const quizStatus = document.getElementById('quizStatus');
const quizResult = document.getElementById('quizResult');
const quizModelDetails = document.getElementById('quizModelDetails');

let selectedQuestion = null;

// Enable quiz once text2text model is loaded
quizModelDetails.innerHTML = `<span>🧠 Q&A</span><span>✅ Ready</span>`;
quizBtns.forEach(btn => btn.disabled = false);

// Handle question selection
quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quizBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedQuestion = btn.dataset.question;
        quizBtn.disabled = false;
        quizResult.innerHTML = '';
    });
});

// ============================================
// EVENT HANDLERS
// ============================================

// Text Summarization
summarizeBtn.addEventListener('click', async () => {
    const text = summarizeInput.value.trim();
    if (!text) return;

    summarizeBtn.disabled = true;
    summarizeStatus.textContent = '📝 Summarizing...';

    const output = await summarizer(text, {
        max_new_tokens: 100,
        min_length: 20,
    });

    summarizeResult.innerHTML = `<strong>${output[0].summary_text}</strong>`;

    summarizeStatus.textContent = '';
    summarizeBtn.disabled = false;
});

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

// UK History Quiz
quizBtn.addEventListener('click', async () => {
    if (!selectedQuestion) return;

    quizBtn.disabled = true;
    quizBtns.forEach(btn => btn.disabled = true);
    quizStatus.textContent = '🤔 Thinking...';

    const prompt = `Answer this UK history question: ${selectedQuestion}`;
    const output = await generator(prompt, {
        max_new_tokens: 50,
    });

    quizResult.innerHTML = `
        <strong>Q:</strong> ${selectedQuestion}<br><br>
        <strong>A:</strong> ${output[0].generated_text}
    `;

    quizStatus.textContent = '';
    quizBtn.disabled = false;
    quizBtns.forEach(btn => btn.disabled = false);
});

// Fill in the Blank
fillmaskBtn.addEventListener('click', async () => {
    const text = fillmaskInput.value.trim();
    if (!text || !text.includes('[MASK]')) {
        fillmaskResult.innerHTML = '<span style="color: #dc3545;">Please include [MASK] in your text!</span>';
        return;
    }

    fillmaskBtn.disabled = true;
    fillmaskStatus.textContent = '🔤 Filling in...';

    const output = await filler(text);
    
    // Show top 3 predictions
    const topResults = output.slice(0, 3).map((item, i) => 
        `${i + 1}. <strong>${item.token_str}</strong> <span style="color: #666;">(${(item.score * 100).toFixed(1)}%)</span>`
    ).join('<br>');

    fillmaskResult.innerHTML = topResults;

    fillmaskStatus.textContent = '';
    fillmaskBtn.disabled = false;
});