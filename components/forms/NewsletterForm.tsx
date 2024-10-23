import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface NewsletterFormProps {}

export const NewsletterFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type NewsletterFormValues = z.infer<typeof NewsletterFormSchema>;

export default function NewsletterForm(props: NewsletterFormProps) {
  const {} = props;

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const submitHandler = (values: NewsletterFormValues) => {
    form.reset();
    toast.success('You have been successfully added to the newsletter!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="bg-white">
                <Input placeholder="e.g., johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" className="w-fit">
          Subscribe
        </Button>
      </form>
    </Form>
  );
}
