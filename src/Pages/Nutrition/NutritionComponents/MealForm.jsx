import React from 'react';
import { GOALS } from "../Constants";


const MealForm = ({ 
  mealData, 
  setMealData, 
  onGenerate, 
  loading 
}) => {
  
  const selectGoal = (goal) => {
    setMealData({ ...mealData, goal });
  };

  const goalIcons = {
    'muscle-gain': '💪',
    'weight-loss': '🏃', 
    'weight-gain': '📈',
    'maintenance': '⚖️'
  };

  return (
    <div className="fade-in">
      <h3 className="card-title mb-4">📋 Meal Planner</h3>
      
      {/* اختيار الهدف */}
      <div className="mb-4">
        <label className="form-label"> CHOOSE YOUR GOAL</label>
        <div className="goal-grid">
          {Object.entries(GOALS).map(([name, value]) => (
            <div 
              key={value}
              className={`goal-box ${mealData.goal === value ? 'selected' : ''}`}
              onClick={() => selectGoal(value)}
            >
              <span className="icon">{goalIcons[value]}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* النصوص */}
      <div className="mb-3">
        <label>FAVOURITS FOOD</label>
        <textarea 
          className="form-control" 
          rows="2" 
          placeholder="rice, fish, eggs..."
          value={mealData.favorites}
          onChange={(e) => setMealData({...mealData, favorites: e.target.value})}
        />
      </div>

      <div className="mb-3">
        <label>FOODS TO AVOID</label>
        <textarea 
          className="form-control" 
          rows="2" 
          placeholder=" MILK, NUTS..."
          value={mealData.dislikes}
          onChange={(e) => setMealData({...mealData, dislikes: e.target.value})}
        />
      </div>

      <button 
        className="btn btn-danger w-100" 
        onClick={onGenerate}
        disabled={loading || !mealData.goal}
      >
        {loading ? 'ON PROGRESS' : 'GENERATE MEALS PLAN'}
      </button>
    </div>
  );
};

export default MealForm;