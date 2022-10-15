import {HomePage} from "../B0_HomePage/HomePage";
import React from "react";
import {RegistrationPage} from "../B1_RegistrationPage/RegistrationPage";
import {LoginPage} from "../B2_LoginPage/LoginPage";
import {AuthorizedPage} from "../B3_AuthorizedPage/AuthorizedPage";

export const routes = [
    {label: "Home", path: "/", element: <HomePage/>, auth: false},
    {label: "Authorized Page", path: "/authorizedPage", element: <AuthorizedPage/>, auth: true},
    {label: "Registration", path: "/registration", element: <RegistrationPage/>, auth: false},
    {label: "Login", path: "/login", element: <LoginPage/>, auth: false},
];

export const links = routes.map(({label, path}) => ({label, to: path}))
export const notAuthRoutes = routes.filter(route => !route.auth)
export const notAuthLinks = notAuthRoutes.map(({label, path}) => ({label, to: path}))
