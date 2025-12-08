
// Step 1: Import the pipeline function from the transformers library
import { pipeline, env } from '@huggingface/transformers';



// Step 2: Create a sentiment analysis pipeline
// This will download a pre-trained model (only on first run)
// You can specify a model from Hugging Face Hub as the second argument
console.log('Loading model...');
const classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
  dtype: 'fp32',  // Explicitly set dtype: 'fp32', 'fp16', or 'q8' (quantized)
});



// Step 3: Analyze some text!
// You can call the pipeline like a regular function
console.log('Classifying text...');
const output = await classifier('I love using Hugging Face transformers!');
const reviewer = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment', {
  dtype: 'fp32',  // Explicitly set dtype: 'fp32', 'fp16', or 'q8' (quantized)
});



// Step 4: Analyze some text!

const result = await reviewer('The Shawshank Redemption is a true masterpiece of cinema but Plan 9 from Outer Space (1959) Directed by Ed Wood Jr., this film is often.');


// Step 5: Print the result
// Output: [{ label: 'POSITIVE', score: 0.999... }]
console.log('Result:', result);