# Portfolio Backend Setup

This backend handles the contact form submissions for the portfolio website.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure email settings in `.env`:
   - Replace `your-email@gmail.com` with your Gmail address
   - Generate an App Password from Google Account settings (for Gmail)
   - Replace `your-app-password` with the generated app password

3. Start the server:
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

4. The server will run on http://localhost:3001
   - Frontend will be served from the same port
   - Contact form will send emails to mkashmil10@gmail.com

## Email Configuration

For Gmail:
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password
4. Use the App Password in EMAIL_PASS

For other email providers, update the transporter configuration in server.js accordingly.