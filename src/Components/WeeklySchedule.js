import React, { useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import DrinkCard from './DrinkCard'
import DayPanel from './DayPanel'


let WeeklySchedule = (props) => {

  let allFavoritesDrinks = useSelector(state => state.allDrinks.filter((drink) => drink.follow));
  let daysDrink = useSelector(state => state.daysDrink);

  let dispatch = useDispatch();
 
  useEffect(() => {
    dispatch({ type: "SCHEDULE_FROM_STORAGE", payload: {} });
  }, []);
  
  useEffect(() => {
    localStorage.setItem("daysDrink",  JSON.stringify(daysDrink));
    console.log("how much times?")
  })

  const handleDrop =
    (item, idDayPanel) => {
      // Add this item to day-panel
      dispatch({ type: "DRINK_TO_DAY", payload: { idDrink: item.idDrink, day: idDayPanel } });
      
      // If this item comes from another day-panel
      // Delete this item from the other day-panel
      if (item.day)  dispatch({ type: "DELETE_DRINK_FROM_DAY", payload: { idDrink: item.idDrink, day: item.day } });

      // Save the result on localstorage
     localStorage.setItem("daysDrink",  JSON.stringify(daysDrink));
    };

  return (
    <main className="container-fluid vh-100 bg-light">
      <div className="row vh-100">
        <div className="col-12 text-center mt-4">
          <h1 className="display-2"> Arrange Drinks </h1>
          <div className="row justify-content-center align-self-center pl-3 pr-3 pb-3">
            {
              allFavoritesDrinks.length === 0 ?
                <div className="row justify-content-center">
                  <div className="col" role="status">
                     you dont have drinks for day
                  </div>
                </div>
                :
                <div className="row">
                <div className="col-8 pr-10">
                    <table className="table">
                      <thead>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Teusday</th>
                        <th>Wendsday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Satr</th>
                      </thead>
                      <tbody>
                      <tr>
                          {daysDrink.map((m, i) => {
                            return (
                            <td key={i+1} className="align-top">
                                <DayPanel accept={"card"} idDayPanel={i} onDrop={(item) => handleDrop(item, i)}></DayPanel>
                              </td>
                            )
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-4 draggingDiv">
                  <div className="container mt-3">
                    <div className="row justify-content-center align-self-center w-100">
                      {allFavoritesDrinks.map((drink) => {
                        return (
                          <div className="col-lg-6 col-md-6 py-2" >
                            <DrinkCard key={drink.idDrink} idDrink={drink.idDrink} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                </div>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
export default WeeklySchedule


/* 
<div className="container-fluid mt-3 w-100 h-100" style={{ backgroundColor: '#23f' }}>
<div className="row justify-content-center align-self-center h-100" style={{ backgroundColor: '#ff3' }}>
  {daysDrink.map((m, i) => {
    return (
      <div className="col h-100" style={{ minWidth: '15rem' }} >
        <DayPanel accept={"card"} idDayPanel={i} onDrop={(item) => handleDrop(item, i)}></DayPanel>
      </div>
    )
  })}
</div>
</div> */