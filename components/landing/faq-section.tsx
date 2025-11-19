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
      "Hidden Prop is a platform where users can share off market, under market, wholesale, distressed, and competitively priced MLS real estate opportunities. It is designed to give buyers and investors one place to find deals that are not commonly promoted on public listing sites.",
  },
  {
    id: 2,
    question: "Who can post?",
    answer:
      "Anyone can post as long as the details are accurate and complete. This includes agents, investors, wholesalers, landlords, and property owners. Every listing must have clear information, real photos, and straightforward numbers so other users can review the deal properly.",
  },
  {
    id: 3,
    question: " Are MLS deals allowed?",
    answer:
      "Yes. MLS deals are allowed if the pricing or situation makes the property appealing to investors. Standard full market value listings that offer no advantage are not the focus of the platform. Properties that are underpriced, mispriced, motivated, or have value add potential are acceptable.",
  },
  {
    id: 4,
    question: "Is it free to post?",
    answer:
      "Yes. Posting is free. The goal is to encourage activity and allow users to share opportunities without any barriers.",
  },
  {
    id: 5,
    question: "How do I start?",
    answer:
      "Create an account, verify your email, and you can begin posting or browsing properties right away. When posting, upload photos and include basic details such as price, condition, location, and any relevant financial information. When browsing, use the filters to look through off market, under market, wholesale, distressed, or MLS categories.",
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
                <AccordionTrigger className="text-left text-lg lg:text-xl font-semibold text-[#191919] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 text-base lg:text-lg">
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
