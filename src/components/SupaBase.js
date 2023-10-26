import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zlmyubtiammpnmjszotv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbXl1YnRpYW1tcG5tanN6b3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMzM1MTQsImV4cCI6MjAwODkwOTUxNH0.ok2rPyZi6vmcarfclPdHuQz_9502Fu4JJ2-pafiH7ac'
export const supabase = createClient(supabaseUrl, supabaseKey)