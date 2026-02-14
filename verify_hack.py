import os
from playwright.sync_api import sync_playwright

def verify_hack_overlay():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = f"file://{os.getcwd()}/index.html"
        print(f"Loading {file_path}")
        page.goto(file_path)

        # Wait for Hack Overlay
        print("Waiting for Hack Overlay...")
        try:
            page.wait_for_selector("#hack-overlay:not(.hidden)", timeout=5000)
            page.screenshot(path="verification/hack_overlay_v2.png")
            print("Screenshot taken: verification/hack_overlay_v2.png")
        except Exception as e:
            print(f"Error: {e}")

        browser.close()

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    verify_hack_overlay()
