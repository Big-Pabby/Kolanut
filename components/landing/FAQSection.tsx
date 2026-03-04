"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView, type Variants } from "framer-motion";

const faqs = [
  {
    question: "How do I get started with your product?",
    answer:
      "Sign up on our website, explore features, customize your profile, and start using our product. We're here to help!",
    defaultOpen: true,
  },
  {
    question: "Is there a free trial available?",
    answer: "",
    defaultOpen: false,
  },
  {
    question: "How do I get started with your product?",
    answer:
      "Sign up on our website, explore features, customize your profile, and start using our product. We're here to help!",
    defaultOpen: true,
  },
  {
    question: "Is there a free trial available?",
    answer: "",
    defaultOpen: false,
  },
  {
    question: "Is there a free trial available?",
    answer: "",
    defaultOpen: false,
  },
  {
    question: "Is there a free trial available?",
    answer: "",
    defaultOpen: false,
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="bg-white py-10 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-8 lg:flex-row lg:gap-16"
        >
          {/* Left */}
          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col gap-4 lg:gap-6 lg:w-[45%]"
          >
            <div className="flex flex-col gap-3 lg:gap-4">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold capitalize leading-[1.2] lg:leading-[58px] text-dark-text">
                Frequently Asked Questions
              </h2>
              <p className="text-sm lg:text-base leading-[27px] text-body-text">
                For any unanswered questions, reach out to our support team via
                email. We'll respond as soon as possible to assist you.
              </p>
            </div>
            <Button className="w-fit rounded-full bg-brand-red !py-2.5 !px-6 lg:!py-3 lg:!px-8 text-sm lg:text-base font-medium text-white hover:bg-brand-red/90 h-auto">
              Contact Us
            </Button>
          </motion.div>

          {/* Right accordion */}
          <motion.div variants={itemVariants} className="w-full lg:w-[55%]">
            <Accordion
              type="multiple"
              defaultValue={["item-0", "item-2"]}
              className="flex flex-col gap-0"
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-t border-faq-border py-2"
                >
                  <AccordionTrigger className="text-base lg:text-lg font-semibold text-dark-text hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  {faq.answer && (
                    <AccordionContent className="text-sm lg:text-base leading-6 text-body-text">
                      {faq.answer}
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
