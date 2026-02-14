# Valentine's Prank: The "Hack" Hotel 🐞💖

A harmless, playful Valentine's Day prank disguised as a boutique hotel booking site.

## How it works
1.  **The Hook:** The user opens a link to "Danube Darling Hotel", a cute, generic hotel page.
2.  **The Prank:** After 2.5 seconds, a "YOU HAVE BEEN HACKED" overlay appears with a cute bug.
3.  **The Gate:** They must enter a passcode (hint provided) to unlock the screen.
4.  **The Reveal:** A custom Valentine's message, photos, and confetti!

## How to Customize
1.  Open `script.js`.
2.  Edit the `REVEAL_MESSAGE` constant at the top of the file to change the final love note.
    ```javascript
    const REVEAL_MESSAGE = "Your custom message here...";
    ```
3.  Edit the `PASSCODE` constant if you want a different password (default: `zara`).
4.  Replace images in the `assets/` folder if you want different photos (keep the filenames `meerkat.jpg`, `raccoon.jpg`, `king-julian.jpg` or update the HTML).

## How to Run Locally
Simply open the `index.html` file in any web browser.

## How to Deploy (Shareable Link)
To send this to your special someone, you need a web link. GitHub Pages is the easiest free way:

1.  **Push the code** to your GitHub repository.
2.  Go to the repository **Settings**.
3.  On the left sidebar, click **Pages**.
4.  Under **Build and deployment** > **Branch**, select `main` (or `master`) and folder `/ (root)`.
5.  Click **Save**.
6.  Wait a minute, and GitHub will give you a link (e.g., `https://yourname.github.io/repo-name/`).
7.  Share that link!

## Mobile Friendly
The site is responsive and works great on mobile phones.

## Credits
-   Built with vanilla HTML/CSS/JS.
-   No external dependencies or tracking.
-   Safe and secure (client-side only).
