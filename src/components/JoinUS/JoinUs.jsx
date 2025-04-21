import { useState } from "react";

const JoinUs = () => {
    const [showBanner, setShowBanner] = useState(true);

    if (!showBanner) return null;

    return (
        <div
  id="joinUsBanner"
  className="flex items-center bg-blue-500 text-white p-4  shadow-md w-full flex-row items-center justify-center gap-4 min-h-[50px] px-2 py-2 cursor-pointer relative z-40"
>
  <div className="flex items-center justify-center">
    <img
      src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/verified-white.svg"
      alt="verified"
      className="w-6 h-6 mr-6"
    />

    <div className="flex items-center space-x-4">
      <p className="text-[16px] mb-0">
        Join us in building a safer community. Get verified to boost your credibility and assist us in creating trust amongst our users!
      </p>
      <button
  type="button"
  className="text-white border border-white hover:bg-blue-400 text-xs px-9 py-1.5 rounded-lg transition bg-transparent" style={{fontWeight:"600",fontSize:"13px"}}
>
        Verify Now
      </button>
    </div>
  </div>

  {/* Close Button */}
  <button
    id="closeButton"
    type="button"
    onClick={() => setShowBanner(false)}
    className="ml-4 p-2 hover:bg-white/20 rounded-full transition absolute right-4"
  >
    <img
      src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/close-white.svg"
      alt="Close"
      className="w-4 h-4"
    />
  </button>
</div>
    );
};

export default JoinUs;
