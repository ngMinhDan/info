---
title: 'What is HTTP ? HTTPS ? TLS ? SSL'
slug: {
  en: 'http-https-tls',
  id: 'http-https-tls',
  vn: 'http-https-tls'
}
date: 2023-02-01
description: 'My explain about HTTP, HTTPS, TLS-SSL'
keywords: 'technical, security'
tags: ['technical', 'security', 'basic']
image: '/media/banners/2.jpg'
---
### Hypertext Transfer Protocol

When a browser sends a request to a server using the HTTP protocol, the request follows a specific structure known as an **HTTP request message**. An HTTP request message consists of several components that convey information about the request being made by the browser to the server. Here's a breakdown of the structure of an HTTP request:

1. **Request Line:**
The first line of the request is the request line, which contains three main parts:

    ```
    Method URI HTTP Version

    ```

    - **Method:** The HTTP method or verb that indicates the action the browser wants to perform on the resource. Common methods include GET, POST, PUT, DELETE, and more.
    - **URI (Uniform Resource Identifier):** The URL or path that specifies the resource the browser is requesting from the server.
    - **HTTP Version:** The version of the HTTP protocol being used (e.g., HTTP/1.1).
2. **Request Headers:**
After the request line, the browser sends a series of headers that provide additional information about the request. Headers are in the format:

    ```
    Header-Name: Header-Value

    ```

    Common headers include:

    - **User-Agent:** Information about the browser and operating system making the request.
    - **Host:** The domain name of the server being requested.
    - **Accept:** The types of content the browser can handle.
    - **Content-Type:** For POST requests, indicates the format of the data being sent.
    - **Cookie:** If there's an existing session, the browser sends the session information as a cookie.
3. **Blank Line:**
After the headers, there's a blank line that separates the headers from the message body.
4. **Message Body (Optional):**
For some HTTP methods like POST and PUT, the browser may include data in the message body. This data could be form data, JSON, XML, or other formats, depending on the content type specified in the headers.

The general structure of an HTTP request looks like this:

```shell
HTTP Method URI HTTP Version
Header-Name: Header-Value
Header-Name: Header-Value
...
Blank Line
Message Body (if applicable)

```

For example, a simple GET request might look like this:

```shell
GET /example/resource HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36

```

This structure allows the browser to communicate its intention to the server, provide additional context through headers, and, in some cases, send data in the message body. The server processes the request and responds with an HTTP response message that contains the requested resource or an error message, following a similar structure.

### Hypertext Transfer Protocol Secure

HTTPS is an extension of the HTTP protocol that adds an extra layer of security by using encryption. In HTTPS, the data exchanged between a user’s browser and a website is encrypted, making it significantly more difficult for unauthorized parties to intercept and understand the data being transmitted

**How HTTPS Works**

HTTPS uses the TLS (Transport Layer Security ) or SSL (Secure Sockets Layer) protocols to establish a secure and encrypted connection between a user’s device and a web server. Here there is flow of how HTTPS works. You can see this video for detail

1. **Key Exchange and Handshake:**
    - When a user's browser initiates a connection to a website using HTTPS, the website's server sends its public key, along with a digital certificate issued by a trusted Certificate Authority (CA). The certificate includes the server's public key and additional information about the website.
    - The browser checks the digital certificate's authenticity against a list of trusted CAs that are pre-installed or maintained by the browser.
2. **Symmetric Session Key Creation:**
    - After verifying the server's identity, the browser generates a random symmetric session key, known as the "pre-master secret."
3. **Asymmetric Encryption:**
    - The browser encrypts the pre-master secret with the server's public key and sends it to the server. Only the server, possessing the corresponding private key, can decrypt the pre-master secret.
4. **Symmetric Encryption:**
    - Both the browser and the server use the pre-master secret to independently derive a shared symmetric session key, known only to them. This shared key is used for the rest of the session to encrypt and decrypt data.
5. **Data Exchange:**
    - All data exchanged between the browser and the server is encrypted and decrypted using the shared symmetric session key, ensuring the confidentiality and integrity of the data.
6. **Secure Communication:**
    - With symmetric encryption, data is encrypted and decrypted much faster than with asymmetric encryption. This is why symmetric encryption is used for the actual data exchange, while asymmetric encryption is used for securely exchanging the session key.
7. **Continuous Encryption:**
    - Throughout the session, the symmetric session key remains the same. If a new connection is initiated, a new symmetric session key is generated and exchanged.
8. **Certificate Revocation Checks:**
    - The browser periodically checks the certificate's validity against the CA's revocation list to ensure that the server's certificate has not been revoked.

And, we common call TLS/SSL certificate but, In modern web security, SSL (Secure Sockets Layer) is considered outdated and has known vulnerabilities. TLS (Transport Layer Security) has succeeded SSL as the standard protocol for securing communication over the internet. TLS is a next version of SSL, SSL is not recommended for modern web.

#### How I get Certificate for my website

We can get TLS/SSL certificates for our website from both third-party certificate authorities-CAs and by generating self-signed certificates.

1. **Third-party certificate authorities**

    Popular third party CAs include Let’s Encrypt, DigiCert, GlobalSign. [Let’s Encrypt](https://letsencrypt.org/vi/), in particular, provides free TLS/SSL certificate, making it a popular choice for website.

2. **Self signed certificates**

    You can generate self-signed certificates without involving a third-party CA. These certificates provide encryption, but they don't undergo the same validation process as certificates from trusted CAs. As a result, visitors to your website **might see security warnings when accessing your site.**


In summary, while we can create self-signed certificates for free, it's generally recommended to obtain TLS/SSL certificates from trusted third-party certificate authorities.

##### I use Cloudflare for my websites

Cloudflare offers both free and paid services, and it provides more than just a reverse proxy for your website. Cloudflare is a content delivery network and web security provider that offers various features to enhance the performance, security, and reliability of your website

1. **Content Delivery Network - CDN**
2. **DDos Protection**
3. **Web Application Firewall**
4. **SSL/TLS Encryption**
