import React from "react";

const Loading = () => {
  return (
    <>
      <style jsx>{`
        .loader-container {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          // backdrop-filter: blur(8px);
          // background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader {
          border: 16px solid #f3f3f3;
          border-top: 16px solid #3498db;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loading;
