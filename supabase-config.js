// 1) Creează proiect Supabase.
// 2) Project Settings -> API -> copiază Project URL și anon public key aici.
// 3) În ADMIN_EMAILS pune emailul/emailurile care au voie să editeze.

export const supabaseConfig = {
  url: "https://xlelpnkljrweenhzhftn.supabase.co",
  anonKey: "sb_publishable_inJx1bbb6KJ03Pvd15ygjw_SpsR5KTP"
};

export const ADMIN_EMAILS = [
  "slavoliu.preda24@gmail.com"
];

export const TABLE_NAME = "calendar_events";
