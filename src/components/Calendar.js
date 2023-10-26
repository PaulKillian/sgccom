import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { useState } from 'react'
import { config } from "./GoogleConfig";

const apiCalendar = new ApiCalendar(config);

const Calendar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleItemClick = async (e, name) => {
    if (name === 'sign-in') {
      const test = await apiCalendar.handleAuthClick()

      const list = await apiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log('ressss', result.items);
      })
      console.log(list)
      const eventFromNow = {
        summary: "Poc Dev From Now",
        time: 480,
      };
      
      apiCalendar
        .createEventFromNow(eventFromNow)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    }
  }

  // isLoggedIn && 
  //   apiCalendar.listUpcomingEvents(10).then(({ result }) => {
  //     console.log(result.items);
  //   })
  
    return (
      <>
        <button
          onClick={(e) => handleItemClick(e, 'sign-in')}
        >
          sign-in
        </button><button
          onClick={(e) => handleItemClick(e, 'sign-out')}
        >
            sign-out
          </button>
      </>
  );
};

export default Calendar