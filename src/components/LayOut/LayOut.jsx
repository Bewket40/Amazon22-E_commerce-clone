import React from "react";
import Header from "../Header/Header";
function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;

// children is a special prop in React
// React automatically passes whatever is between the opening and closing tags of a component into that component as a prop called children.
// You don’t need to declare it yourself — React does it for you.
