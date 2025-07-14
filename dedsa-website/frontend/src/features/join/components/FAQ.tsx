import faqData from '@/core/content/pages/join.json';
import { FAQContent } from '@/features/join/types';

const typedContent = faqData.faq as FAQContent;

export default function FAQ() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold mb-6">{typedContent.heading}</h2>

      <div className="space-y-6">
        {typedContent.questions.map((item, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mb-2">{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
