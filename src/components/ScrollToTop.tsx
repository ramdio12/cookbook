import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scroll = document.documentElement.scrollTop;

    if (scroll >= 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div>
      <button
        className="fixed right-4 bottom-4 h-8 w-6 bg-red-600 text-white "
        style={{ display: visible ? "inline" : "none" }}
        onClick={scrollTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default ScrollToTop;
