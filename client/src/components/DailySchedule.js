import React from 'react';

const DailySchedule = () => (
  <div className="schedule__daily-schedule">
    <h3 className="daily-schedule__date">Monday 26/7</h3>
    <div className="daily-schedule-breakfast_section">
    <h3 className="daily-schedule__meal">Breakfast</h3>
    <ul className="daily-schedule-breakfast_list">
      <li key="1" className="daily-schedule-breakfast_item">
        Garlic spicy italian spaghetti
      </li>
      <li key="2" className="daily-schedule-breakfast_item">
        Garlic spicy italian spaghetti
      </li>
    </ul>
    <h3 className="daily-schedule__meal">Lunch</h3>
    <ul className="daily-schedule-lunch_list">
      <li key="1" className="daily-schedule-breakfast_item">
        Barbequed roast beef on a bun
      </li>
    </ul>
    <h3 className="daily-schedule__meal">Dinner</h3>
    <ul className="daily-schedule-dinner_list">
      <li key="1" className="daily-schedule-breakfast_item">
        Balsamic-thyme roasted mus..
      </li>
    </ul>
    </div>
  </div>
);

export default DailySchedule;
