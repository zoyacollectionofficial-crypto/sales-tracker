# Sales Tracker — Local Setup (Roman Urdu Guide)

Bina Netlify ke, apne computer par app chalane ka tareeqa. Koi logo, koi branding nahi — app 100% aapki hai.

## Chahiye kya
- Aapka Windows computer (yehi wala jis par Tailscale hai)
- Aapka mobile — dono **isi WiFi** par connected hon
- Python (agar nahi hai to 2 minute mein install ho jata hai, neeche dekhein)

## Steps

### 1. Files nikalein
- `sales-tracker-local.zip` download karke kisi folder mein unzip kar lein, masalan `Documents\SalesTracker\`.

### 2. Server chalayein
- Us folder mein `start-local.bat` par **double-click** karein.
- Kaali window khulegi aur aapke computer ka address likha aayega, masalan:
  `http://192.168.1.5:8000`
- Pehli dafa Windows Firewall ka popup aaye to **"Allow access"** dabayein.
- **Note:** Jab tak app use karna hai, ye window khuli rakhein. Band karne ke liye window close kar dein.

### 3. Mobile par kholein
- Mobile ka WiFi **wahi** ho jo computer par hai.
- Mobile ke browser (Chrome behtar hai) mein wohi address likhein, masalan:
  `http://192.168.1.5:8000`
- App khul jayegi. Phir Chrome ke menu (teen dots) → **"Add to Home screen"** dabayein.
- Ab app aapke mobile ki home screen par icon ke saath install hai — aam app ki tarah khulegi.

### 4. Python nahi hai?
- `start-local.bat` khud bata degi agar Python nahi mila.
- https://www.python.org/downloads/ se download karke install karein.
- Install ke waqt **"Add python.exe to PATH"** wala tick lagana na bhoolein.
- Phir `start-local.bat` dobara chalayein.

## Zaroori baatein
- Computer aur mobile **ek hi WiFi** par hon — warna mobile address nahi khol payega.
- Ye method ghar/office ke andar ke liye hai. Bahar se (mobile data par) kholne ke liye internet hosting (jaise Netlify) chahiye hogi.
- Local WiFi par service-worker offline mode kaam nahi karta (browser ki security waja se), lekin app online rehte hue poori tarah chalti hai aur data Supabase mein save hota hai.
- Data Supabase mein mehfooz rehta hai — computer band hone se data zaya nahi hota.
