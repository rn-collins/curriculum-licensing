# RN Collins Curriculum & Learning Systems

Static site for **institutional curriculum licensing and development**. Part of the RN Collins / Aloha AI ecosystem; uses the shared `aloha-ds.css` design system.

- **Production:** https://curriculum-licensing.vercel.app
- **Two offers:** license existing programs/courses · commission custom development
- **Two programs:** B.S. AI & Machine Learning · B.S. Cybersecurity & Critical Infrastructure Protection
- **Connected to:** [Aloha AI](https://aloha-ai-consulting.vercel.app) (direct-to-learner AI courses)

## Build

Pages are generated from `build.mjs` (shared head/nav/footer/scripts). To regenerate:

```bash
node build.mjs
```

Static HTML deploys to Vercel from `main`. Contact: collins.ra@northeastern.edu
