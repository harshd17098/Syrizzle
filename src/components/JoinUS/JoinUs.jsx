import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
const JoinUs = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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
            onClick={() => setOpenModal(true)}
            className="text-white border border-white hover:bg-blue-400 text-xs px-9 py-1.5 rounded-lg transition bg-transparent"
            style={{ fontWeight: "600", fontSize: "13px" }}
          >
            Verify Now
          </button>

          {/* Flowbite Modal */}
          <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]">
              <div className="relative bg-white rounded-lg shadow-lg  w-full max-w-md">
                <ModalHeader
                  style={{ position: "absolute", top: "12px", right: "12px", color: "gray" }}
                />
                <ModalBody>
                  <div className="flex flex-col items-center text-center space-y-4" style={{ gap: "16px" }}>
                    <div className="  flex items-center justify-center">
                      <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/get-verified-background.svg" style={{ width: "160px", height: "160px" }} alt="" />
                    </div>

                    <h2 className="text-xl font-semibold">Get verified on dubizzle!</h2>
                    <p className=" text-black-600" style={{ display: "flex", alignItems: "center", marginTop: "0px", fontSize: "16px", fontWeight: "400" }}>
                      Build Trust <div style={{ backgroundColor: "rgb(35, 38, 42)", width: "6px", height: "6px", borderRadius: "50%", marginLeft: "5px", marginRight: "5px" }}></div> Gain Visibility <div style={{ backgroundColor: "rgb(35, 38, 42)", width: "6px", height: "6px", borderRadius: "50%", marginLeft: "5px", marginRight: "5px" }}></div> Unlock Rewards
                    </p>
                    <div style={{
                      margin: "0px",
                      flexShrink: "0",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      height: "1px", // Add height
                      width: "100%"  // Optional, for full width
                    }}></div>                <div className="space-y-4 w-full text-left" style={{ paddingLeft: "10px" }}>
                      <div className="flex " style={{ flexDirection: "row", gap: "16px", alignItems: "center" }}>
                        <div className="" style={{ display: "flex", flexDirection: "column", width: "55px", height: "55px", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(208, 221, 240, 0.38)", borderRadius: "9px" }}>
                          <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/quick-verification.svg" alt="" style={{ boxSizing: "content-box", border: "0px" }} />
                        </div>
                        <div>
                          <p className="font-medium">Quick & Simple</p>
                          <p className="text-sm text-gray-500">
                            It only takes a few minutes
                          </p>
                        </div>
                      </div>

                      <div className="flex" style={{ flexDirection: "row", gap: "16px", alignItems: "center" }}>
                        <div className="" style={{ display: "flex", flexDirection: "column", width: "55px", height: "55px", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(208, 221, 240, 0.38)", borderRadius: "9px" }}>
                          <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/encrypted.svg" alt="" style={{ boxSizing: "content-box", border: "0px" }} />
                        </div>
                        <div>
                          <p className="font-medium">Secure</p>
                          <p className="text-sm text-gray-500">
                            Your ID information stays private
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full text-left px-2">
                      <a
                        href="#"
                        className="text-blue-600 text-sm hover:text-blue-400"
                      >
                        Learn more of verification on dubizzle
                      </a>
                    </div>
                    <div style={{
                      margin: "0px",
                      flexShrink: "0",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      height: "1px", // Add height
                      width: "100%"  // Optional, for full width
                    }}></div> 
                    <div className="flex justify-end w-full space-x-3 pt-4">
                      <button
                        onClick={() => setOpenModal(false)}
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                      >
                        Later
                      </button>
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center">
                        Get Verified
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </ModalBody>
              </div>
            </div>
          </Modal>









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
