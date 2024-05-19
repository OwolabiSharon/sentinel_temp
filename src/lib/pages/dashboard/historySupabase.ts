import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = createClient(
  'https://nzzbqnamrlqmpivqdiuy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56emJxbmFtcmxxbXBpdnFkaXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MzAzMTcsImV4cCI6MjAyNzIwNjMxN30.mxmTfc04QF_U12okAxD0xMPbRaQaUjf6k9fcEATlNks'
);
console.log(
  process.env.NEXT_HISTORY_SUPABASE_URL as string,
  process.env.NEXT_HISTORY_SUPABASE_ANON_KEY as string
);

export default supabase;

// import { createClient } from '@supabase/supabase-js';
// import { useEffect, useState } from 'react';

// const useSupabase = () => {
//   const [supabase, setSupabase] = useState(null);

//   useEffect(() => {
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//     if (supabaseUrl && supabaseKey) {
//       const client = createClient(supabaseUrl, supabaseKey);
//       setSupabase(client);
//     } else {
//       console.error(
//         'Supabase configuration missing. Check your environment variables.'
//       );
//     }
//   }, []);

//   return supabase;
// };

// export default useSupabase;
