// filepath: d:\Codes and programs\GitHub-repos\Portfolio\Scripts\downloading.js
class DownloadManager {
  constructor() {
    this.isDownloading = false;
    this.overlay = null;
    this.progressBar = null;
    this.progressText = null;
    this.syncIcon = null;
    this.contentDiv = null;

    this.init();
  }

  init() {
    this.createProgressOverlay();
    this.bindDownloadButtons();
    this.bindKeyboardEvents();
    this.showInitialOverlay(); // Show overlay on page load
  }

  createProgressOverlay() {
    // Create overlay element
    this.overlay = document.createElement("div");
    this.overlay.className = "download-progress-overlay";
    this.overlay.setAttribute("role", "dialog");
    this.overlay.setAttribute("aria-labelledby", "download-title");
    this.overlay.setAttribute("aria-describedby", "download-description");

    // Create content container
    this.contentDiv = document.createElement("div");
    this.contentDiv.className = "download-progress-content";

    // Create content HTML with "Hi" message and security icons
    this.contentDiv.innerHTML = `
            <div class="greeting-container">
                <div class="greeting-icon">
                    <i class="fas fa-shield-alt"></i>
                    <i class="fas fa-biohazard"></i>
                </div>
                <h3 id="download-title">Hi there! <span class="wave">👋</span></h3>
                <p id="download-description">Securely downloading your CV...</p>
            </div>
            <div class="sync-icon">
                <i class="fas fa-sync-alt"></i>
            </div>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
            <div class="progress-text">Initializing secure connection...</div>
            <button class="close-progress" style="display: none;">Close</button>
        `;

    this.overlay.appendChild(this.contentDiv);
    document.body.appendChild(this.overlay);

    // Get references to elements
    this.progressBar = this.overlay.querySelector(".progress-bar");
    this.progressText = this.overlay.querySelector(".progress-text");
    this.syncIcon = this.overlay.querySelector(".sync-icon i");
    this.greetingContainer = this.overlay.querySelector(".greeting-container");

    // Bind close button
    const closeBtn = this.overlay.querySelector(".close-progress");
    closeBtn.addEventListener("click", () => this.hideProgress());

    // Close on overlay click
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.hideProgress();
      }
    });
  }

  showInitialOverlay() {
    // Show the overlay immediately on page load
    this.showProgress();
    this.simulateDownloadProgress().then(() => {
      // After simulating progress, you can hide the overlay
      this.hideProgress();
    });
  }

  async simulateDownloadProgress() {
    const steps = [
      { progress: 0, text: "Initializing download..." },
      { progress: 20, text: "Connecting to server..." },
      { progress: 40, text: "Retrieving CV file..." },
      { progress: 60, text: "Processing document..." },
      { progress: 80, text: "Finalizing download..." },
      { progress: 95, text: "Almost ready..." },
    ];

    for (const step of steps) {
      await this.updateProgress(step.progress, step.text);
      await this.delay(300 + Math.random() * 200); // Random delay for realism
    }
  }

  // ... (rest of the existing methods remain unchanged)

  hideProgress() {
    this.overlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling

    // Reset progress
    this.resetProgress();
  }

  // ... (rest of the existing methods remain unchanged)
}

// Initialize download manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DownloadManager();
});

// Export for use in other scripts if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = DownloadManager;
}