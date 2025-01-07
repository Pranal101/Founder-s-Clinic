"use client";
import Link from "next/link";
import {
  candidateItems,
  employerItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { use } from "react";

const HeaderNavContent = () => {
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } `}
          >
            <Link href="/">
              <span>Home</span>
            </Link>

            {/* <div className="mega-menu">
              <div className="mega-menu-bar row pt-0">
                {homeItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, usePathname())
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </li>
          {/* End homepage menu items */}
          {/* 
          <li
            className={`${
              isActiveParent(findJobItems, usePathname()) ? "current" : ""
            } `}
            id="has-mega-menu"
          >
            <span>Find Jobs</span>
            <div className="mega-menu">
              <div className="mega-menu-bar row">
                {findJobItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <h3>{item.title}</h3>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, usePathname())
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li> */}
          {/* Find Jobs */}
          {/* <li
            className={
              usePathname()?.includes("/employers-dashboard") ? "current" : ""
            }
          >
            <Link href="/job-list-v3">Find Jobs</Link>
          </li> */}
          {/* End findjobs menu items */}
          <li
            className={
              usePathname()?.includes("/employers-dashboard") ? "current" : ""
            }
          >
            <Link href="/employers-dashboard/dashboard">Enterprises</Link>
          </li>
          {/* <li
            className={`${
              isActiveParent(employerItems, usePathname()) ||
              usePathname()?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Enterprises</span>
            <ul>
              <li
                className={
                  usePathname()?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link href="/employers-list-v3">Enterprise List</Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link href="/employers-single-v1/1">Enterprise Single</Link>
              </li> */}
          {/* {employerItems.map((item) => (
                <li className="current" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, usePathname())
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, usePathname())
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))} */}
          {/* <li
                className={
                  usePathname()?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link href="/employers-dashboard/dashboard">
                  Enterprise Dashboard
                </Link>
              </li>
            </ul>
          </li> */}
          {/* End Employers menu items */}

          {/* <li
            className={`${
              isActiveParent(candidateItems, usePathname()) ||
              usePathname()?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Professionals</span>
            <ul>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-list-v3">Professionals List</Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-single-v1/1">Professionals Single</Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-dashboard/dashboard">
                  Professionals Dashboard
                </Link>
              </li>
            </ul>
          </li> */}
          <li
            className={
              usePathname()?.includes("/candidates-dashboard") ? "current" : ""
            }
          >
            <Link href="/candidates-dashboard/dashboard">Professionals</Link>
          </li>
          {/* End Candidates menu items */}
          {/* Intern Menu */}
          <li
            className={
              usePathname()?.includes("/candidates-dashboard") ? "current" : ""
            }
          >
            <Link href="/candidates-dashboard/dashboard">Interns</Link>
          </li>
          {/* <li
            className={`${
              isActiveParent(candidateItems, usePathname()) ||
              usePathname()?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Intern</span>
            <ul>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-list-v3">Intern List</Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-single-v1/1">Intern Single</Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-dashboard/dashboard">
                  Intern Dashboard
                </Link>
              </li>
            </ul>
          </li> */}
          <li
            className={
              usePathname()?.includes("/investors-dashboard") ? "current" : ""
            }
          >
            <Link href="/investors-dashboard/dashboard">Investors</Link>
          </li>
          <li
            className={
              usePathname()?.includes("/networking-dashboard") ? "current" : ""
            }
          >
            <Link href="/networking-dashboard/dashboard">
              Networking Communities
            </Link>
          </li>
          {/* <li
            className={`${
              isActiveParentChaild(blogItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, usePathname()) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Blog menu items */}

          <li
            className={`${
              isActiveParentChaild(pageItems, usePathname()) ||
              isActiveParentChaild(shopItems[0].items, usePathname())
                ? "current "
                : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={`${
                      isActiveParentChaild(shopItems[0].items, usePathname())
                        ? "current "
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, usePathname())
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, usePathname()) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
