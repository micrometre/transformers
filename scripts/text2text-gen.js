
// Step 1: Import the pipeline function from the transformers library
import { pipeline } from '@huggingface/transformers';

// Step 2: Create a text2text-generation pipeline with a small, fast model
console.log('Loading model...');
const generator = await pipeline('text2text-generation', 'Xenova/flan-t5-small', {
    dtype: 'fp32',
});

// Step 3: Generate text - Flan-T5 is great for simple instructions
const result = await generator('Translate to French: Hello, how are you?');

// Step 4: Print the result
console.log('Result:', result);