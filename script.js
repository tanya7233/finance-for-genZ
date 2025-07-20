// Spending Overview Chart
const ctx = document.getElementById('spendingChart').getContext('2d');
const spendingChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Food 🍔', 'Transport 🚗', 'Entertainment 🎮', 'Shopping 🛍️', 'Savings 💰'],
    datasets: [{
      data: [1500, 800, 1000, 1200, 2500],
      backgroundColor: ['#f87171', '#60a5fa', '#a78bfa', '#fcd34d', '#34d399'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

// Mood Tracker
const moods = document.querySelectorAll(".mood-options span");
const moodText = document.getElementById("moodText");
moods.forEach(mood => {
  mood.addEventListener("click", () => {
    moods.forEach(m => m.classList.remove("selected"));
    mood.classList.add("selected");
    moodText.textContent = `Today’s mood: ${mood.textContent}`;
  });
});

// Savings Tip of the Day
const tips = [
  "Set up automatic transfers to your savings account.",
  "Use the 50/30/20 rule: Needs/Wants/Savings.",
  "Unsubscribe from unused services and subscriptions.",
  "Cook at home more to save on eating out.",
  "Track every rupee you spend for a week.",
  "Round up purchases and save the spare change.",
  "Plan your purchases during sales and discounts."
];
const randomTip = tips[Math.floor(Math.random() * tips.length)];
document.getElementById("savingsTip").textContent = "💡 " + randomTip;
// 🔢 Budget Planner (50/30/20 Rule)
function calculateBudget() {
  const income = parseFloat(document.getElementById("incomeInput").value);
  const output = document.getElementById("budgetResult");
  if (isNaN(income) || income <= 0) return output.innerHTML = "<li>Please enter a valid income</li>";

  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;
  output.innerHTML = `
    <li>🧾 Needs (50%): ₹${needs}</li>
    <li>🎉 Wants (30%): ₹${wants}</li>
    <li>💰 Savings (20%): ₹${savings}</li>
  `;
}


let totalGoal = 0;
let savedTotal = 0;

function updateGoal() {
  const goal = parseFloat(document.getElementById("goalAmount").value);
  const saved = parseFloat(document.getElementById("savedAmount").value);
  const badge = document.getElementById("rewardBadge");

  if (!goal || !saved || goal <= 0 || saved <= 0) return;

  totalGoal = goal;
  savedTotal += saved;
  const progress = Math.min((savedTotal / totalGoal) * 100, 100).toFixed(1);

  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressFill").textContent = progress + "%";

  if (progress >= 100) {
    badge.innerHTML = "🏆 Goal Achieved! You unlocked the FinSaver Badge!";
  } else if (progress >= 50) {
    badge.innerHTML = "🔥 Halfway there! Keep saving!";
  } else if (progress >= 25) {
    badge.innerHTML = "💪 Great start! You're on your way!";
  } else {
    badge.innerHTML = "";
  }
}

let challengeProgress = Array(7).fill(false);

function renderChallenge() {
  const container = document.getElementById("challengeDays");
  container.innerHTML = "";
  challengeProgress.forEach((done, i) => {
    const btn = document.createElement("button");
    btn.textContent = done ? `✅ Day ${i + 1}` : `Day ${i + 1}`;
    btn.disabled = done;
    btn.onclick = () => markDay(i);
    container.appendChild(btn);
  });
}

function markDay(dayIndex) {
  challengeProgress[dayIndex] = true;
  renderChallenge();
  const completed = challengeProgress.filter(Boolean).length;
  const status = document.getElementById("challengeStatus");

  if (completed === 7) {
    status.textContent = "🎉 Challenge Complete! You've earned a 🌟 Saver Star!";
  } else {
    status.textContent = `You’ve completed ${completed}/7 days`;
  }
}
renderChallenge();

function showAdvice(mood) {
  const adviceMap = {
    stressed: "😰 Feeling anxious? Start with tracking just one category of spending — small steps make a big difference.",
    confident: "😎 Nice! Try setting a stretch savings goal this month or explore a new investment option.",
    curious: "🧐 Great mindset! Read up on budgeting techniques or try our investment quiz below!",
  };
  document.getElementById("moodAdvice").textContent = adviceMap[mood];
}

// 🛠 Dynamic Chart Update
function addCategory() {
  const name = document.getElementById("categoryName").value;
  const amount = parseFloat(document.getElementById("categoryAmount").value);
  if (!name || isNaN(amount) || amount <= 0) return;

  spendingChart.data.labels.push(name);
  spendingChart.data.datasets[0].data.push(amount);
  spendingChart.update();

  document.getElementById("categoryName").value = "";
  document.getElementById("categoryAmount").value = "";
}

// 🌒 Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}
function updateAvatar() {
  const avatar = document.getElementById("avatarStyle").value;
  document.getElementById("avatarDisplay").textContent = avatar;
}
let streak = localStorage.getItem("streak") || 0;
document.getElementById("streakDays").textContent = streak;

function increaseStreak() {
  streak++;
  localStorage.setItem("streak", streak);
  document.getElementById("streakDays").textContent = streak;
}






