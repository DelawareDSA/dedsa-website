import { MailIcon, MapPinIcon, PhoneIcon } from '@/core/components/ui/Icons';
import type {
  ContactInfo as ContactInfoType,
  ContactPageContent,
} from '@/core/types/pages/contact';

interface ContactInfoProps {
  contactInfo: ContactInfoType;
  sections: ContactPageContent['sections'];
}

export default function ContactInfo({
  contactInfo,
  sections,
}: ContactInfoProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{sections.getInTouch.title}</h2>

      <div className="space-y-4">
        <div className="flex items-start">
          <MailIcon className="h-6 w-6 text-dsa-red mr-3 mt-1" />
          <div>
            <p className="font-semibold">
              {sections.getInTouch.contactTypes.email.label}
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-dsa-red hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        {contactInfo.phone && sections.getInTouch.contactTypes.phone && (
          <div className="flex items-start">
            <PhoneIcon className="h-6 w-6 text-dsa-red mr-3 mt-1" />
            <div>
              <p className="font-semibold">
                {sections.getInTouch.contactTypes.phone.label}
              </p>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-dsa-red hover:underline"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
        )}

        {contactInfo.mailingAddress &&
          sections.getInTouch.contactTypes.mailingAddress && (
            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-dsa-red mr-3 mt-1" />
              <div>
                <p className="font-semibold">
                  {sections.getInTouch.contactTypes.mailingAddress.label}
                </p>
                <p className="whitespace-pre-line">
                  {contactInfo.mailingAddress}
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
