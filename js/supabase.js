const SUPABASE_URL = "https://llpywooosxuhmruzypxm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9I_e7WuErr8lQpCNJsfdNA_aLooA2QJ";

const { createClient } = supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
