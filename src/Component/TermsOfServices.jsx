// src/components/TermsOfServices.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.svg";

function TermsOfServices() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last Updated: 31/10/2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8 animate-fadeIn animation-delay-200">
          <p className="leading-relaxed">
            Welcome to our platform — a <strong>student-led initiative</strong> created solely to help college students connect with each other for the purpose of buying and selling pre-owned items. By accessing or using this website, you agree to the following Terms of Service. Please read them carefully before using the platform.
          </p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">1. Nature of the Platform</h2>
            <p className="leading-relaxed">
              This website functions <strong>only as a listing and communication platform</strong> between students who wish to sell or buy used products within their college community. We do not own, control, verify, or endorse any product listed on this platform. All items, descriptions, prices, and conditions are entirely managed by the users who post them. We are not a reseller, broker, or agent of any user. Our role is limited to displaying listings and enabling users to connect directly.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">2. No Financial Transactions</h2>
            <p className="leading-relaxed">
              This platform does <strong>not provide any payment gateway or online transaction system , we don't provide delivery services</strong>. Any exchange of money, product delivery, or negotiation happens directly between the buyer and the seller, outside our control. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payments made between users.</li>
              <li>Quality, condition, or authenticity of products.</li>
              <li>Non-delivery, damage, or disputes arising out of any transaction.</li>
            </ul>
            <p className="leading-relaxed">
              All financial or material transactions are <strong>strictly at the users’ own risk and discretion</strong>.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">3. User Responsibility</h2>
            <p className="leading-relaxed">
              Users are <strong>solely responsible</strong> for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The accuracy of the information and prices they post.</li>
              <li>The legitimacy and ownership of the items they list.</li>
              <li>Ensuring that the items comply with applicable college and legal policies.</li>
            </ul>
            <p className="leading-relaxed">
              We do not verify or guarantee the correctness of user-submitted data, including product details, availability, or seller identity.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">4. Communication Between Users</h2>
            <p className="leading-relaxed">
              The platform may display contact details (such as phone numbers) provided voluntarily by sellers. Any communication, negotiation, or meeting between users takes place <strong>independently and outside the control of the platform</strong>. We are not responsible for any conversations, agreements, or personal exchanges that occur between users. Users are advised to exercise caution, discretion, and basic safety practices while interacting with others.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">5. Prohibited Items and Content</h2>
            <p className="leading-relaxed">
              We <strong>strictly prohibit</strong> listings or content that are vulgar, sexually explicit, promote self-harm, or involve illegal goods or services. Examples include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Explicit sexual content or nudity intended for sexual arousal.</li>
              <li>Items or instructions that facilitate self-harm or suicide.</li>
              <li>Stolen goods, counterfeit goods, illegal drugs, weapons, or any products/services that violate local or national laws.</li>
              <li>Content that promotes hate speech, violence, or other unlawful activities.</li>
            </ul>
            <p className="leading-relaxed">
              We reserve the <strong>absolute right</strong> (at our sole discretion) to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remove or disable access to any listing, content, or user account that violates these rules.</li>
              <li>Suspend or terminate user accounts without prior notice.</li>
              <li>Report illegal or potentially dangerous activity to law enforcement or relevant authorities.</li>
            </ul>
            <p className="leading-relaxed">
              Removal, suspension, or reporting may occur <strong>without prior notice</strong> and we shall not be liable for any loss, damage, or claim arising from such action.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">6. Privacy & Data Use</h2>
            <p className="leading-relaxed">
              We value user privacy.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The phone numbers or contact details submitted by users are displayed only for connecting buyers and sellers.</li>
              <li>We do not sell, share, or distribute this data to any third party.</li>
              <li>We do not use personal data for marketing, tracking, or analytics purposes.</li>
            </ul>
            <p className="leading-relaxed">
              By using this platform, users consent to the limited use of their data strictly for display within the listings they create and for necessary operational purposes. We may disclose user information if required by law or to prevent imminent harm.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">7. Platform Liability</h2>
            <p className="leading-relaxed">
              We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The information provided by users is accurate or complete, or</li>
              <li>The platform will operate without errors, downtime, or data loss.</li>
            </ul>
            <p className="leading-relaxed">
              We hold <strong>no liability</strong> for any direct, indirect, incidental, or consequential loss arising from the use of this website, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fraudulent activities by other users.</li>
              <li>Loss of data, goods, or money.</li>
              <li>Misuse of contact details.</li>
              <li>Any misunderstanding or dispute between buyers and sellers.</li>
            </ul>
            <p className="leading-relaxed">
              By using the platform, you agree that we are <strong>not legally or financially responsible</strong> for any such issue.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">8. User Conduct</h2>
            <p className="leading-relaxed">
              Users agree <strong>not to</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Post false, misleading, or illegal listings.</li>
              <li>List prohibited, stolen, or counterfeit items.</li>
              <li>Post vulgar, explicit, or self-harm promoting content.</li>
              <li>Harass or misuse the contact details of other users.</li>
              <li>Attempt to hack, spam, or damage the platform’s integrity.</li>
            </ul>
            <p className="leading-relaxed">
              Violation of these terms may lead to removal of listings, account suspension, or permanent termination.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">9. Content Ownership</h2>
            <p className="leading-relaxed">
              All content uploaded by users (product images, descriptions, etc.) remains their property. However, by posting on this platform, users grant us a <strong>non-exclusive right</strong> to display their content for the purpose of facilitating listings and for platform operations.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">10. Modifications to the Terms</h2>
            <p className="leading-relaxed">
              We may update or modify these Terms of Service at any time without prior notice. Users are encouraged to review this page periodically to stay informed of any changes. <strong>Continued use of the platform after changes are posted constitutes acceptance of those changes.</strong>
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">11. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and interpreted in accordance with the <strong>laws of India</strong>. Any disputes arising from the use of this platform shall be subject to the exclusive jurisdiction of the courts located in <strong>New Delhi</strong>.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">12. Disclaimer</h2>
            <p className="leading-relaxed">
              The platform is provided on an <strong>“as-is” basis</strong>, without any warranties of any kind — express or implied. We do not warrant that the platform will be error-free, secure, or continuously available. By using the website, you acknowledge that the platform serves <strong>only as a medium of connection</strong>, not as a participant, guarantor, or mediator in any transaction.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">13. Contact</h2>
            <p className="leading-relaxed">
              If you have any concerns or questions about these Terms of Service, or to report prohibited content or listings, you may contact us at:
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

export default TermsOfServices;