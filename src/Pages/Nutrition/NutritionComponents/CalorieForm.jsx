import React from 'react';

const CalorieForm = ({ 
  calorieData, 
  setCalorieData, 
  onAnalyze, 
  loading 
}) => {

 const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCalorieData({
        ...calorieData,
        image: reader.result,        // base64 كامل للعرض
        imageBase64: reader.result.split(',')[1],  // base64 بدون header للباك
        imageType: file.type
      });
    };
    reader.readAsDataURL(file);
  }
};

  return (
    <div className="fade-in">
      <h3 className="card-title mb-4">🔥 CALORIE CALCULATOR </h3>
      
      <div className="mb-3">
        <label> DESCRIBE YOUR MEAL</label>
        <textarea 
          className="form-control" 
          rows="4" 
          placeholder="GRILLED CHICKEN ..."
          value={calorieData.description}
          onChange={(e) => setCalorieData({...calorieData, description: e.target.value})}
        />
      </div>

      <div className="mb-4">
        <label>  OR UPLOAD A PHOTO</label>
        <div className="upload-zone">
          <input 
            type="file" 
            id="imageUpload" 
            hidden 
            accept="image/*"
            onChange={handleImage}
          />
          <label htmlFor="imageUpload" className="upload-label">
            <div className="upload-icon">📸</div>
            <span> CLICK TO UPLOAD </span>
          </label>
        </div>
        
        {calorieData.image && (
          <img src={calorieData.image} alt="PREVIEW" className="img-preview mt-2" />
        )}
      </div>

      <button 
        className="btn btn-danger w-100"
        onClick={onAnalyze}
        disabled={loading}
      >
        {loading ? ' ON PROGRESS...' : ' MEAL ANALIZE'}
      </button>
    </div>
  );
};

export default CalorieForm;