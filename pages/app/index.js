import React, { useState } from "react";
import DashboardLayout from "@Layout/DashboardLayout";
import WelcomeCard from "@Components/WelcomeCard";
import ProtectRoute from "@HOC/ProtectRoute";

function dashboard() {
  const [isNewUser, setIsNewUser] = useState(true);

  return (
    <DashboardLayout>
      {isNewUser && <WelcomeCard setIsNewUser={setIsNewUser} />}
    </DashboardLayout>
  );
}

export default ProtectRoute(dashboard);
