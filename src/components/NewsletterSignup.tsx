'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Bug, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  initialNewsletterState,
  subscribeToNewsletter,
} from '@/app/actions/newsletter';

export default function NewsletterSignup() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialNewsletterState,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section className="bg-yellow-50 border-y border-yellow-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-flex p-3 bg-yellow-100 rounded-2xl mb-6">
          <Bug className="w-8 h-8 text-yellow-600 fill-yellow-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Join the Swarm</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Get "stern but fair" sustainability deal alerts and eco-friendly shopping tips delivered to your inbox.
        </p>

        {state.status === 'success' ? (
          <div className="bg-white p-8 rounded-2xl border border-green-200 shadow-sm inline-flex items-center gap-4 text-left">
            <CheckCircle2 className="w-10 h-10 text-green-500 shrink-0" />
            <div>
              <p className="font-bold text-gray-900 text-lg">Success!</p>
              <p className="text-gray-600">{state.message}</p>
            </div>
          </div>
        ) : (
          <form action={formAction} ref={formRef} className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all pr-12 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="absolute right-2 top-2 bottom-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm group"
                >
                  <Send
                    className={`w-5 h-5 ${pending ? 'animate-pulse' : 'group-hover:translate-x-1 transition-transform'}`}
                  />
                </button>
              </div>

              <div className="flex items-start gap-3 text-left">
                <input
                  type="checkbox"
                  name="gdpr_consent"
                  id="gdpr_consent"
                  required
                  className="mt-1.5 rounded text-yellow-600 focus:ring-yellow-500 border-gray-300"
                />
                <label htmlFor="gdpr_consent" className="text-sm text-gray-500 leading-snug">
                  I agree to receive email alerts. Hummlan.com values your privacy and will never share your data.
                  <a href="/privacy" className="text-yellow-600 hover:underline ml-1">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {state.status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {state.message}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
