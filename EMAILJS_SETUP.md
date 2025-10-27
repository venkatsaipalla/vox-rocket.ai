# EmailJS Setup Instructions

To enable the contact form to send emails, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_xxxxxxx`)

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Company: {{company}}

Message:
{{message}}

---
This message was sent from the VoxRocket.ai contact form.
```

4. Note down your **Template ID** (e.g., `template_xxxxxxx`)

## 4. Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxx`)

## 5. Update Contact Component
Replace the placeholder values in `/src/components/Contact.tsx`:

```typescript
const serviceId = 'your_service_id_here'; // Replace with your Service ID
const templateId = 'your_template_id_here'; // Replace with your Template ID  
const publicKey = 'your_public_key_here'; // Replace with your Public Key
```

## 6. Test the Form
1. Fill out the contact form on your website
2. Submit the form
3. Check both email addresses to ensure emails are received:
   - venkatasaipalla0@gmail.com
   - Sathwikgottipati@gmail.com

## EmailJS Free Tier Limits
- 200 emails per month
- 2 email services
- 2 email templates
- Perfect for most small business websites

## Troubleshooting
- Make sure all IDs are correct
- Check browser console for any error messages
- Verify your email service is properly connected
- Ensure the template variables match the form data structure
