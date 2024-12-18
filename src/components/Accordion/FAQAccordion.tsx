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
      title: "How many charge for a day and what plan is available?",
      content:
        "We are now giving only one month plan for a single payment. After one month you can renew it again. We are taking charge of 500 BDT for one month premium subscription",
    },
    {
      title: "How can make a custom garden plan?",
      content:
        "You can make a custom garden plan for your garden by dragging and dropping elements to the canvas and also you can resize them and re order them as you want then you can download the canvas as png or pdf file",
    },
    {
      title: "How can I delete my account?",
      content:
        "If you want to delete your account permanently you need to contact to our admin by email call or filling the contact form. Then our admin will delete your account permanently",
    },
    {
      title: "How can I change or reset my password?",
      content:
        "If you want to change your password you can simply do it by reset password page. You will find a button for change password in navbar's profile avatar",
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
