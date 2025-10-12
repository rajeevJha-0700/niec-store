import { createClient } from "@supabase/supabase-js";
import config from "../Configuration/Config";

export const master = createClient(config.Url,config.PublicKeyCredential);