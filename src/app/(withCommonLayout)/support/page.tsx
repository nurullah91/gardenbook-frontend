import ContactForm from "@/src/components/form/ContactForm";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Metadata } from "next";
import FAQAccordion from "@/src/components/Accordion/FAQAccordion";
import Image from "next/image";
import FAQImage from "@/src/assets/Question.png";
import contactImage from "@/src/assets/contactImage.png";

export const metadata: Metadata = {
  title: "Support",
  description: "Support and details of contact information",
};
export default function SupportPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-end mb-6 px-2">Help center</h2>
      <div className="px-2 mb-6">
        <h3 className="text-2xl font-bold">
          Need Help? We&apos;re Here for You!
        </h3>
        <p className="w-full max-w-[800px]">
          We&apos;re committed to providing the best experience possible. Check
          out our FAQs for quick answers, share your feedback to help us
          improve, or use the form below to get in touch with our team. Connect
          with us on social media for updates and more!
        </p>
      </div>

      {/* FAQ */}
      <div className="flex lg:flex-row flex-col-reverse gap-4 justify-between items-center">
        <div className="w-full lg:w-2/3">
          <FAQAccordion />
        </div>
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <h3 className="font-bold text-xl">Frequently Asked Questions</h3>
          <p>Find answers to common questions and solve issues instantly</p>
          <Image
            src={FAQImage}
            alt="FAQ Image"
            width={500}
            className="w-full max-w-[500px] mx-auto"
          />
        </div>
      </div>

      {/* Contact form section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Image
          src={contactImage}
          alt="Contact Image"
          width={500}
          className="w-full max-w-[500px] mx-auto"
        />
        <ContactForm />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 mb-12 w-full">
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-md text-gray-600">
            Email:{" "}
            <a
              href="mailto:info@example.com"
              className="text-blue-500 hover:underline transition ease-in-out duration-200"
            >
              info@example.com
            </a>
          </p>
          <p className="text-md text-gray-600">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-blue-500 hover:underline transition ease-in-out duration-200"
            >
              +1 (234) 567-890
            </a>
          </p>
          <p className="text-md text-gray-600">
            Address: 1234 Example St, City, Country
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">Business Hours</h3>
          <ul className="text-md text-gray-600">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2 text-center">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://www.facebook.com/nurullahbhuiyan91"
              className="text-blue-500 hover:text-blue-700 transition ease-in-out duration-200"
            >
              <FaFacebook className="text-3xl" />
            </Link>
            <Link href="https://twitter.com/BMNurullah">
              <FaSquareXTwitter className="text-3xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nurullahbhuiyan91/"
              className="text-blue-500 hover:text-blue-700 transition ease-in-out duration-200"
            >
              <FaLinkedin className="text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
