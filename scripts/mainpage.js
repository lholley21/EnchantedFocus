// Timer state management
class PomodoroTimer {
  constructor() {
    // Set to true for testing with shorter times (10s work, 5s break)
    this.demoMode = false;

    // Load saved settings or use defaults
    this.workTimeMinutes = parseInt(
      localStorage.getItem("workTimeMinutes") || "25"
    );
    this.breakTimeMinutes = parseInt(
      localStorage.getItem("breakTimeMinutes") || "5"
    );

    this.workTime = this.demoMode ? 10 : this.workTimeMinutes * 60;
    this.breakTime = this.demoMode ? 5 : this.breakTimeMinutes * 60;
    this.currentTime = this.workTime;
    this.isRunning = false;
    this.isBreak = false;
    this.interval = null;
    this.sessionsCompleted = parseInt(
      localStorage.getItem("sessionsCompleted") || "0"
    );
    this.potionsEarned = parseInt(localStorage.getItem("potionsEarned") || "0");

    this.potions = [
      { gif: "BigVial.gif", name: "Health Potion", requirement: 1 },
      { gif: "RoundPotion.gif", name: "Magic Potion", requirement: 2 },
      { gif: "SmallElixir.gif", name: "Moon Elixir", requirement: 3 },
      { gif: "SmallVial.gif", name: "Blood Vial", requirement: 4 },
      { gif: "LargeJar.gif", name: "Star Essence", requirement: 5 },
      { gif: "LargeTonic.gif", name: "Stamina Tonic", requirement: 7 },
      { gif: "GlowingPotion.gif", name: "Phoenix Flame", requirement: 10 },
      { gif: "ClassicJar.gif", name: "Magma Potion", requirement: 15 },
      { gif: "LargeBottle.gif", name: "Dragon Essence", requirement: 20 },
      { gif: "EncasedPotion.gif", name: "Master's Elixir", requirement: 25 },
    ];

    this.initializeElements();
    this.updateDisplay();
    this.updateProgress();
    this.updateStats();
    this.renderPotionGrid();
    this.updateSessionDisplay();
  }

  initializeElements() {
    this.timeDisplay = document.getElementById("time-display");
    this.sessionType = document.getElementById("session-type");
    this.startBtn = document.getElementById("start-btn");
    this.pauseBtn = document.getElementById("pause-btn");
    this.resetBtn = document.getElementById("reset-btn");
    this.settingsBtn = document.getElementById("settings-btn");
    this.sessionsCounter = document.getElementById("sessions-completed");
    this.potionsCounter = document.getElementById("potions-earned");
    this.potionGrid = document.getElementById("potion-grid");
    this.timerProgress = document.querySelector(".timer-progress");
    this.mainContent = document.querySelector(".main-content");

    // Settings panel elements
    this.settingsPanel = document.getElementById("settings-panel");
    this.workTimeInput = document.getElementById("work-time-input");
    this.breakTimeInput = document.getElementById("break-time-input");
    this.saveSettingsBtn = document.getElementById("save-settings-btn");
    this.cancelSettingsBtn = document.getElementById("cancel-settings-btn");

    // Initialize input values
    this.workTimeInput.value = this.workTimeMinutes;
    this.breakTimeInput.value = this.breakTimeMinutes;

    // Event listeners
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());
    this.settingsBtn.addEventListener("click", () => this.toggleSettings());
    this.saveSettingsBtn.addEventListener("click", () => this.saveSettings());
    this.cancelSettingsBtn.addEventListener("click", () =>
      this.cancelSettings()
    );

