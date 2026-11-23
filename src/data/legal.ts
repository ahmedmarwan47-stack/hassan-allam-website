/**
 * Legal pages, migrated word for word from hap.com.eg (/legals/privacy-policy
 * and /legals/terms-of-use, 22 Nov 2026). The live privacy policy was pasted
 * from a PDF, one line per paragraph; here the lines are rejoined into their
 * sentences and its lists set as lists. Nothing is reworded.
 *
 * Note for the client: the live "Privacy policy" covers the HAP Business App
 * (the employees' CRM app) and says it "does not cover the HAP public
 * website". A website privacy policy is still to come from HAP.
 */

/** A paragraph, a bulleted list, or a list whose items open with a bold lead. */
export type LegalBlock =
  | string
  | { list: string[] }
  | { terms: { lead: string; text: string }[] };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  slug: "privacy-policy" | "terms-of-use";
  /** Hero headline lines. */
  title: [string, string];
  /** Page <title> part. */
  metaTitle: string;
  description: string;
  /** Title of the document itself, above the intro (privacy only). */
  docTitle?: string;
  updated?: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDoc = {
  slug: "privacy-policy",
  title: ["Privacy", "Policy"],
  metaTitle: "Privacy Policy",
  description: "How Hassan Allam Properties handles information in the HAP Business App.",
  docTitle: "Privacy Policy HAP Business App",
  updated: "Last updated: 21 October 2026",
  intro: [
    'This Privacy Policy explains how Hassan Allam Properties ("HAP", "we", "us") handles information in the HAP Business App, a mobile application for HAP employees to work with HAP\'s (CRM) customer relationship management system on Salesforce.',
    "The app is intended only for HAP employees. It is not directed at children, and it is not for use by the general public.",
    "This policy applies only to the mobile app. It works together with HAP's general Terms of Use published on hap.com.eg, and it does not cover the HAP public website, which has its own terms and cookies.",
  ],
  sections: [
    {
      id: "who-is-responsible",
      heading: "1. Who is responsible for your data",
      blocks: [
        "The data in the app belongs to HAP and is stored in HAP's Salesforce organization. HAP is the data controller. Salesforce, Microsoft and Google (see section 6) act as service providers that process data on HAP's behalf and under HAP's instructions. The app itself is only an interface to HAP's systems and does not have its own separate database.",
      ],
    },
    {
      id: "information-the-app-handles",
      heading: "2. Information the app handles",
      blocks: [
        {
          terms: [
            {
              lead: "Account and sign-in data.",
              text: 'You sign in on the official Salesforce login page (OAuth). The app never sees or stores your password. If you choose "Stay logged in", a refresh token is stored encrypted on your device (Android Keystore / iOS Keychain) so you do not have to sign in every time.',
            },
            {
              lead: "CRM business data.",
              text: "Leads, opportunities, accounts, buyers, units and bookings, activities (calls, meetings, call-backs), files, and private Chatter messages. The app only shows and changes what your own Salesforce permissions allow.",
            },
            {
              lead: "Identity documents of prospects and buyers.",
              text: "When you scan a passport or Egyptian national ID, the app reads the text from the document, fills in the ID type, number, issue date and expiry date, and can attach the scanned photos to the related Salesforce record.",
            },
            {
              lead: "Photos and files you choose.",
              text: "Photos taken with the document scanner, files you pick from your device, and images or files you attach to messages or records.",
            },
            {
              lead: "Notifications data.",
              text: "Push-notification device tokens (registered with Salesforce so that HAP can notify you), and a history of in-app notifications and reminders stored on your device for up to 7 days.",
            },
            {
              lead: "Technical data.",
              text: "Basic diagnostic information needed to operate the app, such as app version and error messages. We do not use advertising identifiers.",
            },
          ],
        },
      ],
    },
    {
      id: "how-scanning-works",
      heading: "3. How scanning works",
      blocks: [
        "Passports are read on your device (Google ML Kit document scanner and text recognition). The text does not leave the device for this step.",
        "Egyptian national ID cards are read using Microsoft Azure AI Vision (optical character recognition), operated under HAP's Azure subscription. The image of the ID is sent to this service only to extract the text, and the extracted details are returned to the app. HAP does not use these images for advertising or to train models.",
        "Scanned images that you choose to keep are stored on the Salesforce record, under HAP's access controls.",
      ],
    },
    {
      id: "device-permissions",
      heading: "4. Device permissions",
      blocks: [
        {
          terms: [
            { lead: "Camera / photo access:", text: "only when you scan a document or attach a photo." },
            { lead: "Notifications:", text: "to alert you to messages and to reminders about calls and meetings." },
            {
              lead: "Alarms and reminders (exact alarms):",
              text: "so that call and meeting reminders fire at the right time, including after the phone restarts.",
            },
            {
              lead: "Network access:",
              text: "to communicate with Salesforce and, for national ID scanning, Azure AI Vision.",
            },
            {
              lead: "Biometrics / device lock:",
              text: "the app can ask for your fingerprint, face or device PIN to reopen after it has been in the background. This check is performed by your device's operating system. HAP does not receive or store your biometric data.",
            },
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      heading: "5. How we use information",
      blocks: [
        {
          list: [
            "To let HAP staff manage leads, opportunities, buyers and bookings and to communicate internally.",
            "To read identity document details and attach them to the correct customer record.",
            "To send notifications and reminders.",
            "To secure the app and to keep it working.",
          ],
        },
        "We do not sell personal data. The app contains no advertising and no third-party advertising or analytics trackers.",
      ],
    },
    {
      id: "who-we-share-with",
      heading: "6. Who we share information with",
      blocks: [
        "We share information only with the service providers below, which process it on HAP's behalf, and with other HAP employees who have access. Each provider also has its own privacy statement:",
        {
          list: [
            "Salesforce hosts HAP's CRM data and provides sign-in and push-notification registration. Salesforce Privacy Statement.",
            "Microsoft Azure performs text recognition on Egyptian national ID images, as described in section 3. Microsoft Privacy Statement.",
            "Google (Firebase Cloud Messaging and Google Play services) delivers push notifications to Android devices and provides the on-device document scanner. Google Privacy Policy.",
            "Apple delivers push notifications to iPhones, where the app is offered on iOS. Apple Privacy Policy.",
            "Other HAP employees, as determined by Salesforce roles and permissions.",
            "Authorities, where HAP is legally required to disclose information.",
          ],
        },
      ],
    },
    {
      id: "storage-security-retention",
      heading: "7. Storage, security and retention",
      blocks: [
        {
          list: [
            "Data is transmitted over encrypted connections (HTTPS).",
            "Sign-in tokens are stored in the device's secure storage. Signing out removes them from the device.",
            "Business data is retained in Salesforce according to HAP's internal retention policies. The app keeps only a small local cache and notification history on your device.",
            "HAP can revoke app access at any time from Salesforce, for example when an employee leaves.",
          ],
        },
      ],
    },
    {
      id: "your-choices-and-rights",
      heading: "8. Your choices and rights",
      blocks: [
        'You can sign out at any time, turn off notifications or the "Stay logged in" option in the app or device settings, and withdraw camera or photo permission in your device settings. Customers and other individuals whose data is held in HAP\'s systems may ask HAP to access, correct or delete their personal data, subject to applicable Egyptian data protection law and HAP\'s legal obligations. To do so, contact us using the details below.',
      ],
    },
    {
      id: "children",
      heading: "9. Children",
      blocks: ["The app is not intended for anyone under 18 and we do not knowingly collect data from children."],
    },
    {
      id: "changes-to-this-policy",
      heading: "10. Changes to this policy",
      blocks: [
        'We may update this policy from time to time. The "Last updated" date at the top shows the latest version. Material changes will be reflected in the app listing or on this page.',
      ],
    },
    {
      id: "contact-us",
      heading: "11. Contact us",
      blocks: [
        {
          terms: [
            { lead: "", text: "Hassan Allam Properties" },
            { lead: "Email:", text: "info@hap.com.eg" },
            { lead: "Phone:", text: "19172" },
            { lead: "Website:", text: "www.hap.com.eg" },
          ],
        },
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDoc = {
  slug: "terms-of-use",
  title: ["Terms", "of Use"],
  metaTitle: "Terms of Use",
  description: "The terms that govern access to and use of the services provided by Hassan Allam Properties.",
  sections: [
    {
      id: "purpose",
      heading: "Purpose",
      blocks: [
        "These Terms of Use (the “Terms”) govern access to and use of the services provided by HAP (the “Service”), available through its website, application, or any related platform.",
      ],
    },
    {
      id: "acceptance-of-the-terms",
      heading: "Acceptance of the Terms",
      blocks: [
        "By accessing or using the Service, the user acknowledges having read, understood, and agreed to be bound by these Terms.",
        "If the user does not agree with all or part of the Terms, they must refrain from using the Service.",
      ],
    },
    {
      id: "access-to-the-service",
      heading: "Access to the Service",
      blocks: [
        "The Service is accessible to users with an internet connection.",
        "HAP reserves the right to suspend, restrict, or interrupt access to the Service at any time, including for maintenance or force majeure, without liability.",
      ],
    },
    {
      id: "user-account",
      heading: "User Account",
      blocks: [
        "Certain features may require the creation of a user account.",
        "Users agree to provide accurate, current, and complete information and to keep their login credentials confidential.",
        "All activity carried out through a user account is deemed to be performed by the account holder.",
      ],
    },
    {
      id: "use-of-the-service",
      heading: "Use of the Service",
      blocks: [
        "Users agree to use HAP lawfully, responsibly, and in accordance with its intended purpose.",
        "Users must not:",
        {
          list: [
            "violate applicable laws or third-party rights,",
            "attempt unauthorized access to the Service or its systems,",
            "disrupt or interfere with the proper functioning of HAP.",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      blocks: [
        "All content available on HAP, including but not limited to text, graphics, logos, features, trademarks, and software, is protected by intellectual property laws.",
        "Any unauthorized reproduction, distribution, or use is strictly prohibited.",
      ],
    },
    {
      id: "personal-data",
      heading: "Personal Data",
      blocks: [
        "HAP processes users’ personal data in compliance with applicable data protection laws, including the GDPR where applicable.",
        "Details regarding data processing are provided in the Privacy Policy.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      blocks: [
        "HAP makes reasonable efforts to ensure the reliability of the Service but does not guarantee uninterrupted or error-free operation.",
        "HAP shall not be liable for any indirect, incidental, or consequential damages, including loss of data or business.",
      ],
    },
  ],
};
