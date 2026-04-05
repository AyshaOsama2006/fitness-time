import React from 'react';
 import { GENDERS, ACTIVITIES, GOAL_TYPES } from "../Constants";
;

const PersonalForm = ({ 
  personalData, 
  setPersonalData, 
  onCalculate, 
  loading 
}) => {
  return (
    <div className="fade-in">
      <h3 className="card-title mb-4">👤PERSONAL CALCULATOR</h3>
      
      <div className="row g-3">
        <div className="col-6">
          <label>AGE</label>
          <input 
            type="number" 
            className="form-control"
            value={personalData.age}
            min="16"
            onChange={(e) => setPersonalData({...personalData, age: e.target.value})}
          />
        </div>

        <div className="col-6">
          <label>GENDER</label>
          <select 
            className="form-select"
            value={personalData.gender}
            onChange={(e) => setPersonalData({...personalData, gender: e.target.value})}
          >
            {GENDERS.map(g => (
              <option key={g} value={g}>{g === 'male' ? 'MALE' : 'FEMALE'}</option>
            ))}
          </select>
        </div>

        <div className="col-6">
          <label>WEIGHT(KG)</label>
          <input 
            type="number" 
            className="form-control"
            value={personalData.weight}
            onChange={(e) => setPersonalData({...personalData, weight: e.target.value})}
          />
        </div>

        <div className="col-6">
          <label>HIGHT(CM)</label>
          <input 
            type="number" 
            className="form-control"
            value={personalData.height}
            onChange={(e) => setPersonalData({...personalData, height: e.target.value})}
          />
        </div>

        <div className="col-12">
          <label>ACTIVITY LEVEL</label>
          <select 
            className="form-select"
            value={personalData.activity}
            onChange={(e) => setPersonalData({...personalData, activity: e.target.value})}
          >
            {ACTIVITIES.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label>YOUR GOAL</label>
          <select 
            className="form-select"
            value={personalData.goal}
            onChange={(e) => setPersonalData({...personalData, goal: e.target.value})}
          >
            {GOAL_TYPES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        className="btn btn-danger w-100 mt-4"
        onClick={onCalculate}
        disabled={loading}
      >
        {loading ? 'ON PROGRESS' : 'CALCULATE MY NEEDS'}
      </button>
    </div>
  );
};

export default PersonalForm;