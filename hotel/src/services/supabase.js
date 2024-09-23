
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://scijmxnaxttycwtfbqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaWpteG5heHR0eWN3dGZicW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTYxNzUsImV4cCI6MjA0MjQ5MjE3NX0.S8hh0YTtJPAch5ijeDqKIueaQukZ6wals7N9m8H-AZs'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;