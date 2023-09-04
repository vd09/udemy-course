import React from "react";
import { connect } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
//     return (
//         <>
//          {/* <Route element={<Component />} /> */}
//          <Component/>
//         </>
//         // <>
//         //     {/* {...rest} */}
//         //     {(props, ...rest) =>
//         //         auth.isAuthenticated ? (
//         //                 console.log("Vik")
//         //         //     <Component {...props} />
//         //         ) : (
//         //                 console.log("pr")

//         //         //     <Navigate to={`/login${rest.location.search}`} />
//         //         )
//         //     }
//         // </>
//     );
// return <Component/>
console.log("vik")
    return auth.isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to={`/login`} />
    );
};

// const ProtectedRoute = ({ path, component: Component, auth, ...rest }) => {
//     // Perform your authentication or authorization checks here
//     const isAuthenticated = auth.isAuthenticated;

//     if (isAuthenticated) {
//         return <Route path={path} element={<Component />} />;
//     } else {
//         return <Navigate to="/login" />;
//     }
// };

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoute);
