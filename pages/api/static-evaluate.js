// Static version of the evaluation API for exported sites
// This dummy file prevents build errors when exporting the site

export default function handler(req, res) {
  return res.status(200).json({
    score: 0,
    suggestions: [
      "This is a static export of the site.",
      "API functionality requires server deployment."
    ],
    exampleAnswer: "For full functionality, deploy to Vercel with server-side rendering enabled."
  });
}