import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read .env file manually to get credentials without 'dotenv' package
const envPath = path.resolve(__dirname, '../.env');
console.log(`Reading .env from: ${envPath}`);

let envConfig = {};
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envConfig[key.trim()] = value.trim().replace(/['"]/g, ''); // Remove quotes if present
        }
    });
} catch (error) {
    console.error('Error reading .env file:', error.message);
    process.exit(1);
}

const SUPABASE_URL = envConfig.VITE_SUPABASE_URL;
const SUPABASE_KEY = envConfig.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env file');
    process.exit(1);
}

// 2. Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function backfill() {
    console.log('Starting backfill process...');

    // 3. Get records with missing location data (checking 'city' as an indicator)
    // We only select records where ip_address is present
    const { data: logs, error } = await supabase
        .from('visit_logs')
        .select('id, ip_address')
        .is('city', null)
        .not('ip_address', 'is', null);

    if (error) {
        console.error('Error fetching logs:', error);
        return;
    }

    console.log(`Found ${logs.length} records to update.`);

    for (const log of logs) {
        const ip = log.ip_address;
        console.log(`Processing ID: ${log.id}, IP: ${ip}...`);

        try {
            // 4. Fetch location data from ipwho.is
            const res = await fetch(`https://ipwho.is/${ip}`);
            if (!res.ok) {
                console.error(`Failed to fetch info for IP ${ip}: ${res.statusText}`);
                continue;
            }

            const data = await res.json();

            if (!data.success) {
                console.error(`API Error for IP ${ip}: ${data.message}`);
                continue;
            }

            // 5. Update Supabase record
            const { country, region, city, latitude, longitude, connection } = data;
            const isp = connection ? connection.isp : 'Unknown';

            const { error: updateError } = await supabase
                .from('visit_logs')
                .update({
                    country: country,
                    region: region,
                    city: city,
                    latitude: latitude,
                    longitude: longitude,
                    isp: isp
                })
                .eq('id', log.id);

            if (updateError) {
                console.error(`Failed to update ID ${log.id}:`, updateError.message);
            } else {
                console.log(`Successfully updated ID ${log.id} - ${city}, ${country}`);
            }

        } catch (err) {
            console.error(`Exception processing ID ${log.id}:`, err);
        }

        // Polite delay to avoid rate limiting
        await sleep(1500); // 1.5 seconds delay
    }

    console.log('Backfill complete!');
}

backfill();
