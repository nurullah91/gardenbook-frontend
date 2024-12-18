"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function FAQAccordion() {
  const accordionContent = [
    {
      title: "How can I get premium?",
      content:
        "You need to create content fist and get minimum total 5 upvote from your total content. Then you will get a button to your profile page for payment and getting premium access or verified user",
    },
    {
      title: "How can I get premium?",
      content:
        "You need to create content fist and get minimum total 5 upvote from your total content. Then you will get a button to your profile page for payment and getting premium access or verified user",
    },
    {
      title: "How can I get premium?",
      content:
        "You need to create content fist and get minimum total 5 upvote from your total content. Then you will get a button to your profile page for payment and getting premium access or verified user",
    },
    {
      title: "How can I get premium?",
      content:
        "You need to create content fist and get minimum total 5 upvote from your total content. Then you will get a button to your profile page for payment and getting premium access or verified user",
    },
  ];

  return (
    <Accordion variant="splitted">
      {accordionContent.map((item, index) => (
        <AccordionItem key={index} aria-label={item.title} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
