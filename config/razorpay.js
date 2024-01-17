const Razorpay = require('razorpay');



exports.instance = new Razorpay({
    key_id: 'RAZORPAY_KEY_ID',
    key_secret: 'RAZORPAY_KEY_SECRET',
  });