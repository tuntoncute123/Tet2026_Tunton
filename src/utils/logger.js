import { supabase } from '../supabaseClient';

export const logVisit = async () => {
    try {
        // Prevent duplicate logging in the same session
        const sessionKey = 'has_logged_visit';
        if (sessionStorage.getItem(sessionKey)) {
            // Already logged this session, skip
            return;
        }

        // 1. Get Public IP
        const res = await fetch('https://api.ipify.org?format=json');
        if (!res.ok) throw new Error('Failed to fetch IP');
        const data = await res.json();
        const ip = data.ip;

        // 2. Get Device Info
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? 'Mobile' : 'Desktop';

        // 3. Insert into Supabase
        const { error } = await supabase
            .from('visit_logs')
            .insert([
                {
                    ip_address: ip,
                    user_agent: userAgent,
                    device_type: deviceType
                }
            ]);

        if (error) {
            console.error('Supabase log error:', error);
        } else {
            // Mark as logged for this session
            sessionStorage.setItem(sessionKey, 'true');
            console.log('Visit logged successfully');
        }

    } catch (err) {
        console.error('Logger failed:', err);
    }
};
