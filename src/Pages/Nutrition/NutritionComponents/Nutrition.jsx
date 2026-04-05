import React, { useState, useCallback } from 'react';
import { useApi } from "../useApi.jsx";
import MealForm from './MealForm.jsx';
import CalorieForm from './CalorieForm.jsx';
import PersonalForm from './PersonalForm.jsx';
import Results from './Results.jsx';
import "../Nutrition.css";

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState('meal');
  const [loading, setLoading] = useState(false);
  
  // البيانات
  const [mealData, setMealData] = useState({ goal: '', favorites: '', dislikes: '', ingredients: '' });
  const [calorieData, setCalorieData] = useState({ description: '', image: null });
  const [personalData, setPersonalData] = useState({ 
    age: 25, gender: 'male', weight: 70, height: 175, activity: 'moderate', goal: 'maintain' 
  });
  
  // النتائج
  const [mealResult, setMealResult] = useState(null);
  const [calorieResult, setCalorieResult] = useState(null);
  const [personalResult, setPersonalResult] = useState(null);

  const { getMeals, getCalc } = useApi();

  // 1. توليد الوجبات
  const handleMeals = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getMeals({ goal: mealData.goal });
      setMealResult(result);
    } catch (e) {
      console.error('error:', e);
    }
    setLoading(false);
  }, [mealData.goal, getMeals]);

  // 2. تحليل السعرات (Mock مؤقت)
  const handleCalories = useCallback(() => {
    setLoading(true);
    // Mock data
    setCalorieResult({ 
      calories: 450 + Math.floor(Math.random() * 200),
      protein: 25 + Math.floor(Math.random() * 15),
      carbs: 50 + Math.floor(Math.random() * 20),
      fat: 15 + Math.floor(Math.random() * 10)
    });
    setLoading(false);
  }, []);

  // 3. الحساب الشخصي
  const handlePersonal = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getCalc(personalData);
      setPersonalResult(result);
    } catch (e) {
      console.error('error:', e);
    }
    setLoading(false);
  }, [personalData, getCalc]);

  const renderForm = () => {
    if (activeTab === 'meal') return (
      <MealForm 
        mealData={mealData} 
        setMealData={setMealData}
        onGenerate={handleMeals}
        loading={loading}
      />
    );
    
    if (activeTab === 'calorie') return (
      <CalorieForm 
        calorieData={calorieData}
        setCalorieData={setCalorieData}
        onAnalyze={handleCalories}
        loading={loading}
      />
    );
    
    return (
      <PersonalForm 
        personalData={personalData}
        setPersonalData={setPersonalData}
        onCalculate={handlePersonal}
        loading={loading}
      />
    );
  };

  return (
    <div className="nutrition-page container pt-5 mt-5">
      <div className="text-center mb-5">
        <h1>🍎 SMART NUTRITION ASSISTANT </h1>
        <p>Boost your nutrition with AI</p>
      </div>

      {/* التبويبات */}
      <div className="tab-navigation mb-4">
        <button 
          className={activeTab === 'meal' ? 'active' : ''} 
          onClick={() => setActiveTab('meal')}
        >
          MEALS PLAN
        </button>
        <button 
          className={activeTab === 'calorie' ? 'active' : ''} 
          onClick={() => setActiveTab('calorie')}
        >
           CALORIE CACULATOR
        </button>
        <button 
          className={activeTab === 'personal' ? 'active' : ''} 
          onClick={() => setActiveTab('personal')}
        >
          PERSONAL CALCULATOR
        </button>
      </div>

      {/* الصفوف */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="input-card">
            {renderForm()}
          </div>
        </div>
        
        <div className="col-lg-6">
          <Results 
            activeTab={activeTab}
            mealResult={mealResult}
            calorieResult={calorieResult}
            personalResult={personalResult}
          />
        </div>
      </div>
    </div>
  );
}


