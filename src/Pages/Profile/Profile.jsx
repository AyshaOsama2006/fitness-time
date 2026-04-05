import React from 'react';
import './Profile.css'; 

export default function Profile()  {
  return (
    <>
      <header className="container mt-5">
        <h1 className="text-center fw-bold text-white">YOUR PROFILE</h1>
        <p className="text-center text-white  mb-5 fs-4">
          Track your progress and manage your fitness journey
        </p>
      </header>

      <section className="container mt-4">
        <div className="row">
          
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card mb-4">
              <img
                src="https://i.pravatar.cc/150?img=12  "
                className="rounded-circle d-block mx-auto my-4 mb-2"
                alt="Profile Picture"
                width="120"
                height="120"
              />

              <div className="card-body text-center">
                <h5 className="card-title text-white fw-bold fs-4">John Doe</h5>
                <p className="text-white text-opacity-50">Premium Member</p>
              </div>

              <ul className="list-group list-group-flush mt-4 gap-3">
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="text-white text-opacity-50 small">Age</span>
                    <span className="text-white fw-bold">28 years</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="text-white text-opacity-50 small">Height</span>
                    <span className="text-white fw-bold">178 cm</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="text-white text-opacity-50 small">Weight</span>
                    <span className="text-white fw-bold">75 kg</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="text-white text-opacity-50 small">Goal</span>
                    <span className="text-danger fw-bold">Muscle Gain</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="text-white text-opacity-50 small">Member Since</span>
                    <span className="text-white fw-bold">Jan 2024</span>
                  </div>
                </li>
              </ul>

              <button
                type="button"
                className="mt-5 btn btn-outline-dark mb-5 mx-4 border-1 fw-bold border-dark p-3 text-white"
              >
                EDIT PROFILE
              </button>
            </div>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="container mb-4">
              <div className="card p-4 border-danger" style={{ background: '#111' }}>
                <h4 className="text-white mb-5 mt-3 fw-bold">BODY STATISTICS</h4>

                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card p-4 bg-dark border-0 h-100">
                      <p className="text-secondary">Current Weight</p>
                      <h2 className="text-white fw-bold">75kg</h2>
                      <p className="text-success fw-bold">-2 kg this month</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card p-4 bg-dark border-0 h-100">
                      <p className="text-secondary">BMI</p>
                      <h2 className="text-white fw-bold">23.7</h2>
                      <p className="text-success fw-bold">Normal Range</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card p-4 bg-dark  h-100">
                      <p className="text-secondary">Body Fat</p>
                      <h2 className="text-white fw-bold">18%</h2>
                      <p className="text-success fw-bold">-1.5% this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-4 border-danger" style={{ background: '#111' }}>
              <h4 className="text-white mb-5 mt-3 fw-bold">DAILY NUTRITION TARGETS</h4>

              <div className="column g-4">
                <div className="mb-4">
                  <div className="d-flex justify-content-between text-white mb-2">
                    <span className="text-secondary">Calories</span>
                    <span className="fw-bold">1850 / 2500 kcal</span>
                  </div>
                  <div className="progress" style={{ height: '8px', backgroundColor: '#333' }}>
                    <div className="progress-bar bg-danger" style={{ width: '74%' }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between text-white mb-2">
                    <span className="text-secondary">Protein</span>
                    <span className="fw-bold">120 / 180g</span>
                  </div>
                  <div className="progress" style={{ height: '8px', backgroundColor: '#333' }}>
                    <div className="progress-bar bg-danger" style={{ width: '67%' }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between text-white mb-2">
                    <span className="text-secondary">Carbohydrates</span>
                    <span className="fw-bold">200 / 300g</span>
                  </div>
                  <div className="progress" style={{ height: '8px', backgroundColor: '#333' }}>
                    <div className="progress-bar bg-danger" style={{ width: '67%' }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between text-white mb-2">
                    <span className="text-secondary">Fat</span>
                    <span className="fw-bold">55 / 80g</span>
                  </div>
                  <div className="progress" style={{ height: '8px', backgroundColor: '#333' }}>
                    <div className="progress-bar bg-danger" style={{ width: '69%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 ">
          <div className="card bg-dark text-white border-secondary shadow-lg rounded border">
            <div className="card-body card4">
              <h5 className="card-title mb-4 fw-bold">MONTHLY PROGRESS</h5>

              <div className="row text-center g-3">
                <div className="col-md-3">
                  <div className="p-3 rounded border border-danger month-box red">
                    <h3 className="text-danger fw-bold">24</h3>
                    <p className="mb-0 fw-bold">Workouts</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="p-3 rounded border border-success month-box green">
                    <h3 className="text-success fw-bold">12</h3>
                    <p className="mb-0 fw-bold">Days Streak</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="p-3 rounded border border-primary month-box blue">
                    <h3 className="text-primary fw-bold">45h</h3>
                    <p className="mb-0 fw-bold">Total Time</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="p-3 rounded border border-warning month-box yellow">
                    <h3 className="text-warning fw-bold">52K</h3>
                    <p className="mb-0 fw-bold">Calories Burned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
