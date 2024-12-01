import React, { useCallback, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const ProjectModal = ({ children }) => {
  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const onDismiss = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleClick = useCallback(
    (event) => {
      if (event.target === overlayRef.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlayRef]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80"
      onClick={handleClick}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <img src="/close.svg" width={17} height={17} alt="close" />
      </button>

      <div
        ref={wrapperRef}
        className="flex justify-start items-center flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default ProjectModal;
