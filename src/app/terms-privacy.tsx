"use client";

export default function TermsPrivacy() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-2">
      <div className="max-w-2xl w-full bg-card-bg rounded-3xl shadow-2xl border border-card-border p-8 md:p-12">
        <h1 className="text-4xl font-extrabold mb-8 text-foreground font-logo drop-shadow-sm">Legal: Terms & Privacy Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground font-logo">1. Introduction</h2>
          <p className="text-secondary text-base md:text-lg">
            Welcome to Neighborly! By using our platform, you agree to these Terms of Service and our Privacy Policy. Please read them carefully. If you do not agree, you may not use our services.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground font-logo">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-1 text-secondary text-base md:text-lg">
            <li>Provide accurate information and keep your account secure.</li>
            <li>Respect your neighbors and communicate respectfully.</li>
            <li>Do not post illegal, harmful, or inappropriate content.</li>
            <li>Report suspicious or abusive behavior to our support team.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground font-logo">3. Privacy Policy</h2>
          <ul className="list-disc pl-6 space-y-1 text-secondary text-base md:text-lg">
            <li>We collect only the information necessary to provide our services (such as email, location, and posts).</li>
            <li>Your data is never sold to third parties.</li>
            <li>We use industry-standard security to protect your information.</li>
            <li>You can request deletion of your account and data at any time by contacting support.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground font-logo">4. Community Guidelines</h2>
          <ul className="list-disc pl-6 space-y-1 text-secondary text-base md:text-lg">
            <li>Be kind, helpful, and inclusive.</li>
            <li>Do not spam or advertise commercial products.</li>
            <li>Respect privacy—do not share others' personal information without consent.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground font-logo">5. Changes & Contact</h2>
          <p className="text-secondary text-base md:text-lg">
            We may update these terms and our privacy policy from time to time. Significant changes will be communicated via the app. For questions, contact <a href="mailto:support@neighborly.com" className="text-accent underline hover:text-primary-dark bg-accent/10 px-1 rounded transition-colors">support@neighborly.com</a>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground font-logo">6. Disclaimer</h2>
          <p className="text-secondary text-base md:text-lg">
            Neighborly is a platform for community connection. We are not responsible for the actions of users, but we strive to keep the platform safe and positive for everyone.
          </p>
        </section>
      </div>
    </div>
  );
}
