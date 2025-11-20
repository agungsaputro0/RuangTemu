import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "screen-default": "calc(100dvh - 4rem)",
        "screen-half": "calc(60vh - 4rem)",
      },
      width: {
        navMenu: "calc(var(--spacing) * 34)",
      },
      screens: {
        smweb: "772px",
      },
      colors: {
        mainColor: "#323483",
        mainColorHover: "#1b1c4eff",
        mainColorLite: "#9ea6f3ff",
        mainColorLitest: "#c5cbfcff", 
        secondColor: "#f16210",
        greyColor: "#F4E4C1",
        appLitepink: "#fffefd",
        appLighterPink: "#ffd9e3ff",
        appPink: "#f03a6a",
        appBoldPink: "#c90b3e",
        appPeach: "#fdf5ef",
        appDarkPeach: "#c77f48",
        appBoldPeach: "#e6b88c",
        appBolderPeach: "#fcf1ed",
        appGold: "#d4af37",
        appLiteGold: "#e8c986ff",
        appGray: "#2a2f37ff",
        background: "var(--background)",
        foreground: "var(--foreground)",
        kemenkeulightblue: "#005598",
        kemenkeubluesoft: "#e6f0ff",
        kemenkeublue: "#01347c",
        kemenkeudarkerblue: "#02275d",
        kemenkeuyellow: "#ffb300",
        kemenkeuyellowsoft: "#fff6cc",
        aqua: "#00FFFF",
        farmdarkestbrown: "#45210aff",
        farmdarkbrown: "#5a3828",
        farmbrown: "#724e3a",
        farmlightbrown: "#d4cea6ff",
        farmgreen: "#59a025",
        farmfreshgreen: "#7CFC00",
        farmgrassgreen: "#084724",
      },
      fontSize: {
        sideBarIcon: "1.2em",
        normal: "1em",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dancingScript: ["DancingScript", "sans-serif"],
      },
      animation: {
        wave: "wave 1s infinite ease-in-out",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      backgroundImage: {
        ruangTemu: "linear-gradient(135deg, #c3d4ef, #ffd4b8)",
        ruangTemuBrown: "linear-gradient(120deg, rgba(91,68,53,0.7), rgba(216,196,177,0.6), rgba(244,233,221,0.5))",
        ruangTemuAmbient: "linear-gradient(to top, #c3d4ef, #ffd4b8, transparent)",
        ruangTemuBold: "linear-gradient(135deg, #0457beff, #f89861ff)",
        ruangTemuPremier: "linear-gradient(135deg, #0457beff,  #a8b1fcff)",
        ruangTemuSecond: "linear-gradient(135deg, #f97529ff,  #f89861ff)",
        ruangTemuLight: "linear-gradient(to right, #a8b1fcff, #f6b58aff)",
        gradientJourney: "linear-gradient(to bottom, #F8E5E5, #F5C2C7)",
        gradientJourneyInNumber:
          "linear-gradient(to bottom, #FFFFFF, #F5C2C7)",
      },
      gridTemplateColumns: {
        grid_4: "repeat(4, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
