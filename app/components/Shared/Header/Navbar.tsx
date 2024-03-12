import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import Button from "../Button";
import ChevronDown from "../../UI/icons/ChevronDown";

const Navbar = (props: any) => {
  const { pathname } = props;

  const navLinks = [
    { to: "/property-listing/rent", text: "Rent" },
    { to: "/property-listing/buy", text: "Buy", hasSubMenu: true },
    { to: "/property-listing/share", text: "Shared" },
    { to: "/property-listing/replacement", text: "Replacement" },
    { to: "/categories", text: "Categories" },
    { to: "/companies", text: "Companies" },
    { to: "/videos", text: "Videos" },
  ];
  let linkStyle =
    "capitalize text-base font-medium text-black px-1 py-2 hover:bg-gray-200 hover:shadow-md rounded-lg";
  let activeClass = `${linkStyle} !text-main-600 !font-bold bg-main-100`;

  let buyLinksArray = [
    { link: "/property-listing/cash", name: "Cash" },
    { link: "/property-listing/installment", name: "Installment" },
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

    if (submenuKey === "Buy") {
      setBuyMenuAnchor(event.currentTarget);
    }
  };

  const handleSubMenuClose = () => {
    setActiveSubMenu(null);
  };

  return (
    <>
      {navLinks.map((navLink, i) => (
        <div key={i}>
          {navLink.hasSubMenu ? (
            <>
              <Button
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
                <div className="flex flex-row items-center justify-center">
                  {navLink.text}
                  {navLink.text === "Buy" && (
                    <ChevronDown className="w-2.5 h-2.5 ml-2 stroke-black" />
                  )}
                </div>
              </Button>
              {activeSubMenu === navLink.text && (
                <Menu
                  anchorEl={buyMenuAnchor}
                  open={Boolean(buyMenuAnchor)}
                  onClose={handleSubMenuClose}
                >
                  {navLink.text === "Buy" &&
                    buyLinksArray.map((link: any, index: number) => (
                      <MenuItem
                        key={index}
                        className="px-1 py-2 relative rounded-lg hover:bg-gray-200 hover:shadow-md z-[9999]"
                      >
                        <Link href={link.link} replace>
                          {link.name}
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
              {navLink.text}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default Navbar;
