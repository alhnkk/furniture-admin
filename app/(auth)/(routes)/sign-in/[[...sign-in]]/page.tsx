import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sol taraf - Giriş Formu */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Cool gradient arka plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-700/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500" />
        </div>

        {/* Form container */}
        <div className="relative z-10 w-full max-w-md p-8">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 font-semibold",
                card: "bg-white/95 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-8",
                headerTitle: "text-2xl font-bold text-gray-900 mb-2",
                headerSubtitle: "text-gray-600 mb-6",
                formFieldInput:
                  "border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg",
                formFieldLabel: "text-gray-700 font-medium",
                socialButtonsBlockButton:
                  "border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200",
                socialButtonsBlockButtonText: "text-gray-700 font-medium",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500",
                footerActionLink:
                  "text-purple-600 hover:text-purple-700 font-medium",
                identityPreviewText: "text-gray-600",
                identityPreviewEditButton:
                  "text-purple-600 hover:text-purple-700",
              },
              layout: {
                logoImageUrl: "/logo.png",
                showOptionalFields: true,
              },
              variables: {
                colorPrimary: "#7c3aed",
                colorText: "#374151",
                colorTextSecondary: "#6b7280",
                colorBackground: "#ffffff",
                colorInputBackground: "#ffffff",
                colorInputText: "#374151",
              },
            }}
            redirectUrl="/admin"
          />
        </div>
      </div>

      {/* Sağ taraf - Banner Resmi */}
      <div className="flex-1 relative hidden lg:block ">
        <Image
          src="/banner.jpeg"
          alt="Derya Mimarlık Tasarım Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-900/20" />
      </div>
    </div>
  );
};

export default Page;
