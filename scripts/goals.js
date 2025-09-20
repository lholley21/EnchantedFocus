// Goals management class
class GoalsManager {
  constructor() {
    this.goals = JSON.parse(localStorage.getItem('goals') || '[]');
    this.initializeElements();
    this.bindEvents();
    this.renderGoals();
    this.updateStats();
  }

  initializeElements() {
    this.goalInput = document.getElementById('goal-input');
    this.goalCategory = document.getElementById('goal-category');
    this.addGoalBtn = document.getElementById('add-goal-btn');
    this.activeGoalsList = document.getElementById('active-goals-list');
    this.completedGoalsList = document.getElementById('completed-goals-list');
    this.totalGoalsCount = document.getElementById('total-goals');
    this.completedCount = document.getElementById('completed-count');
    this.successRate = document.getElementById('success-rate');
  }

  bindEvents() {
    this.addGoalBtn.addEventListener('click', () => this.addGoal());
    this.goalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addGoal();
      }
    });
  }

  addGoal() {
    const text = this.goalInput.value.trim();
    const category = this.goalCategory.value;

    if (!text) {
      this.showNotification('⚠️ Please enter a goal!', 'warning');
      return;
    }

    const goal = {
      id: Date.now().toString(),
      text: text,
      category: category,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.goals.push(goal);
    this.saveGoals();
    this.goalInput.value = '';
    this.renderGoals();
    this.updateStats();
    this.showNotification('✨ Goal added to your mystical quest!', 'success');
  }

  completeGoal(goalId) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal && !goal.completed) {
      goal.completed = true;
      goal.completedAt = new Date().toISOString();
      
      const goalElement = document.querySelector(`[data-goal-id="${goalId}"]`);
      if (goalElement) {
        goalElement.classList.add('completing');
      }
      
      setTimeout(() => {
        this.saveGoals();
        this.renderGoals();
        this.updateStats();
        this.showNotification('🎉 Quest completed! Your magic grows stronger!', 'success');
      }, 600);
    }
  }

  deleteGoal(goalId) {
    if (confirm('Are you sure you want to delete this quest from your grimoire?')) {
      this.goals = this.goals.filter(g => g.id !== goalId);
      this.saveGoals();
      this.renderGoals();
      this.updateStats();
      this.showNotification('🗑️ Quest removed from your grimoire.', 'info');
    }
  }

  uncompleteGoal(goalId) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal && goal.completed) {
      goal.completed = false;
      goal.completedAt = null;
      this.saveGoals();
      this.renderGoals();
      this.updateStats();
      this.showNotification('🔄 Quest moved back to active quests.', 'info');
    }
  }

  saveGoals() {
    localStorage.setItem('goals', JSON.stringify(this.goals));
  }

  renderGoals() {
    const activeGoals = this.goals.filter(g => !g.completed);
    const completedGoals = this.goals.filter(g => g.completed);

    this.renderGoalsList(activeGoals, this.activeGoalsList, false);
    this.renderGoalsList(completedGoals, this.completedGoalsList, true);
  }

  renderGoalsList(goals, container, isCompleted) {
    if (goals.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="emoji">${isCompleted ? '🎯' : '✨'}</span>
          <div>${isCompleted ? 'No completed quests yet' : 'No active quests - time to create some magic!'}</div>
        </div>
      `;
      return;
    }

    container.innerHTML = goals.map(goal => `
      <div class="goal-item ${goal.completed ? 'completed' : ''}" data-goal-id="${goal.id}">
        <div class="goal-content">
          <div class="goal-info">
            <div class="goal-text">${this.escapeHtml(goal.text)}</div>
            <div class="goal-category">${this.getCategoryEmoji(goal.category)} ${this.getCategoryName(goal.category)}</div>
          </div>
          <div class="goal-actions">
            ${!goal.completed 
              ? `<button class="goal-btn complete" onclick="goalsManager.completeGoal('${goal.id}')">✅ Complete</button>`
              : `<button class="goal-btn" onclick="goalsManager.uncompleteGoal('${goal.id}')">🔄 Reactivate</button>`
            }
            <button class="goal-btn delete" onclick="goalsManager.deleteGoal('${goal.id}')">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  getCategoryEmoji(category) {
    const emojis = {
      productivity: '🧙‍♀️',
      learning: '📚',
      health: '🌿',
      creative: '🎨',
      personal: '⭐'
    };
    return emojis[category] || '✨';
  }

  getCategoryName(category) {
    const names = {
      productivity: 'Productivity Magic',
      learning: 'Learning Spells',
      health: 'Wellness Potions',
      creative: 'Creative Enchantments',
      personal: 'Personal Growth'
    };
    return names[category] || 'Mystical Quest';
  }

  updateStats() {
    const total = this.goals.length;
    const completed = this.goals.filter(g => g.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    this.totalGoalsCount.textContent = total;
    this.completedCount.textContent = completed;
    this.successRate.textContent = `${rate}%`;
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(145deg, #76C7C0, #5ABAB4);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 16px;
      font-family: 'Mystery Quest', system-ui;
      z-index: 1000;
      box-shadow: 0 5px 20px rgba(118, 199, 192, 0.3);
      animation: slideInRight 0.5s ease-out;
      border: 2px solid #a855f7;
      max-width: 300px;
    `;

    if (type === 'warning') {
      notification.style.background = 'linear-gradient(145deg, #f59e0b, #d97706)';
      notification.style.borderColor = '#ef4444';
    } else if (type === 'success') {
      notification.style.background = 'linear-gradient(145deg, #a855f7, #8b5cf6)';
      notification.style.borderColor = '#76C7C0';
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { 
          opacity: 0;
          transform: translateX(100%);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Window controls
document.getElementById('min-btn').addEventListener('click', () => {
  window.electronAPI.windowControl('minimize');
});

document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.windowControl('close');
});

// Navigation
const timerBtn = document.getElementById('timer-btn');
if (timerBtn) {
  timerBtn.addEventListener('click', () => {
    window.electronAPI.openPageAndClose('mainpage');
  });
}

const backBtn = document.getElementById('back-btn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.electronAPI.openPageAndClose('index');
  });
}

// Listen for page errors
if (window.electronAPI.onPageError) {
  window.electronAPI.onPageError((event, error) => {
    console.error('Page navigation error:', error);
    alert(`Navigation error: ${error}`);
  });
}

// Initialize goals manager
let goalsManager;

document.addEventListener('DOMContentLoaded', () => {
  goalsManager = new GoalsManager();
});

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  // Do nothing, DOMContentLoaded will fire
} else {
  // DOM is already ready
  goalsManager = new GoalsManager();
}