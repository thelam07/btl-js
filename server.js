const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient('https://zhvldczkmyvpjxvbfxqp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodmxkY3prbXl2cGp4dmJmeHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzY2NDgsImV4cCI6MjA5MDE1MjY0OH0.eJGc7Qczr_4yrPLdjbVA454SUg2kP0OF2oo6734M_RY');

app.post('/api/contact', async (req, res) => {
    const turnstileToken = req.body.turnstileToken
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secret: '0x4AAAAAACwpwNOltDFjR1E77-vXfXsjaQE',
            response: turnstileToken
        })
    })
    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
        res.status(403).send('Bot detected')
        return
    }

    console.log(req.body);
    const { data, error } = await supabase.from('contacts').insert({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })
    if (error) {
        console.log(error);
        res.status(500).send('Error');
    } else {
        res.send('Thanh cong');
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

