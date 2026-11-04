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

## October 27 identity update
The site now uses a navy wrapper, a pale yellow feature, a subtle scalloped yellow mark, a 50%-larger hummingbird SVG, and broad content tags. The About Me page links to the University of Reading staff profile.


## Automatic Collaborators updates

The `collaborators.html` page loads `collaborators.json` at visit time using
`collaborators.js`. The public JSON contains only name, country, background
tags, LinkedIn URL, image URL and curator flag—never email addresses.

To update it from the private **Contributors** tab, install the script in
`automation/collaborators-sync.gs` into the editorial spreadsheet's existing
Google Apps Script project. Create a fine-grained GitHub token restricted to
`lizmstephens/inspiration` with Contents read/write and set it as the
`GITHUB_TOKEN` **Script property** (not a spreadsheet cell).
Run `syncApprovedCollaborators` once to authorise and test. Then either call
the function from the existing 09:00 publishing job, or run
`installCollaboratorDailyTrigger` once to create an approximately 09:00
Europe/London daily trigger (Apps Script schedules within an hour).

Only records with **Card Approved = Yes** are published. Every subsequent
successful sync replaces the JSON atomically with approved records, retaining
spreadsheet row order. If the fetch fails, the Collaborators page retains the
previously saved static HTML cards rather than showing an empty page.

Do not make the source Google Sheet public; never put a GitHub token into the
repository or spreadsheet. Once the exporter is installed and verified, the
old static HTML cards can be removed if desired.
