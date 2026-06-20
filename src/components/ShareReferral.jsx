import { useState } from 'react';

function CopyField({ id, label, value }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      
    }
  }

  return (
    <div className="share-field">
      <label htmlFor={id}>{label}</label>
      <div className="share-field__row">
        <input id={id} type="text" readOnly value={value || ''} />
        <button
          type="button"
          className={`btn btn--secondary ${copied ? 'btn--copied' : ''}`}
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
      <span className="visually-hidden" role="status">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </div>
  );
}

export default function ShareReferral({ referral }) {
  return (
    <section className="panel panel--accent" aria-label="Share referral">
      <h2 className="panel__title">Refer friends and earn more</h2>
      <div className="share-fields">
        <CopyField id="referral-link" label="Your Referral Link" value={referral?.link} />
        <CopyField id="referral-code" label="Your Referral Code" value={referral?.code} />
      </div>
    </section>
  );
}
