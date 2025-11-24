import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your service coverage?",
      answer:
        "We provide services across multiple regions including Dhaka, Chittagong, and more.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order using the tracking number on our website or mobile app.",
    },
    {
      question: "What are your customer support hours?",
      answer:
        "Our support team is available 24/7 to assist you with any queries.",
    },
    {
      question: "How do I make a complaint?",
      answer:
        "You can submit a complaint via our contact form or email support@example.com.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-base-200 rounded-lg shadow"
          >
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-xl font-medium cursor-pointer">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