    // Keyboard shortcuts for settings
    this.workTimeInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.saveSettings();
      if (e.key === "Escape") this.cancelSettings();
    });
    this.breakTimeInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.saveSettings();
      if (e.key === "Escape") this.cancelSettings();
    });

    // Preset button event listeners
    const presetBtns = document.querySelectorAll(".preset-btn");
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const workTime = parseInt(btn.dataset.work);
        const breakTime = parseInt(btn.dataset.break);
        this.workTimeInput.value = workTime;
        this.breakTimeInput.value = breakTime;

        // Get preset name from button text
        const presetName = btn.textContent.split("\n")[0].trim();
        this.showNotification(
          `✨ ${presetName} preset selected! ${workTime}min work, ${breakTime}min break`,
          "info"
        );

        // Add visual feedback
        btn.style.background = "linear-gradient(145deg, #a855f7, #8b5cf6)";
        btn.style.borderColor = "#c084fc";
        btn.style.boxShadow = "0 0 20px rgba(168, 85, 247, 0.6)";
        btn.style.transform = "scale(0.98)";

        setTimeout(() => {
          btn.style.background = "";
          btn.style.borderColor = "";
          btn.style.boxShadow = "";
          btn.style.transform = "";
        }, 300);
      });
    });
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startBtn.style.display = "none";
      this.pauseBtn.style.display = "inline-block";

      this.interval = setInterval(() => {
        this.currentTime--;
        this.updateDisplay();
        this.updateProgress();

        if (this.currentTime <= 0) {
          this.complete();
        }
      }, 1000);
    }
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.startBtn.style.display = "inline-block";
    this.pauseBtn.style.display = "none";
  }

  reset() {
    this.pause();
    this.currentTime = this.isBreak ? this.breakTime : this.workTime;
    this.updateDisplay();
    this.updateProgress();
    this.updateSessionDisplay();
  }

  complete() {
    this.pause();

    if (!this.isBreak) {
      // Completed a work session
      this.sessionsCompleted++;
      localStorage.setItem(
        "sessionsCompleted",
        this.sessionsCompleted.toString()
      );

      // Check if earned a new potion
      const newPotionEarned = this.checkForNewPotion();
      if (newPotionEarned) {
        this.showPotionNotification(newPotionEarned);
      } else {
        this.showNotification("🎆 Work Session Complete! Time for a break.");
      }

      // Switch to break
      this.isBreak = true;
      this.currentTime = this.breakTime;
    } else {
      // Completed a break
      this.showNotification("✨ Break Complete! Ready for another session?");
      this.isBreak = false;
      this.currentTime = this.workTime;
    }

    this.updateStats();
    this.updateDisplay();
    this.updateProgress();
    this.updateSessionDisplay();
    this.renderPotionGrid();
  }

  checkForNewPotion() {
    const newPotionsCount = this.potions.filter(
      (p) => this.sessionsCompleted >= p.requirement
    ).length;

    if (newPotionsCount > this.potionsEarned) {
      this.potionsEarned = newPotionsCount;
      localStorage.setItem("potionsEarned", this.potionsEarned.toString());
      return this.potions[newPotionsCount - 1];
    }

    return null;
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `session-complete-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  showPotionNotification(potion) {
    const notification = document.createElement("div");
    notification.className = "session-complete-notification";
    notification.innerHTML = `
      <div style="margin-bottom: 10px;">
        <img src="../assets/potions/${potion.gif}" alt="${potion.name}" style="width: 48px; height: 48px; image-rendering: pixelated;" />
      </div>
      <div>New Potion Unlocked!</div>
      <div style="font-size: 16px; margin-top: 5px;">${potion.name}</div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  updateDisplay() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    this.timeDisplay.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  updateProgress() {
    const totalTime = this.isBreak ? this.breakTime : this.workTime;
    const progress = ((totalTime - this.currentTime) / totalTime) * 360;
    this.timerProgress.style.setProperty("--progress", `${progress}deg`);
  }

  updateSessionDisplay() {
    if (this.isBreak) {
      this.mainContent.classList.add("break-mode");
      this.sessionType.textContent = "Break Time";
    } else {
      this.mainContent.classList.remove("break-mode");
      this.sessionType.textContent = "Focus Time";
    }
  }

  toggleSettings() {
    const isHidden = this.settingsPanel.style.display === "none";
    if (isHidden) {
      this.settingsPanel.style.display = "block";
      this.settingsBtn.textContent = "❌ Close";
      // Update input values to current settings
      this.workTimeInput.value = this.workTimeMinutes;
      this.breakTimeInput.value = this.breakTimeMinutes;
    } else {
      this.settingsPanel.style.display = "none";
      this.settingsBtn.textContent = "⚙️ Settings";
    }
  }

  saveSettings() {
    const newWorkTime = parseInt(this.workTimeInput.value);
    const newBreakTime = parseInt(this.breakTimeInput.value);

    // Validate input
    if (newWorkTime < 1 || newWorkTime > 120) {
      this.showNotification(
        "⚠️ Work time must be between 1 and 120 minutes!",
        "warning"
      );
      return;
    }

    if (newBreakTime < 1 || newBreakTime > 60) {
      this.showNotification(
        "⚠️ Break time must be between 1 and 60 minutes!",
        "warning"
      );
      return;
    }

    // Update settings
    this.workTimeMinutes = newWorkTime;
    this.breakTimeMinutes = newBreakTime;
    this.workTime = this.demoMode ? 10 : this.workTimeMinutes * 60;
    this.breakTime = this.demoMode ? 5 : this.breakTimeMinutes * 60;

    // Save to localStorage
    localStorage.setItem("workTimeMinutes", this.workTimeMinutes.toString());
    localStorage.setItem("breakTimeMinutes", this.breakTimeMinutes.toString());

    // Reset timer if not running
    if (!this.isRunning) {
      this.currentTime = this.isBreak ? this.breakTime : this.workTime;
      this.updateDisplay();
      this.updateProgress();
    }

    // Close settings panel
    this.toggleSettings();

    this.showNotification(
      `✨ Settings saved! Work: ${this.workTimeMinutes}min, Break: ${this.breakTimeMinutes}min`,
      "success"
    );
  }

  cancelSettings() {
    // Reset input values to current settings
    this.workTimeInput.value = this.workTimeMinutes;
    this.breakTimeInput.value = this.breakTimeMinutes;

    // Close settings panel
    this.toggleSettings();
  }

  updateStats() {
    this.sessionsCounter.textContent = this.sessionsCompleted;
    this.potionsCounter.textContent = this.potionsEarned;
  }

  renderPotionGrid() {
    this.potionGrid.innerHTML = "";

    this.potions.forEach((potion, index) => {
      const slot = document.createElement("div");
      slot.className = "potion-slot";

      if (this.sessionsCompleted >= potion.requirement) {
        slot.classList.add("unlocked");

        // Create and add the GIF image
        const img = document.createElement("img");
        img.src = `../assets/potions/${potion.gif}`;
        img.alt = potion.name;
        img.className = "potion-gif";
        slot.appendChild(img);

        slot.title = `${potion.name} - Unlocked after ${potion.requirement} sessions`;
      } else {
        slot.classList.add("locked");
        slot.title = `${potion.name} - Complete ${potion.requirement} sessions to unlock`;
      }

      this.potionGrid.appendChild(slot);
    });
  }
}

// Window controls
document.getElementById("min-btn").addEventListener("click", () => {
  window.electronAPI.windowControl("minimize");
});

document.getElementById("close-btn").addEventListener("click", () => {
  window.electronAPI.windowControl("close");
});

// Navigation
const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.electronAPI.openPageAndClose("index");
  });
}

const goalsBtn = document.getElementById("goals-btn");
if (goalsBtn) {
  goalsBtn.addEventListener("click", () => {
    window.electronAPI.openPageAndClose("goals"); // Close current window and open goals
  });
}

// Listen for page errors
if (window.electronAPI.onPageError) {
  window.electronAPI.onPageError((event, error) => {
    console.error("Page navigation error:", error);
    alert(`Navigation error: ${error}`);
  });
}

// Initialize timer when page loads
document.addEventListener("DOMContentLoaded", () => {
  new PomodoroTimer();
});

// Initialize immediately if DOM is already loaded
if (document.readyState === "loading") {
  // Do nothing, DOMContentLoaded will fire
} else {
  // DOM is already ready
  new PomodoroTimer();
}
