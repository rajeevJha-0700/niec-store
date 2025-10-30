// src/components/PrivacyPolicy.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.svg";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header with Logo + NEVEROLD */}
        <div className="text-center space-y-6 animate-fadeIn">
          <img
            src={logo}
            alt="NEVEROLD Logo"
            className="h-20 w-20 md:h-24 md:w-24 mx-auto object-contain"
          />
          <div className="inline-flex items-center text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight transition-all duration-300 group">
            <span className="text-red-600 group-hover:drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)] transition-all duration-300">
              NEVER
            </span>
            <span className="text-gray-900 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300">
              OLD
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last Updated: 31/10/2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8 animate-fadeIn animation-delay-200">
          <p className="leading-relaxed">
            This Privacy Policy explains how we collect, use, and protect the personal information of users who access or use our platform — a <strong>student-to-student marketplace</strong> built for buying and selling pre-owned items within the college community. By using this website, you agree to the terms outlined below.
          </p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect <strong>only the minimum information necessary</strong> to operate the platform and connect users. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and contact details (e.g., phone number) voluntarily provided by the user while creating a product listing or profile.</li>
              <li>Product details such as name, price, description, and images uploaded by users.</li>
            </ul>
            <p className="leading-relaxed">
              We <strong>do not collect or store</strong> sensitive information such as passwords (managed by Supabase Auth), payment information, bank details, or government-issued IDs.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">2. How We Use the Information</h2>
            <p className="leading-relaxed">
              We use the collected data <strong>only</strong> for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To display listings publicly on the website for buyer-seller communication.</li>
              <li>To allow users to connect with each other using provided contact information.</li>
              <li>To maintain platform functionality, improve performance, and ensure user safety.</li>
              <li>To comply with applicable laws or respond to legal requests when required.</li>
            </ul>
            <p className="leading-relaxed">
              We <strong>do not use personal data</strong> for targeted advertising, analytics, or any commercial marketing purposes.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">3. Data Visibility and Sharing</h2>
            <p className="leading-relaxed">
              The phone number and product information you submit while listing an item are <strong>publicly visible</strong> on the website so that interested buyers can contact you.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>We <strong>do not share, sell, or rent</strong> user data to any third party.</li>
              <li>We may disclose limited user data <strong>only when required by law</strong> or to comply with a legal investigation, court order, or law enforcement request.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">4. Data Storage and Security</h2>
            <p className="leading-relaxed">
              All data is securely stored 
            </p>
            <p className="leading-relaxed">
              Although we follow industry-standard practices, <strong>no system is 100% secure</strong>, and users are encouraged not to share unnecessary personal details publicly.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">5. User Responsibility</h2>
            <p className="leading-relaxed">
              Users are responsible for the accuracy and appropriateness of the data they share, including phone numbers, images, and product details.
            </p>
            <p className="leading-relaxed">
              Any personal information voluntarily made public (such as in product listings) may be visible to other users, and <strong>we cannot control how others use that information</strong>.
            </p>
            <p className="leading-relaxed">
              Users should <strong>avoid sharing private or sensitive data</strong> in public listings or messages.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">6. Handling of Inappropriate or Illegal Content</h2>
            <p className="leading-relaxed">
              If any listing, image, or message contains vulgar, harmful, or illegal material, we reserve the <strong>full right</strong> to remove or disable access to such content.
            </p>
            <p className="leading-relaxed">
              Upon receiving any report or complaint, we will act <strong>promptly</strong> to take down the offending material and may suspend or terminate the responsible account.
            </p>
            <p className="leading-relaxed">
              We may also report such cases to <strong>appropriate college authorities or law enforcement</strong> if required.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">7. Data Retention</h2>
            <p className="leading-relaxed">
              We retain user information <strong>only for as long as necessary</strong> to operate the platform and fulfill its purpose.
            </p>
            <p className="leading-relaxed">
              When a user deletes their listing or account, associated data may be removed or anonymized within a reasonable period unless legally required to retain it.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">8. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              Our website may use <strong>basic cookies or browser storage</strong> only to maintain login sessions and improve functionality.
            </p>
            <p className="leading-relaxed">
              We <strong>do not use</strong> tracking cookies, analytics cookies, or third-party advertising trackers.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">9. Third-Party Services</h2>
            <p className="leading-relaxed">
              The platform may integrate limited third-party.
            </p>
            <p className="leading-relaxed">
              These services may process user data according to their own privacy policies, which operate independently of ours.
            </p>
            <p className="leading-relaxed">
              We are <strong>not responsible</strong> for how such third-party platforms handle data beyond what is necessary for platform operation.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">10. Your Rights</h2>
            <p className="leading-relaxed">
              As a user, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access and review the personal information you have provided.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw your consent by deleting your account or contacting us.</li>
            </ul>
            <p className="leading-relaxed">
              To exercise these rights, contact us using the email provided below.
            </p>
          </div>

          <div className="space-y-6">
           
            <p className="leading-relaxed">
              We <strong>do not knowingly collect or display</strong> personal data of minors.
            </p>
            <p className="leading-relaxed">
              If you believe that a minor’s information has been uploaded, please contact us immediately so that we can remove it.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">12. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update or modify this Privacy Policy from time to time. Any changes will be reflected on this page with an updated “Last Updated” date.
            </p>
            <p className="leading-relaxed">
              <strong>Continued use of the platform after changes means you accept the revised policy.</strong>
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">13. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions, requests, or complaints about this Privacy Policy, you can reach us at:
            </p>
            <a href="mailto:theneverold.shop@gmail.com" className="font-semibold text-red-600">
              theneverold.shop@gmail.com
            </a>
            <p className="font-bold text-gray-800">Neverold</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-8 animate-fadeIn animation-delay-400">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

    </section>
  );
}

export default PrivacyPolicy;