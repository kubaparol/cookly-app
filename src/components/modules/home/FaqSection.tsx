import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export function FaqSection() {
  return (
    <section id="faq" className="wrapper py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about Recipe Hub.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I import recipes from other websites?</AccordionTrigger>
              <AccordionContent>
                Recipe Hub allows you to import recipes from any website by simply pasting the URL.
                Our system will automatically extract the ingredients, instructions, and other
                details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I access my recipes offline?</AccordionTrigger>
              <AccordionContent>
                Yes! With our mobile app, your recipes are available offline. Any changes you make
                while offline will sync once you&apos;re connected again.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How does the meal planning feature work?</AccordionTrigger>
              <AccordionContent>
                Our meal planner lets you drag and drop recipes onto a calendar, automatically
                generates shopping lists based on your plan, and helps you organize your cooking
                schedule.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I share my recipes with non-members?</AccordionTrigger>
              <AccordionContent>
                You can share your recipes via a public link that anyone can view, even if they
                don&apos;t have a Recipe Hub account.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, PayPal, and Apple Pay for subscription payments.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. Your access will continue until
                the end of your current billing period.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
