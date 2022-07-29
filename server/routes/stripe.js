const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
require('dotenv').config();

const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET)

router.post('/create-checkout-session', async (req, res) => {
  // const line_item = req.body.plan.map(item => {
  //   console.log(req.body.plan)
  //   return {
  //     price_data: {
  //       currency: 'ca',
  //       product_data: {
  //         name: item.plan,
  //       },
  //       unit_amount: item.price
  //     },
  //     quantity: 1,
  //   }
  // })
 


  const session = await stripe.checkout.sessions.create({
 
  
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: "sdf",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.APP_HOST}/checkout-success`,
    cancel_url: `${process.env.APP_HOST}/account/Billing`,
  });

  res.send({url:session.url});
});

module.exports = router