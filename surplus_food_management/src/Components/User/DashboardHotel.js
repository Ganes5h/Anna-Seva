import React from "react";

function DashboardUser() {
  return (
    <>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  {/* Icon for Total Donations */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20.8,6H3.2C2.08,6,1,7.08,1,8.2v7.6C1,17.92,2.08,19,3.2,19h17.6c1.12,0,2.2-1.08,2.2-2.2V8.2C23,7.08,21.92,6,20.8,6z M21,15.8c0,0.67-0.53,1.2-1.2,1.2H3.2C2.53,17,2,16.47,2,15.8V8.2C2,7.53,2.53,7,3.2,7h16.6C20.47,7,21,7.53,21,8.2V15.8z M12,14c0.88,0,1.6-0.72,1.6-1.6S12.88,10.8,12,10.8S10.4,11.52,10.4,12.4S11.12,14,12,14z M7.2,8.8L10.4,11H6.8L5.6,8.8H7.2z M12,12.4c0.44,0,0.8-0.36,0.8-0.8S12.44,10.8,12,10.8s-0.8,0.36-0.8,0.8S11.56,12.4,12,12.4z M17.2,8.8h1.6l-1.2,2.2h-3.6L17.2,8.8z" />
                  </svg>

                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    2.7K
                  </h2>
                  <p className="leading-relaxed">Total Donations</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  {/* Icon for Number of times Donated */}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 10h18"></path>
                    <path d="M8 6h8M8 14h8M8 18h8"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    1.3K
                  </h2>
                  <p className="leading-relaxed">Number of times Donated</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  {/* Icon for Your Food Rating */}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l1.42 4.34h4.56l-3.69 2.68L15.44 18 12 14.27 8.56 18l1.1-4.98L6 6.34h4.56L12 2z"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    74
                  </h2>
                  <p className="leading-relaxed">Your Food Rating</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  {/* Icon for Places */}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    46
                  </h2>
                  <p className="leading-relaxed">Places</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DashboardUser;
