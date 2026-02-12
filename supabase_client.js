
// Basic Supabase interaction without npm package (using fetch for simplicity or CDN in global scope)
// Since we'll add the CDN script to index.html, 'supabase' will be available globally.

const SUPABASE_URL = 'https://qiaxzwdwfzrwskoulwoj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6Z6M4reRtnWhDTD3EmZvLA_9KVlZBCE';

// Initialize client
let supabaseClient = null;

function initSupabase() {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error('Supabase library not loaded');
    }
}

async function saveResponse(name, responseText) {
    if (!supabaseClient) {
        console.error('Supabase not initialized');
        return;
    }

    const { data, error } = await supabaseClient
        .from('responses')
        .insert([
            { name: name, response: responseText },
        ]);

    if (error) {
        console.error('Error saving response:', error);
    } else {
        console.log('Response saved:', data);
    }
}
