# Daily Inspiration — website files

Website for `https://lizmstephens.github.io/inspiration/` (once published).

## Publish
1. In the public GitHub repository `lizmstephens/inspiration`, upload **the contents of this folder**, including the `assets` folder, into the repository root.
2. Commit changes.
3. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
4. Open `https://lizmstephens.github.io/inspiration/` after deployment.

## IMPORTANT before making public
- `contact.html` links to GitHub Issues for corrections/removals, requiring GitHub sign-in; enable Issues on your repository and ideally add a monitored email address or public form before launch so anyone can contact you.
- Check the About Me text and professional affiliations for accuracy and approval.
- Image licensing: Wind Phone photo is by Matthew Komatsu, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File:Ōtsuchi_wind_phone_5.jpg). The actual image is loaded from Wikimedia Commons; attribution and licence URL are provided in `inspiration.json` and visually credited on the homepage. This photo is **not** the illustrative image generated in earlier mockups.
- FloodNet has original photographs on its website, but permission for republishing one was not verified. This website deliberately uses a CSS abstract illustration for the FloodNet entry pending permission or an appropriately licensed alternative.
- Header hummingbird is cropped from an AI-generated mockup created for this project, not taken from a third-party article.
- The image link on Commons is remote; if hosting prevents loading, download an appropriate licensed copy and adjust `image` in `inspiration.json` while keeping attribution.
- Linked website content can change. Fact-check each new entry before publication.

## Add an inspiration
Edit `inspiration.json`. Copy an existing entry, give it a unique `id`, update `date` (YYYY-MM-DD), `title`, `summary`, `thoughts`, tags and `source`. Set `image` only to a verified reusable photo URL (or an image asset hosted in `assets/`). Do not add a copyrighted photo without sufficient rights. The latest date appears on the homepage; earlier entries are in the archive. The archive preview randomly chooses an older entry.

## Future publishing queue
For simplicity this prototype displays the newest entry by date. It DOES NOT yet have private draft storage, scheduled publication, visitor submissions, social posting, or an approval process. Do not upload future-dated private drafts to a public repository.

## Layout
- Top band: Daily Inspiration masthead, creator credentials and hummingbird banner.
- Main: full-width featured story with source image, **The Discovery** (AI-generated summary), then **My Thoughts** (human-written reflection).
- Below: From the Archive and Coming Soon.
- About Me page and correction/removal page included.

## Editorial provenance
The Discovery is the AI-generated/AI-assisted description stored in `summary`, and My Thoughts is contributor-written text stored in `thoughts`. Never fabricate or AI-write the human perspective; enter only the contributor’s approved words. The two demonstration entries were previously drafted in collaboration with ChatGPT and should be checked and approved before public publication.

## About Me
Uses the latest user-edited About Me copy provided on 27 October 2026.
