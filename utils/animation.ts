import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  // const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");

  if (bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerTwo, bannerThree, bannerFour], {
      opacity: 1,
      display: "block",
      filter: "backdrop-filter: blur(15px)",
    }).to([bannerTwo, bannerThree, bannerFour], {
      opacity: 0,
      display: "none",
      filter: "backdrop-filter: blur(0px)",
      stagger: 0.2,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  // const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");

  if (bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerTwo, bannerThree, bannerFour], {
      opacity: 0,
      display: "none",
      filter: "backdrop-filter: blur(0px)",
    }).to([bannerTwo, bannerThree, bannerFour], {
      opacity: 1,
      display: "block",
      filter: "backdrop-filter: blur(15px)",
      stagger: 0.2,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
