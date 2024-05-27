import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import Button from "../Button";
import ChevronDown from "../../UI/icons/ChevronDown";
import { useTranslations } from "next-intl";

const Navbar = (props: any) => {
  const { pathname } = props;
  const t = useTranslations("Navbar");
  const navLinks = [
    { to: "/property-listing/rent", text: "rent" },
    { to: "/property-listing/buy", text: "buy", hasSubMenu: true },
    { to: "/property-listing/share", text: "shared" },
    { to: "/property-listing/replacement", text: "replacement" },
    { to: "/categories", text: "categories" },
    { to: "/companies", text: "companies" },
    { to: "/videos", text: "videos" },
  ];
  let linkStyle =
    "capitalize text-base font-medium text-black !px-1 !py-2 hover:bg-gray-200 hover:shadow-md rounded-lg";
  let activeClass = `${linkStyle} !text-main-600 !font-bold bg-main-100`;

  let buyLinksArray = [
    { link: "/property-listing/cash", name: "cash" },
    { link: "/property-listing/installment", name: "installment" },
  ];

  const [activeSubMenu, setActiveSubMenu] = useState<null | string>(null);
  const [buyMenuAnchor, setBuyMenuAnchor] = useState<null | HTMLElement>(null);

  const determinePathName = (path: string) => {
    return path.split("/")[2] ? path.split("/")[2] : path.split("/")[1];
  };

  const handleSubMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    submenuKey: string
  ) => {
    setActiveSubMenu(submenuKey);
    setBuyMenuAnchor(null);

    if (submenuKey === "buy") {
      setBuyMenuAnchor(event.currentTarget);
    }
  };

  const handleSubMenuClose = () => {
    setActiveSubMenu(null);
  };

  return (
    <>
      {navLinks.map((navLink, i) => (
        <div key={i} className="m-2 w-auto flex justify-center">
          {navLink.hasSubMenu ? (
            <>
              <div
                id={navLink.text}
                onClick={(e) => handleSubMenuOpen(e, navLink.text)}
                className={
                  [
                    "/property-listing/cash",
                    "/property-listing/installment",
                  ].indexOf(pathname) > -1
                    ? activeClass
                    : linkStyle
                }
              >
                <div className="flex items-center justify-center w-auto">
                  {t(navLink.text)}
                  {navLink.hasSubMenu && (
                    <ChevronDown className="w-2.5 h-2.5 ml-2 stroke-black" />
                  )}
                </div>
              </div>
              {activeSubMenu === navLink.text && (
                <Menu
                  anchorEl={buyMenuAnchor}
                  open={Boolean(buyMenuAnchor)}
                  onClose={handleSubMenuClose}
                >
                  {navLink.text === "buy" &&
                    buyLinksArray.map((link: any, index: number) => (
                      <MenuItem
                        key={index}
                        className="px-1 py-2 relative capitalize rounded-lg hover:bg-gray-200 hover:shadow-md z-[9999]"
                      >
                        <Link href={link.link} replace>
                          {t(link.name)}
                        </Link>
                      </MenuItem>
                    ))}
                </Menu>
              )}
            </>
          ) : (
            <Link
              id={navLink.text}
              href={navLink.to}
              key={i}
              className={
                determinePathName(pathname) === determinePathName(navLink.to)
                  ? activeClass
                  : linkStyle
              }
              replace
            >
              {t(navLink.text)}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default Navbar;
