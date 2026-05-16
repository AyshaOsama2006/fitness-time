import React, { useState } from 'react';
import axios from 'axios';
import './Nutrition.css';

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState('meal');
  
  // State for each tool
  const [mealData, setMealData] = useState({ goal: '', favorites: '', dislikes: '', ingredients: '' });
  const [calorieData, setCalorieData] = useState({ description: '', image: null });
  const [personalData, setPersonalData] = useState({ age: 25, gender: 'male', weight: 70, height: 175, activity: 'moderate', goal: 'maintain' });
  
  // Results State
  const [mealResult, setMealResult] = useState(null);
  const [calorieResult, setCalorieResult] = useState(null);
  const [personalResult, setPersonalResult] = useState(null);

  // --- Handlers ---

  // 1. Meal Planner
  const handleGenerateMeals = async () => {
    if (!mealData.goal) return alert("Please select a goal");
    try {
      const res = await axios.post('https://fitness-time-backend-production.up.railway.app/api/nutrition/meal-plan', { goal: mealData.goal });
      setMealResult(res.data);
    } catch (e) { console.error(e); }
  };

  // 2. Calorie Calculator
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCalorieData({ ...calorieData, image: URL.createObjectURL(file) });
    }
  };
  
  const handleAnalyzeCalories = async () => {
    if (!calorieData.description && !calorieData.image) return alert("Enter text or upload image");
    try {
      const res = await axios.post('https://fitness-time-backend-production.up.railway.app/api/nutrition/calculate', personalData); // Mocking with similar logic
      // Mocking specific calorie analysis result
      setCalorieResult({ 
        calories: Math.floor(Math.random() * 500) + 400, 
        protein: Math.floor(Math.random() * 30) + 20, 
        carbs: Math.floor(Math.random() * 50) + 30, 
        fat: Math.floor(Math.random() * 20) + 10 
      });
    } catch (e) { console.error(e); }
  };

  // 3. Personal Calculator
  const handlePersonalCalc = async () => {
    try {
      const res = await axios.post('https://fitness-time-backend-production.up.railway.app/api/nutrition/calculate', personalData);
      setPersonalResult(res.data);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="nutrition-page container pt-5 mt-5">
      <div className="text-center mb-5">
        <h1 className="page-title">AI SMART NUTRITION ASSISTANT</h1>
        <p className="text-secondary">Harness the power of AI to optimize your nutrition</p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation mb-4">
        <button className={activeTab === 'meal' ? 'active' : ''} onClick={() => setActiveTab('meal')}>Goal-Based Meal Planner</button>
        <button className={activeTab === 'calorie' ? 'active' : ''} onClick={() => setActiveTab('calorie')}>AI Calorie Calculator</button>
        <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>Personal Nutrition Calculator</button>
      </div>

      {/* Content Area */}
      <div className="row g-4">
        
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="col-lg-6">
          <div className="input-card">
            
            {/* TAB 1: MEAL PLANNER */}
            {activeTab === 'meal' && (
              <div className="fade-in">
                <h3 className="card-title mb-4">Configure Your Meal Plan</h3>
                
                <div className="mb-4">
                  <label className="form-label text-secondary">Select Your Goal</label>
                  <div className="goal-grid">
                    <div className={`goal-box ${mealData.goal === 'muscle-gain' ? 'selected' : ''}`} onClick={() => setMealData({...mealData, goal: 'muscle-gain'})}>
                      <span className="icon">💪</span>
                      <span>Muscle Gain</span>
                    </div>
                    <div className={`goal-box ${mealData.goal === 'weight-loss' ? 'selected' : ''}`} onClick={() => setMealData({...mealData, goal: 'weight-loss'})}>
                      <span className="icon">🏃</span>
                      <span>Weight Loss</span>
                    </div>
                    <div className={`goal-box ${mealData.goal === 'weight-gain' ? 'selected' : ''}`} onClick={() => setMealData({...mealData, goal: 'weight-gain'})}>
                      <span className="icon">📈</span>
                      <span>Weight Gain</span>
                    </div>
                    <div className={`goal-box ${mealData.goal === 'maintenance' ? 'selected' : ''}`} onClick={() => setMealData({...mealData, goal: 'maintenance'})}>
                      <span className="icon">⚖️</span>
                      <span>Maintenance</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">Favorite Foods</label>
                  <textarea className="form-control" rows="2" placeholder="e.g., Chicken, Rice, Eggs..." 
                    onChange={(e) => setMealData({...mealData, favorites: e.target.value})}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary">Foods to Avoid</label>
                  <textarea className="form-control" rows="2" placeholder="e.g., Dairy, Nuts..." 
                    onChange={(e) => setMealData({...mealData, dislikes: e.target.value})}></textarea>
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary">Available Ingredients</label>
                  <textarea className="form-control" rows="2" placeholder="e.g., Oats, Spinach..." 
                    onChange={(e) => setMealData({...mealData, ingredients: e.target.value})}></textarea>
                </div>

                <button className="btn btn-danger w-100" onClick={handleGenerateMeals}>Generate Meal Plan</button>
              </div>
            )}

            {/* TAB 2: CALORIE CALCULATOR */}
            {activeTab === 'calorie' && (
              <div className="fade-in">
                <h3 className="card-title mb-4">Estimate Food Calories</h3>
                
                <div className="mb-3">
                  <label className="form-label text-secondary">Describe Your Meal</label>
                  <textarea className="form-control" rows="4" placeholder="e.g., Grilled chicken breast with brown rice..." 
                    onChange={(e) => setCalorieData({...calorieData, description: e.target.value})}></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary">Or Upload a Photo</label>
                  <div className="upload-zone">
                    <input type="file" id="fileUpload" hidden onChange={handleImageUpload} accept="image/*" />
                    <label htmlFor="fileUpload" className="upload-label">
                      <div className="upload-icon">📷</div>
                      <span>Click to upload or drag image</span>
                      <span className="text-muted small">PNG, JPG up to 10MB</span>
                    </label>
                  </div>
                  {calorieData.image && (
                    <div className="mt-3">
                      <img src={calorieData.image} alt="Preview" className="img-preview" />
                    </div>
                  )}
                </div>

                <button className="btn btn-danger w-100" onClick={handleAnalyzeCalories}>Analyze Meal</button>
              </div>
            )}

            {/* TAB 3: PERSONAL CALCULATOR */}
            {activeTab === 'personal' && (
              <div className="fade-in">
                <h3 className="card-title mb-4">Calculate Daily Needs</h3>
                
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label text-secondary">Age</label>
                    <input type="number" className="form-control" value={personalData.age} 
                      onChange={(e) => setPersonalData({...personalData, age: e.target.value})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary">Gender</label>
                    <select className="form-select" value={personalData.gender}
                      onChange={(e) => setPersonalData({...personalData, gender: e.target.value})}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary">Weight (kg)</label>
                    <input type="number" className="form-control" value={personalData.weight}
                      onChange={(e) => setPersonalData({...personalData, weight: e.target.value})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary">Height (cm)</label>
                    <input type="number" className="form-control" value={personalData.height}
                      onChange={(e) => setPersonalData({...personalData, height: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary">Activity Level</label>
                    <select className="form-select" value={personalData.activity}
                      onChange={(e) => setPersonalData({...personalData, activity: e.target.value})}>
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light (1-3 days/week)</option>
                      <option value="moderate">Moderate (3-5 days/week)</option>
                      <option value="active">Active (6-7 days/week)</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary">Fitness Goal</label>
                    <select className="form-select" value={personalData.goal}
                      onChange={(e) => setPersonalData({...personalData, goal: e.target.value})}>
                      <option value="lose">Lose Weight</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="gain">Gain Muscle</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-danger w-100 mt-4" onClick={handlePersonalCalc}>Calculate Needs</button>
              </div>
            )}

          </div>
        </div>

        {/* --- RIGHT COLUMN: RESULTS --- */}
        <div className="col-lg-6">
          
          {/* Meal Results */}
          {activeTab === 'meal' && (
            <div className="result-card p-4 fade-in">
              <h3 className="card-title mb-4">Your Personalized Plan</h3>
              {!mealResult ? (
                <div className="placeholder-state">
                  <span className="icon-lg">🍽️</span>
                  <p>Select your goal and preferences to generate meals</p>
                </div>
              ) : (
                <div className="meals-list">
                  {mealResult.map((meal, i) => (
                    <div key={i} className="meal-item">
                      <div className="d-flex justify-content-between">
                        <h4 className="meal-name">{meal.name}</h4>
                        <span className="meal-cal text-danger">{meal.calories} kcal</span>
                      </div>
                      <p className="meal-ing text-secondary small">{meal.ingredients}</p>
                      <div className="meal-macros">
                        <div className="macro-tag protein">P: {meal.protein}g</div>
                        <div className="macro-tag carbs">C: {meal.carbs || '45'}g</div>
                        <div className="macro-tag fat">F: {meal.fat || '15'}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Calorie Results */}
          {activeTab === 'calorie' && (
            <div className="result-card p-4 fade-in">
              <h3 className="card-title mb-4">Nutritional Analysis</h3>
              {!calorieResult ? (
                <div className="placeholder-state">
                  <span className="icon-lg">📊</span>
                  <p>Describe or upload a photo to analyze</p>
                </div>
              ) : (
                <div className="calorie-result text-center">
                  <div className="calorie-big-circle">
                    <span className="number">{calorieResult.calories}</span>
                    <span className="label">kcal</span>
                  </div>
                  <div className="row mt-4 g-3">
                    <div className="col-4"><div className="stat-box blue"><strong>{calorieResult.protein}g</strong><span>Protein</span></div></div>
                    <div className="col-4"><div className="stat-box yellow"><strong>{calorieResult.carbs}g</strong><span>Carbs</span></div></div>
                    <div className="col-4"><div className="stat-box green"><strong>{calorieResult.fat}g</strong><span>Fat</span></div></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Personal Calc Results */}
          {activeTab === 'personal' && (
            <div className="result-card p-4 fade-in">
              <h3 className="card-title mb-4">Your Daily Needs</h3>
              {!personalResult ? (
                <div className="placeholder-state">
                  <span className="icon-lg">🧮</span>
                  <p>Enter your details to calculate requirements</p>
                </div>
              ) : (
                <div className="personal-result">
                  <div className="highlight-box text-center mb-4">
                    <div className="display-4 fw-bold text-danger">{personalResult.calories}</div>
                    <div className="text-secondary">Daily Calories Required</div>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-dark rounded">
                        <span>Protein</span>
                        <strong className="text-primary">{personalResult.protein}g</strong>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-dark rounded">
                        <span>Carbohydrates</span>
                        <strong className="text-warning">{personalResult.carbs}g</strong>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-dark rounded">
                        <span>Fat</span>
                        <strong className="text-success">{personalResult.fat}g</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


