"use client";

import { useDisclosure } from "@nextui-org/modal";
import GBModal from "../modal/GBModal";

export interface IContactFormProps {}
export default function ContactForm({}: IContactFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalOpen = () => {
    onOpen();
  };

  return (
    <div className="inline-block max-w-lg text-center justify-center">
      <GBModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Thank you for your message"
        footerCancelButtonText="Okay"
      >
        Thank you for sending your message to us. We&apos;ll contact to you
        letter.
      </GBModal>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-8">
          We&apos;d love to hear from you! Please fill out the form below and
          we&apos;ll get in touch with you shortly.
        </p>
        <div className="shadow-md shadow-blue-600/20 rounded p-6">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="message"
                name="message"
                rows={4}
                placeholder="Your Message"
              />
            </div>
          </form>
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600"
            onClick={handleModalOpen}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
