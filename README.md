# 🪄 Enchanted Focus Timer

<div align="center">

![Witchy Banner](https://img.shields.io/badge/✨_Enchanted_Productivity_✨-2b1a2f?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNzZDN0MwIi8+Cjwvc3ZnPgo=)

_A mystical Pomodoro timer that turns productivity into a magical adventure_ 🧙‍♀️

[![Mystery Quest Font](https://img.shields.io/badge/Font-Mystery_Quest-76C7C0?style=flat-square)](#)
[![Electron](https://img.shields.io/badge/Built_with-Electron-a855f7?style=flat-square&logo=electron)](#)
[![JavaScript](https://img.shields.io/badge/Magic_Powered_by-JavaScript-f59e0b?style=flat-square&logo=javascript)](#)

</div>

## 🌙 About the Magic

Enchanted Focus transforms the traditional Pomodoro Technique into an enchanting productivity experience. Set in a mystical world of potions and spells, this cozy witch-themed timer helps you focus while collecting magical rewards for your dedication.

> _"In the realm where focus meets enchantment, every completed session brings you closer to mastering the ancient art of productivity magic."_ ✨

## 🧪 Features & Spells

### ⏰ **Mystical Timer System**

- 🎯 **Customizable Work Sessions** - Choose your own focus durations (1-120 minutes)
- ☕ **Magical Break Periods** - Restorative pauses (1-60 minutes)
- 🔄 **Automatic Cycle Management** - Seamlessly transitions between work and rest
- 🌈 **Visual Progress Ring** - Watch the enchanted circle fill as time passes
- 🎨 **Dynamic Color Themes** - Mint green for work, mystical orange for breaks

### 🎮 **Quick Start Presets**

- **🎯 Classic (25/5)** - Traditional Pomodoro magic
- **💪 Extended (50/10)** - For deep focus rituals
- **⚡ Quick (15/5)** - Swift productivity spells
- **🧠 Deep Focus (90/20)** - Extended concentration ceremonies

### 🧙‍♀️ **Potion Collection System**

Unlock mystical potions as you complete focus sessions:

| Sessions |       Potion       | Magical Properties            |
| :------: | :----------------: | :---------------------------- |
|    1     |  🧪 Health Potion  | _Restores focus energy_       |
|    2     |  ✨ Magic Potion   | _Enhances concentration_      |
|    3     |   🌙 Moon Elixir   | _Brings nocturnal wisdom_     |
|    5     |  🌟 Star Essence   | _Illuminates clarity_         |
|    10    |  🔥 Phoenix Flame  | _Reignites motivation_        |
|    25    | 🎩 Master's Elixir | _Grants productivity mastery_ |

### 📜 **Goal Management Grimoire**

- ✨ **Create Mystical Quests** - Set and track your productivity goals
- 🎨 **Magical Categories** - Organize goals by type of magic
- 📈 **Enchanted Statistics** - Track your success with mystical metrics
- 🏆 **Quest Completion** - Mark achievements and celebrate victories

### 🪟 **Multi-Window Enchantment**

- **🏠 Welcome Sanctuary** (400×600) - Your magical entry point
- **⏰ Focus Chamber** (600×700) - Where the timer magic happens
- **🎯 Goals Archive** (800×800) - Your quest management realm

## 🎨 Visual Enchantments

```
🌙 Deep Witchy Purple (#2b1a2f) - The mystical background
✨ Enchanted Mint (#76C7C0) - Magical accents and progress
🔮 Mystical Text (#f8e7ff) - Readable spell inscriptions
🌟 Sparkling Effects - Animated background magic
```

## 🛠️ Installation Ritual

### Prerequisites

- **Node.js** (v14 or higher) - _The foundation magic_
- **npm** - _Package spell manager_

### Summoning the Application

1. **Clone the mystical repository:**

   ```bash
   git clone https://github.com/lholley21/EnchantedFocus.git
   cd EnchantedFocus
   ```

2. **Install the required enchantments:**

   ```bash
   npm install
   ```

3. **Begin your magical journey:**
   ```bash
   npm start
   ```

## 🧙‍♀️ Usage Guide

### 🌟 Getting Started

1. **Launch Enchanted Focus** and enter the mystical realm
2. **Click "Start"** to open the Focus Chamber
3. **Choose your timing:** Use quick presets or customize your own
4. **Begin focusing** and watch your progress ring fill with magical energy
5. **Collect potions** as you complete sessions
6. **Set goals** in the Goals Archive to track your productivity quests

### ⚙️ Customization Spells

- **Click the Settings button** to access timer customization
- **Select Quick Presets** for instant configuration
- **Create custom durations** for personalized productivity rituals
- **Add your own potion GIFs** to the `assets/potions/` folder

### 🧪 Adding Custom Potion GIFs

1. Place your magical GIF files in `assets/potions/`
2. Edit `scripts/mainpage.js` (around line 22)
3. Update the potion array:
   ```javascript
   { gif: 'your-potion.gif', name: 'Your Magical Potion', requirement: 5 }
   ```

_Recommended: 48×48 pixel animated GIFs work best!_

## 🎭 Theme & Aesthetics

Enchanted Focus embraces a **purple witch ** aesthetic featuring:

- **🖋️ Mystery Quest Font** - Perfectly witchy typography
- **🌙 Dark magical backgrounds** with subtle sparkle animations
- **✨ Smooth hover effects** and mystical transitions
- **🔮 Glowing progress indicators** that pulse with magical energy
- **🧙‍♀️ Intuitive spell-casting interface** designed for focus

## 🛡️ Technical Enchantments

### Built With Love & Magic

- **Electron** - Cross-platform application framework
- **JavaScript ES6+** - Modern spell-crafting language
- **CSS3 with Custom Properties** - Styling sorcery
- **LocalStorage** - Persistent magic memory
- **Mystery Quest Font** - Typography enchantments

### Architecture Spells

```
📁  EnchantedFocus/
├── 🏠 pages/          # HTML sanctuaries
├── 🎨 styles/         # CSS spell books
├── ⚡ scripts/        # JavaScript magic
├── 🧪 assets/         # Mystical resources
├── 📜 main.js         # Core application spell
└── 🔮 preload.js      # Security enchantments
```

## 🌟 Roadmap of Future Magic

- [ ] 🎵 **Ambient Mystical Sounds** - Background music for focus
- [ ] 🌙 **Dark/Light Mode Toggle** - Day and night themes
- [ ] 📊 **Advanced Statistics** - Detailed productivity analytics
- [ ] 🎯 **Achievement System** - Unlock special rewards
- [ ] 🔄 **Cloud Sync** - Share progress across devices
- [ ] 🎨 **Custom Themes** - Personalize your magical experience

## 🤝 Contributing to the Coven

We welcome fellow witches and wizards to contribute! Whether you're fixing bugs, adding features, or improving the magical experience:

1. 🔱 Fork the repository
2. 🌙 Create your feature branch (`git checkout -b feature/amazing-spell`)
3. ✨ Commit your magic (`git commit -m 'Add amazing new spell'`)
4. 🚀 Push to the branch (`git push origin feature/amazing-spell`)
5. 🎭 Open a Pull Request

## 📜 License Scroll

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for the complete spell text.

## 🙏 Acknowledgments & Gratitude

- **Mystery Quest Font** creators for the perfect witchy typography
- **Electron community** for the powerful framework magic
- **All productivity wizards** who believe in the power of focused work
- **The original Pomodoro Technique** by Francesco Cirillo

---

<div align="center">

### 🌙 _"May your focus be strong and your breaks be restful"_ ✨

**Made with 🧙‍♀️ magic and ☕ countless cups of coffee**

[![GitHub Stars](https://img.shields.io/github/stars/lholley21/EnchantedFocus?style=social)](https://github.com/lholley21/EnchantedFocus)
[![GitHub Forks](https://img.shields.io/github/forks/lholley21/EnchantedFocus?style=social)](https://github.com/lholley21/EnchantedFocus)

_Transform your productivity into a magical journey - one Pomodoro at a time_ 🍅✨

</div>
