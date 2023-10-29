'use client';
// import Link from 'next/link';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import MainChat from './components/MainChat/MainChat';
import EventForm from './components/Forms/EventForm'
import CalendarLogin from './components/Calendar/Calendar';

const supabase = createClient(
  'https://oodbxjicokcxmmclwojn.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZGJ4amljb2tjeG1tY2x3b2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NDQ3ODEsImV4cCI6MjAwMTIyMDc4MX0.RJHxPMDTBwx16ZElgEiOGNesdJac6340SKI5KAtih0k'
)

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
      // ..
    },
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
      //..
    },
  },
  // You can also add more theme variations with different names.
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
      //..
    },
  },
}

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const getUserId = async () => {
    let { data: profiles, error } = await supabase
    .from('profiles')
    .select('id')
    return profiles
  }

  const insertUserId = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { id: session.user.id },
    ])
  }

  if(session) {
    (async function get() {
      const profiles = await getUserId()
      if (profiles.length === 0) {
        insertUserId()
      } else {
        return
      }
    })()
  }

  if (!session) {
    return (
      <div class="container w-50">
        <Auth 
          supabaseClient={supabase}
          theme="default" // can also be "dark" or "evenDarker"
          appearance={{ 
            theme: customTheme, 
            className: {
              input: 'input-h',
              button: 'my-awesome-button',
              //..
            },
          }} 
        />
      </div>
    )
  } else {
    return (
      <>
        <CalendarLogin getUserId={getUserId}/>
        <EventForm getUserId={getUserId}/>
      </>
    )
  }
}
