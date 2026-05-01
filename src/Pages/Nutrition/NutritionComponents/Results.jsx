import React from 'react';

const Results = ({ 
  activeTab, 
  mealResult, 
  calorieResult, 
  personalResult 
}) => {

  if (activeTab === 'meal') {
    return (
      <div className="result-card p-4 fade-in">
        <h3>📋 YOUR NUTRITION PLAN</h3>
        {mealResult?.length > 0 ? (
          mealResult.map((meal, i) => (
            <div key={i} className="meal-item mb-3 p-3 border rounded">
              <div className="d-flex justify-content-between">
                <h5>{meal.name}</h5>
                <span className="badge bg-danger">{meal.calories} سعرة</span>
              </div>
              <p className="small">{meal.ingredients}</p>
              <div>
                <span className="badge bg-primary me-1">PROTEIN: {meal.protein}g</span>
                <span className="badge bg-warning">CARBS: {meal.carbs}g</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <div className="icon-lg mb-3">🍽️</div>
            <p>CHOOSE YOUR GOAL TO GENERATE MEALS </p>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'calorie') {
    return (
      <div className="result-card p-4 text-center fade-in">
        <h3>📊 CALORIE ANALIZE </h3>
        {calorieResult ? (
          <>
            <div className="calorie-circle mb-4">
              <div className="number">{calorieResult.calories}</div>
              <div> KCAL</div>
            </div>
            <div className="row g-2">
              <div className="col-4"><div className="stat blue">P: {calorieResult.protein}g</div></div>
              <div className="col-4"><div className="stat yellow">K: {calorieResult.carbs}g</div></div>
              <div className="col-4"><div className="stat green">D: {calorieResult.fat}g</div></div>
            </div>
          </>
        ) : (
          <div className="placeholder">
            <div className="icon-lg">📷</div>
            <p> DESCRIBE YOUR MEAL OR UPLOAD A  PHOTO </p>
          </div>
        )}
      </div>
    );
  }

  // Personal Results
  return (
    <div className="result-card p-4 fade-in">
      <h3>📈 DAILY NEEDS</h3>
      {personalResult ? (
        <>
          <div className="text-center mb-4">
            <div className="display-4 text-danger">{personalResult.calories}</div>
            <div className="text-muted"> KCAL DAILY</div>
          </div>
          <div className="macros-list">
            <div className="macro-item">
              <span>PROTEIN</span>
              <strong>{personalResult.protein}g</strong>
            </div>
            <div className="macro-item">
              <span>CARBS</span>
              <strong>{personalResult.carbs || personalResult.carbohydrates}g</strong>
            </div>
            <div className="macro-item">
              <span>FATS</span>
              <strong>{personalResult.fat}g</strong>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <div className="icon-lg mb-3">🧮</div>
          <p>Enter your data for calculation</p>
        </div>
      )}
    </div>
  );
};

export default Results;