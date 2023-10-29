import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { useState } from 'react'
import { config } from "./GoogleConfig";
import EventCheck from '../EventCheck/EventCheck';

const apiCalendar = new ApiCalendar(config);

const CalendarLogin = ({getUserId}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(apiCalendar)

  const handleItemClick = async (e, name) => {
    if (name === 'sign-in') {
      const newToken = await apiCalendar.handleAuthClick()
      setIsLoggedIn(true)
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
      setIsLoggedIn(false)
    }
  }

  // isLoggedIn && 
  //   apiCalendar.listUpcomingEvents(10).then(({ result }) => {
  //     console.log(result.items);
  //   })
  
    return (
      <>
      {!isLoggedIn &&
        <button type="button" className="btn btn-danger"
          onClick={(e) => handleItemClick(e, 'sign-in')}
        > sign-in
        </button>
      }
      {isLoggedIn &&
        <button type="button" className="btn btn-success"
          onClick={(e) => handleItemClick(e, 'sign-out')}
        > sign-out
        </button>
      }
      <EventCheck 
        apiCalendar={apiCalendar}
        getUserId={getUserId}
      />
      </>
  );
};

export default CalendarLogin