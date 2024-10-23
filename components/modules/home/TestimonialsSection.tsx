import { StarFilledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export default function TestimonialsSection() {
  return (
    <section className="wrapper !pb-20 !pt-8 md:!pb-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-primary-600">
              Discover how our app is changing the way people cook and share recipes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: { name: string; role: string; image: string; content: string; rating: number };
}) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-primary-100"></div>
      <div className="mb-4 flex items-center">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={60}
          height={60}
          className="mr-4 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-primary-900">{testimonial.name}</h3>
          <p className="text-sm text-primary-600">{testimonial.role}</p>
        </div>
      </div>

      <p className="mb-4 text-primary-800">{testimonial.content}</p>

      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarFilledIcon
            key={i}
            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
          />
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Home Cook Enthusiast',
    image: '/user-1.webp',
    content:
      "This app has revolutionized my meal planning. I've discovered so many new recipes and improved my cooking skills!",
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    role: 'Food Blogger',
    image: '/user-2.webp',
    content:
      'As a food blogger, I love how easy it is to share my recipes and connect with other foodies. The community feature is fantastic!',
    rating: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'Busy Parent',
    image: '/user-3.webp',
    content:
      'The meal planning feature has been a lifesaver for my family. We eat healthier and save money on groceries now.',
    rating: 5,
  },
];
