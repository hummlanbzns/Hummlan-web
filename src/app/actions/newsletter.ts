'use server';

import { db } from '@/lib/db';

export type NewsletterActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialNewsletterState: NewsletterActionState = {
  status: 'idle',
  message: '',
};

export async function subscribeToNewsletter(
  _prevState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const emailRaw = (formData.get('email') as string | null) ?? '';
  const email = emailRaw.trim().toLowerCase();
  const gdprConsent = formData.get('gdpr_consent') === 'on';

  if (!EMAIL_REGEX.test(email)) {
    return { status: 'error', message: 'Please provide a valid email address.' };
  }

  if (!gdprConsent) {
    return { status: 'error', message: 'You must agree to the privacy policy.' };
  }

  try {
    const id = crypto.randomUUID();
    await db.execute({
      sql: 'INSERT INTO newsletter_subscribers (id, email, gdpr_consent) VALUES (?, ?, ?)',
      args: [id, email, 1],
    });

    return {
      status: 'success',
      message: "Welcome to the swarm! You'll hear from us soon.",
    };
  } catch (err: any) {
    const message = String(err?.message ?? '');

    if (message.includes('UNIQUE constraint failed')) {
      return { status: 'success', message: 'You are already subscribed!' };
    }

    console.error('Newsletter subscription error:', err);
    return { status: 'error', message: 'Something went wrong. Please try again later.' };
  }
}
