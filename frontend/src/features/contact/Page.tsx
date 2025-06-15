import type { ContactPageContent } from '@/core/types/pages/contact';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

type Props = ContactPageContent;

export default function ContactPage(props: Props) {
  const { heading, fallbackContactInfo, sections } = props;

  return (
    <div className="min-h-screen py-12 bg-dsa-red-t4">
      <div className="container-page">
        <h1 className="mb-8 text-4xl font-bold">{heading}</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <ContactInfo
              contactInfo={fallbackContactInfo}
              sections={sections}
            />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
