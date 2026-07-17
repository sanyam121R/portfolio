'use client';

import { SubmitEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WaveText from '@/components/WaveText';

type Step = 0 | 1 | 2 | 3; // 3 = submitted

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fade = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -16, filter: 'blur(6px)' },
};

export default function ContactMe() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormState>({ name: '', email: '', message: '' });
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const next = () => {
    if (step === 0 && data.name.trim().length < 2) {
      setError('Please tell me your name.');
      return;
    }
    if (step === 1 && !EMAIL_RE.test(data.email.trim())) {
      setError('That email doesn’t look right.');
      return;
    }
    setError(null);
    setStep((s) => (s + 1) as Step);
  };

  const back = () => {
    setError(null);
    setStep((s) => (s - 1) as Step);
  };

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.message.trim().length < 5) {
      setError('Add a little more detail, please.');
      return;
    }
    setError(null);
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.');
        setSending(false);
        return;
      }
      setStep(3);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact-me"
      className="w-svw flex flex-col justify-center h-svh items-center px-8 py-28 border-t border-primary-border"
    >
      <div className="w-full md:w-[calc(100%-340px)] flex flex-col items-center gap-10">
        <div className="flex flex-col items-center text-center">
          <h1
            className="
              font-weird-word
              bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
              bg-clip-text [-webkit-background-clip:text]
              text-transparent [-webkit-text-fill-color:transparent]
              text-[40px] tracking-normal leading-normal whitespace-nowrap
            "
          >
            Let's Connect.
          </h1>
          <p className="text-secondary text-[10px] md:text-sm">
            hiring? collaborating? just say hi — one step at a time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= i ? 'w-6 bg-primary' : 'w-1.5 bg-primary-border'
              }`}
            />
          ))}
        </div>

        <div className="w-full max-w-xl min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="name"
                {...fade}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full flex flex-col gap-6"
              >
                <label className="flex flex-col gap-3">
                  <span className="text-tertiary text-sm">What's your name?</span>
                  <input
                    autoFocus
                    value={data.name}
                    onChange={(e) => update('name', e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && next()}
                    placeholder="Tony Stark"
                    className="bg-transparent border-b border-primary-border focus:border-primary outline-none py-3 text-2xl md:text-3xl text-primary placeholder:text-tertiary/50 transition-colors"
                  />
                </label>
                {error && <p className="text-[#c0392b] text-sm">{error}</p>}
                <button
                  onClick={next}
                  className="self-end text-sm md:text-base text-primary hover:underline"
                >
                  Next →
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="email"
                {...fade}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full flex flex-col gap-6"
              >
                <label className="flex flex-col gap-3">
                  <span className="text-tertiary text-sm">And your email?</span>
                  <input
                    autoFocus
                    type="email"
                    value={data.email}
                    onChange={(e) => update('email', e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && next()}
                    placeholder="javis@stark.com"
                    className="bg-transparent border-b border-primary-border focus:border-primary outline-none py-3 text-2xl md:text-3xl text-primary placeholder:text-tertiary/50 transition-colors"
                  />
                </label>
                {error && <p className="text-[#c0392b] text-sm">{error}</p>}
                <div className="flex items-center justify-between">
                  <button
                    onClick={back}
                    className="text-sm text-tertiary hover:text-primary transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={next}
                    className="text-sm md:text-base text-primary hover:underline"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="message"
                {...fade}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onSubmit={submit}
                className="w-full flex flex-col gap-6"
              >
                <label className="flex flex-col gap-3">
                  <span className="text-tertiary text-sm">
                    What's this about, {data.name.split(' ')[0] || 'friend'}?
                  </span>
                  <textarea
                    autoFocus
                    value={data.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={4}
                    placeholder="Role, project, or just a hello…"
                    className="bg-transparent border-b border-primary-border focus:border-primary outline-none py-3 text-lg md:text-xl text-primary placeholder:text-tertiary/50 transition-colors resize-none"
                  />
                </label>
                {error && <p className="text-[#c0392b] text-sm">{error}</p>}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={sending}
                    className="text-sm text-tertiary hover:text-primary transition-colors disabled:opacity-40"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="text-sm md:text-base text-primary hover:underline disabled:opacity-40"
                  >
                    {sending ? 'Sending…' : 'Send →'}
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="done"
                {...fade}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full flex flex-col items-center gap-6 text-center"
              >
                <h2 className="text-3xl md:text-4xl text-primary">
                  Thanks, {data.name.split(' ')[0] || 'friend'}!
                </h2>
                <p className="text-secondary text-sm max-w-sm">
                  Your message is on its way — I'll get back to you at{' '}
                  <span className="text-primary">{data.email}</span> soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}