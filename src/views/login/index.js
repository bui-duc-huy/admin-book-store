import React, { useEffect } from "react";
// @material-ui/core components

export default function Login() {
    const handleLogin = async () => {
        const username = prompt("Input User name", "");
        const password = prompt("Input Password", "");
        if (!username || !password) {
            alert("Unauthenticated");
            handleLogin();
        }
    };
    useEffect(() => {
        handleLogin();
    });
    return <div>login</div>;
}
