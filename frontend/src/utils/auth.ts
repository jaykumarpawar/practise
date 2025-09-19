import { createAuth0Client, Auth0Client, User } from "@auth0/auth0-spa-js";

let auth0Client: Auth0Client | null = null;
let cachedUser: User | null = null;

export async function initAuth0() {
  if (!auth0Client) {
    auth0Client = await createAuth0Client({
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
      authorizationParams: {
        redirect_uri:
          window.location.origin +
          (process.env.NEXT_PUBLIC_BASE_PATH
            ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/resume-builder`
            : ""),
      },
    });
  }
  return auth0Client;
}

export async function loginPopup() {
  const client = await initAuth0();
  await client.loginWithPopup();
  const user = await client.getUser();
  if (user) {
    cachedUser = user;
    localStorage.setItem("auth-user", JSON.stringify(user));
  }
  return user;
}

export async function getUser() {
  if (cachedUser) return cachedUser;
  const saved = localStorage.getItem("auth-user");
  if (saved) {
    cachedUser = JSON.parse(saved);
    return cachedUser;
  }
  const client = await initAuth0();
  const user = await client.getUser();
  if (user) {
    cachedUser = user;
    localStorage.setItem("auth-user", JSON.stringify(user));
  }
  return user;
}

export async function logout() {
  cachedUser = null;
  localStorage.removeItem("auth-user");
  const client = await initAuth0();
  client.logout({
    logoutParams: {
      returnTo:
        window.location.origin +
        (process.env.NEXT_PUBLIC_BASE_PATH
          ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/resume-builder`
          : ""),
    },
  });
}
