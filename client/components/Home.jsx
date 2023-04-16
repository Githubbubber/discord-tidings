import React, { useEffect, useState } from "react";
import axios from "axios";

import DiscordAccount from './DiscordAccount.jsx';

const Home = () => {
    const [ loginInfo, setLoginInfo ] = useState({
        signInURL: null,
        accessToken: null,
        tokenType: null,
        username: null,
    });

    const handleLogin = (accessToken, tokenType) => {
        const url = "https://discord.com/api/users/@me";

        axios({
            url: url,
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`,
            }
        })
            .then(({ data }) => {
                const { 
                    username, discriminator, 
                    avatar, 
                    id 
                } = data;
                        
                setLoginInfo(prev => {
                    return {
                        ...prev,
                        username,
                        discriminator,
                        avatar,
                        id,
                        accessToken: accessToken,
                    }
                });
            })
            .then(() => {
                axios({
                    url: "/api/discord/login",
                    method: "POST",
                    data: loginInfo,
                })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    };

    const getLoginInfo = async () => {
        const { data } = await axios.get("/api/discord/login");
        const responseURL = data.discord_get_login.url;

        setLoginInfo(prev => {
            return {
                ...prev,
                signInURL: responseURL,
            };
        });
    };

    useEffect(() => {
        let params = document.location ? new URL(document.location) : null;
        params = params?.hash?.split("#")[1];
        params = params?.split("&");

        if (params !== undefined) {
            let retrievedAccessToken = params.filter(param => {
                return param.indexOf("access_token") !== -1;
            });
            let retrievedTokenType = params.filter(param => {
                return param.indexOf("token_type") !== -1;
            });
            
            retrievedAccessToken = retrievedAccessToken[0].split("=")[1];
            retrievedTokenType = retrievedTokenType[0].split("=")[1];

            if (retrievedAccessToken && retrievedTokenType) {
                setLoginInfo(prev => {
                    return {
                        ...prev,
                        accessToken: retrievedAccessToken,
                        tokenType: retrievedTokenType,
                    }
                });

                handleLogin(retrievedAccessToken, retrievedTokenType);
            }
        } else {
            getLoginInfo();
        }
    }, []);

   return <> 
        <h1>Discord App</h1>

        {
            (loginInfo.signInURL && !loginInfo.accessToken) && <a 
                href={loginInfo.signInURL}>
                    Login
                </a>
        }

        {
            loginInfo.accessToken && <DiscordAccount loginInfo={ loginInfo }/>
        }
    </>;
};

export default Home;
