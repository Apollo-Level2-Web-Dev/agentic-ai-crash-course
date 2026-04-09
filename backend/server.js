// you should must run `npm install cors dotenv express`
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { analyzeGoal, evaluateProgress } = require('./ai-agents');
const storage = require('./storage');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// api endpoints
app.post(
    "/api/goals",
    async (req, res) => {
        try {
            const { goalText, durationDays } = req.body;

            if (!goalText || !durationDays) {
                return res.status(400).json({ error: "Goal and duration are required!" });
            }

            const plan = await analyzeGoal(goalText, durationDays);

            const goal = storage.saveGoal({
                title: goalText,
                durationDays,
                plan,
                status: 'active'
            });

            // save tasks 
            const tasks = storage.saveTasks(goal.id, plan.dailyTasks)

            // initaial progress tracking
            storage.saveProgress(goal.id, {
                goalId: goal.id,
                completedTasks: 0,
                totalTasks: tasks.length,
                progressParcentage: 0
            })

            res.json(plan)

        } catch (err) {
            console.error(err)
        }
    }
)

app.post(
    "/api/goals/:goalId/evaluate",
    async (req, res) => {
        try {
            // goal, progress, tasks, days
            const goal = storage.getGoal(req.params.goalId);
            if (!goal) {
                return res.status(404).json({ error: "Goal not found!" });
            }

            const tasks = storage.getTasksByGoal(goal.id);
            const completedCount = tasks.filter(t => t.completed).length;
            const createdDays = Math.ceil((Date.now() - new Date(goal.createdAt)) / (1000 * 60 * 60 * 24));

            const evaluation = await evaluateProgress(goal, completedCount, tasks.length, createdDays);

            res.json(evaluation)

        } catch (err) {
            console.error(err);
        }
    }
)

// ============ SERVER START ============

app.listen(PORT, () => {
    console.log(`🚀 AI Task Agent running on http://localhost:${PORT}`);
});