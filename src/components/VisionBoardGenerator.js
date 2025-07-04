// import React, { useState } from 'react';

// Main App component for the AI Vision Board Generator
// const App = () => {
//   const [prompt, setPrompt] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   // Function to handle image generation
//   const generateImage = async () => {
//     if (!prompt.trim()) {
//       setError('Please describe your ideal minimalist space!');
//       return;
//     }

//     setLoading(true);
//     setImageUrl('');
//     setError('');
//     setMessage('Generating your minimalist vision... this might take a moment!');

//     try {
//       // OpenAI API call for image generation (using Imagen 3.0)
//       const payload = { instances: { prompt: prompt }, parameters: { "sampleCount": 1 } };
//       const apiKey = ""; // Canvas will automatically provide this at runtime
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || 'Failed to generate image');
//       }

//       const result = await response.json();

//       if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
//         const generatedImageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
//         setImageUrl(generatedImageUrl);
//         setMessage('Your minimalist vision board is ready!');
//       } else {
//         setError('Could not generate image. Please try a different description.');
//       }
//     } catch (err) {
//       console.error('Image generation error:', err);
//       setError(`Error: ${err.message}. Please try again.`);
//       setMessage('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans antialiased">
//       <script src="https://cdn.tailwindcss.com"></script>
//       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

//       <style>
//         {`
//         body {
//           font-family: 'Inter', sans-serif;
//         }
//         .loading-spinner {
//           border: 4px solid rgba(0, 0, 0, 0.1);
//           border-left-color: #6366f1; /* Tailwind indigo-500 */
//           border-radius: 50%;
//           width: 24px;
//           height: 24px;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         `}
//       </style>

//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Vision Board Generator</h1>
//         <p className="text-gray-600 mb-6">
//           Describe your ideal minimalist organizing zone and let AI visualize it for you.
//           This helps set a clear goal for your decluttering journey.
//         </p>

//         <textarea
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y min-h-[80px]"
//           placeholder="e.g., 'a serene, clutter-free bedroom with natural light and a cozy reading nook'"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           rows="4"
//         ></textarea>

//         <button
//           onClick={generateImage}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//         >
//           {loading ? (
//             <>
//               <div className="loading-spinner mr-2"></div>
//               Generating...
//             </>
//           ) : (
//             'Generate Vision Board'
//           )}
//         </button>

//         {error && (
//           <p className="text-red-500 mt-4 text-sm">{error}</p>
//         )}

//         {message && !error && (
//           <p className="text-gray-500 mt-4 text-sm animate-pulse">{message}</p>
//         )}

//         {imageUrl && (
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Minimalist Vision:</h2>
//             <div className="relative w-full overflow-hidden rounded-lg shadow-md">
//               <img
//                 src={imageUrl}
//                 alt="AI Generated Minimalist Vision Board"
//                 className="w-full h-auto rounded-lg"
//                 onError={(e) => {
//                   e.target.onerror = null; // Prevents infinite loop
//                   e.target.src = "https://placehold.co/400x300/e0e0e0/555555?text=Image+Load+Error";
//                   setError("Failed to load image. Please try generating again.");
//                 }}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
