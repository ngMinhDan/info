---
title: 'Authentication: Cookies Base '
slug: {
  en: "authentication-cookies-base",
  id: "authentication-cookies-base",
  vn: "authentication-cookies-base"
}
date: 2023-09-05
description: 'About cookies and session'
keywords: 'technical, authentication'
tags: ['technical', 'authentication', 'basic']
image: '/media/banners/2.jpg'
---
### How session and cookies works

We know HTTP is stateless protocol that mean when 10 request send from client to server, server don’t know who send request and what relationship of these request. All request are independent, however we need to keep track of user activity. So now we will use cookies and session to solve this problem

### What is cookies ?

Cookies provide a way for web application to store information in the user’s browser. Cookies can be either first party or third party. First party cookies are created by the website that the user is visiting, while third party cookies are created by domains other than the website being visited, often used for advertising and tracking purpose

Cookies is a text string stored by the browser as a key value par

```python
Name: user_info
Value: {"username": "john_doe", "age": 30, "email": "john@example.com"}
Expiration: 2023-12-31 23:59:59  // (Cookie expires on this date and time)
Domain: example.com // (Cookie is only sent to requests for this domain)
Path: / // (Cookie is sent to all URLs under the domain)
Secure: true  // (Cookie is transmitted only over HTTPS)
HttpOnly: true // (Cookie is not accessible via JavaScript)
```

In this example, we have expired date that’s set by the server, when that date come, the cookie will be deleted from the user’s browser

1. Cookies are text string stored as key value
2. The server create the cookie and send it to the user’s browser where it will be stored
3. The browser will send that cookie every time it send a request to that server

### What is sessions

Session are a way of storing information about a user on the server side, those information will then be used in next request.

Session provides the ability to establish variables such as access rights and localization setting, which apply to each and every interaction a user has with the web application for the duration of session.

For example, I login into a web application and i provide email and password then submit. Next, i am redirected to the dashboard page where **i can access it if i am logged in**. **I can access all page on web application if i am logged in**. If in **non-session mechanism I can not do this**, because HTTP request are **independent** of each other. When i send the second request page, the server does not know who am i !

### How sessions works

When a user login into web app, a session is created. In this session, you can created variable called “session variable” store data in a **key-value format like cookies (above). This session is associated with a randomly generated unique ID, created by server and called Session ID**

SessionID will be sent to browser and store in cookies, session data is stored on the server side.

Flow session work with cookie

1. **Client sends request**
2. **Server create session**

    Server receives the requests and generates a unique **session ID.** It create a data structure to store session specific information. This information could include user data, shopping cart, hobby…

3. **Server sends session ID to Client** (Server send back to the client as a cookie in the HTTP response. The cookie is stored locally on the client’s browser )
4. **Client sends session ID with subsequent requests**

    Client automatically includes the session ID cookie in the request header when send subsequent request to the same website

5. **Server retrieves session data**

    With session ID, server retrieve the session data from its storage (RAM, DB, any …)

6. **Server process request using session data**
7. **Server update session data**

    As the user interacts with the website, server can be update the session data, like update shopping cart, expired date

8. **Session Expiration**

    Server resource is limited, if the user’s session becomes inactive for a certain period, the server may choose to expire the session

9. **User logout or Close browser**

    When user logs out, the session data is either cleared on the server or marked as inactive. When i close my browser, cookies are lost depends on the type of cookies and expiration settings:

    1. Session Cookies: Session cookies are temporary cookies that are stored only for the duration of your browser session. These sessions are typically used to maintain session state, login status, shopping cart. **When i close browser, session cookies are usually deleted automatically**
    2. Persistent cookies: Persistent cookies have an expiration date set in the future. They are used to remember user preferences, maintain login sessions across multiple sessions. **When I close browser, data stored in the persistent cookie will not be lost**

### Django with Authentication

Django, a popular web framework for Python, provide a powerful authentication system that includes Session Management and User authentication features. Django use both session cookies and persistent cookies to manager user logins and maintain user state.

1. **User Authentication**

    Django's authentication system allows you to authenticate users, manage user accounts, and control access to different parts of your application. It provides a user model (**`User`**) with built-in fields for handling authentication, such as username and password.

2. **Session management**

    Django uses session cookies to maintain user sessions. When a user logs in, Django creates a session for the user and associates a unique session ID with the user's browser using a cookie. The session data is stored on the server side. This session ID is used to identify the user in subsequent requests.

3. **Persistent cookies - Remember Me**

    Django's authentication system includes a "Remember Me" functionality, which is achieved using persistent cookies. When a user chooses to stay logged in, a persistent cookie with an expiration date in the future is set in the user's browser. This cookie is used to automatically log the user in when they return to the site, without requiring them to enter their credentials.

---

*Modified: Sep, 2023*
