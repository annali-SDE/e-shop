import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';
import { buffer } from 'micro';
import prisma from '../../libs/prisma';

export const config = {
	api: { bodyParsder: false }
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-10-28.acacia'
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const buf = await buffer(req);
	const signature = req.headers['stripe-signature'];
	if (!signature) {
		return res.status(400).send('Webhook Error: Missing Stripe Signature');
	}
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			buf,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (err) {
		return res.status(400).send(`Webhook Error ${err}`);
	}
	switch (event.type) {
		case 'charge.succeeded':
			const charge: any = event.data.object as Stripe.Charge;
			if (typeof charge.payment_intent === 'string') {
				await prisma?.order.update({
					where: {
						paymentIntentId: charge.payment_intent
					},
					data: { status: 'complete', address: charge.shipping?.address }
				});
			}
			break;
		default:
	}
	res.json({ received: true });
};
export default handler;