import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

const terms = [
  {
    title: 'Information We Collect',
    description:
      'We collect information that you provide to us directly, such as when you create an account, update your profile, or use interactive features of our services.',
  },
  {
    title: 'How We Use Information',
    description:
      'We use the information we collect to provide, maintain, and improve our services, to develop new services, and to protect our company and our users.',
  },
  {
    title: 'Sharing Information',
    description:
      'We do not share your personal information with third parties except as described in this policy. We may share information with vendors and service providers who perform services on our behalf.',
  },
  {
    title: 'Your Rights',
    description:
      'You have the right to access, update, or delete your personal information. You can do this by contacting us directly or through your account settings.',
  },
  {
    title: 'Contact Us',
    description:
      'If you have any questions about this privacy policy, please contact us at support@cookly-app.com.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="wrapper grid gap-12">
      <header>
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Last update: {new Date().toLocaleDateString()}
        </p>
      </header>

      <ul className="gris gap-2">
        {terms.map((term, index) => (
          <li key={index}>
            <h2 className="mb-2 text-2xl font-semibold">{term.title}</h2>
            <p className="mb-4">{term.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
