import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = { clicks: [], routes: [], lead: [], ip: [] };

  const addClick = (click) => {
    if (sessionStorage.getItem("click") !== null) {
      const existingLead = JSON.parse(sessionStorage.getItem("click"));
      let clicks;
      if (typeof existingLead === "object" && existingLead !== null) {
        clicks = JSON.stringify([click, existingLead]);
      } else {
        clicks = JSON.stringify([click, ...existingLead]);
      }
      sessionStorage.setItem("click", clicks);
    } else {
      sessionStorage.setItem("click", JSON.stringify(click));
    }
  };

  const addLead = (lead) => {
    if (sessionStorage.getItem("lead") !== null) {
      const existingLead = JSON.parse(sessionStorage.getItem("lead"));
      let lead;
      if (typeof existingLead === "object" && existingLead !== null) {
        lead = JSON.stringify([click, existingLead]);
      } else {
        lead = JSON.stringify([click, ...existingLead]);
      }
      sessionStorage.setItem("lead", lead);
    } else {
      sessionStorage.setItem("lead", JSON.stringify(lead));
    }
  };

  const addIp = (ip) => {
    sessionStorage.setItem("ip", JSON.stringify(ip));
  };

  const contextProps = { addIp, addLead, addClick, sharedState };

  return (
    <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
