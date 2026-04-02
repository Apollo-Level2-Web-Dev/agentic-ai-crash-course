const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const FILES = {
    goals: path.join(DATA_DIR, 'goals.json'),
    tasks: path.join(DATA_DIR, 'tasks.json'),
    progress: path.join(DATA_DIR, 'progress.json'),
};

// Initialize files if they don't exist
Object.values(FILES).forEach(file => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([], null, 2));
    }
});

const storage = {
    // Goals operations
    saveGoal: (goal) => {
        const goals = storage.getAllGoals();
        goal.id = goal.id || Date.now().toString();
        goal.createdAt = goal.createdAt || new Date().toISOString();
        goal.status = goal.status || 'active';
        const index = goals.findIndex(g => g.id === goal.id);
        if (index >= 0) {
            goals[index] = goal;
        } else {
            goals.push(goal);
        }
        fs.writeFileSync(FILES.goals, JSON.stringify(goals, null, 2));
        return goal;
    },

    getAllGoals: () => {
        try {
            return JSON.parse(fs.readFileSync(FILES.goals, 'utf8'));
        } catch {
            return [];
        }
    },

    getGoal: (goalId) => {
        const goals = storage.getAllGoals();
        return goals.find(g => g.id === goalId);
    },

    deleteGoal: (goalId) => {
        let goals = storage.getAllGoals();
        goals = goals.filter(g => g.id !== goalId);
        fs.writeFileSync(FILES.goals, JSON.stringify(goals, null, 2));
    },

    // Tasks operations
    saveTasks: (goalId, tasks) => {
        const allTasks = storage.getAllTasks();
        const filtered = allTasks.filter(t => t.goalId !== goalId);
        const withIds = tasks.map((task, idx) => ({
            id: task.id || `${goalId}-${idx}-${Date.now()}`,
            goalId,
            day: task.day,
            title: task.title,
            description: task.description,
            completed: task.completed || false,
            createdAt: task.createdAt || new Date().toISOString(),
        }));
        fs.writeFileSync(FILES.tasks, JSON.stringify([...filtered, ...withIds], null, 2));
        return withIds;
    },

    getAllTasks: () => {
        try {
            return JSON.parse(fs.readFileSync(FILES.tasks, 'utf8'));
        } catch {
            return [];
        }
    },

    getTasksByGoal: (goalId) => {
        const tasks = storage.getAllTasks();
        return tasks.filter(t => t.goalId === goalId);
    },

    updateTask: (taskId, updates) => {
        const tasks = storage.getAllTasks();
        const index = tasks.findIndex(t => t.id === taskId);
        if (index >= 0) {
            tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
            fs.writeFileSync(FILES.tasks, JSON.stringify(tasks, null, 2));
            return tasks[index];
        }
        return null;
    },

    // Progress operations
    saveProgress: (goalId, progress) => {
        const allProgress = storage.getAllProgress();
        progress.id = progress.id || `${goalId}-${Date.now()}`;
        progress.goalId = goalId;
        progress.timestamp = progress.timestamp || new Date().toISOString();
        const index = allProgress.findIndex(p => p.id === progress.id);
        if (index >= 0) {
            allProgress[index] = progress;
        } else {
            allProgress.push(progress);
        }
        fs.writeFileSync(FILES.progress, JSON.stringify(allProgress, null, 2));
        return progress;
    },

    getAllProgress: () => {
        try {
            return JSON.parse(fs.readFileSync(FILES.progress, 'utf8'));
        } catch {
            return [];
        }
    },

    getProgressByGoal: (goalId) => {
        const progress = storage.getAllProgress();
        return progress.filter(p => p.goalId === goalId);
    },
};

module.exports = storage;