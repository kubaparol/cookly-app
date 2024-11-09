import dayjs from 'dayjs';
import { ArrowUp } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="wrapper !mx-auto grid !max-w-6xl gap-12 !py-12">
      <header className="grid place-items-center gap-4" id="top">
        <h1 className="text-3xl font-semibold md:text-6xl">Privacy Policy</h1>
        <p className="text-gray-500 md:text-lg">
          Last updated {dayjs().subtract(2, 'week').format('MMMM D, YYYY')}
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-6">
        <div className="grid gap-12 md:col-span-4">
          <h2 className="text-xl font-semibold md:text-3xl">
            This Privacy Policy will help you better understand how we collect, use and share your
            personal information.
          </h2>

          <div className="grid gap-4">
            <h3 className="text-xl font-semibold">Privacy Policy</h3>

            {policy.map((item, index) => (
              <p key={index} className="text-gray-500">
                {item}
              </p>
            ))}
          </div>

          <div className="grid gap-10">
            <h3 className="text-xl font-semibold">Privacy Summary</h3>

            <ol className="grid gap-8">
              {summary.map((item, index) => (
                <li key={index} id={item.id} className="grid gap-3">
                  <p className="font-semibold">
                    {index + 1}. {item.title}
                  </p>

                  <p className="text-gray-500">{item.content}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex h-fit flex-col gap-4 max-md:row-start-1 max-md:row-end-2 md:sticky md:top-32 md:col-span-2">
          <h3 className="text-xl font-semibold">Table of Contents</h3>

          <ul className="grid gap-2 px-2">
            {summary.map((item, index) => (
              <li key={index}>
                {index + 1}.{' '}
                <Link href={`#${item.id}`} className="text-sm hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <Separator />

          <Link href="#top" className="flex items-center px-2 text-sm hover:underline">
            Back to top <ArrowUp className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const policy = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
];

const summary = [
  {
    id: 'what-personal-information-we-collect',
    title: 'What Personal Information we collect',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-we-use-your-personal-information',
    title: 'How we use your Personal Information',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-we-share-your-personal-information',
    title: 'How we share your Personal Information',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-we-protect-your-personal-information',
    title: 'How we protect your Personal Information',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-long-we-keep-your-personal-information',
    title: 'How long we keep your Personal Information',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-to-contact-us',
    title: 'How to contact us',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-we-update-our-privacy-policy',
    title: 'How we update our Privacy Policy',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
  {
    id: 'how-to-opt-out',
    title: 'How to opt out',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam laboriosam dolorem, optio mollitia veniam praesentium eius, omnis perferendis est dicta quisquam nam provident quas cupiditate consequuntur! In, inventore blanditiis! Architecto deserunt omnis aliquid magni in. Perferendis perspiciatis incidunt ipsum optio doloremque pariatur? Natus non ipsum voluptatum ipsam autem officiis nostrum, qui iure quaerat iste corporis labore ex quam voluptatem!',
  },
];
