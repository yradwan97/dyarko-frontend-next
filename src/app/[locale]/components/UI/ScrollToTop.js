'use client'
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import scrollToTop from "../../utils/scrollToTop";

const ScrollToTop = () => {
  const { pathname } = usePathname();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
