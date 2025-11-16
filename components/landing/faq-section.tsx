"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "What is Hidden Prop?",
    answer:
      "A marketplace for real estate deals that make financial sense: off-market, under-market, distressed, or wholesale.",
  },
  {
    id: 2,
    question: "Who can post?",
    answer:
      "Owners, agents, investors, and wholesalers with real investor-grade opportunities.",
  },
  {
    id: 3,
    question: " Are MLS deals allowed?",
    answer: "Yes, if they are priced well and offer investor value.",
  },
  {
    id: 4,
    question: "Is it free to post?",
    answer: "Yes posting and browsing are free during launch.",
  },
  {
    id: 5,
    question: "How do I start?",
    answer: "Create an account, browse deals, or post your own.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 px-6 bg-white" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">
            Frequently Ask Question (FAQs)
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and properties
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#191919] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
