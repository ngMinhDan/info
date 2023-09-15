---
title: 'Encode, Hash, Digital Signature'
slug: {
  en: "encode-hash-signature",
  vn: "encode-hash-signature",
  id: "encode-hash-signature"
}
date: 2023-02-01
description: 'My explain about Encode, Hash, Digital Signature'
keywords: 'technical, security'
tags: ['technical', 'security', 'basic']
image: '/media/banners/2.jpg'
---
#### Encode

Encoding and decoding, such as base64 encoding is not cryptographic hash function.

1. **Encoding**

    Encoding is the process of converting data from one formant into another ensure it’s suitable for transmission and storage or presentation. Encoding does **not focus on security and irreversible transformation.**

2. **Decoding**

    Decoding is the reverse process of encoding. It converts encoded data back to its original format so that is can be understood and used

3. **Base64 Encoding**

    Base64 Encoding is a common form of data encoding that transform binary data into an ASCII string, using a set of 64 different characters.


#### Hash Function

Hash algorithm are cryptographic functions that take an input or message and produce a fixed-size string of characters, which is typically a hexadecimal number. Hash function are commonly used in various applications, including digital signatures, password storage

**MD5-Message Digest Algorithm 5**

MD5 was widely used in the past for generating checksums and verifying data integrity. However, it's now considered weak due to vulnerabilities that allow collision attacks (two different inputs producing the same hash). As a result, it's not recommended for security-sensitive applications.

We can use Python for test MD5

```python
import hashlib

def compute_md5(input_string):
    md5_hash = hashlib.md5(input_string.encode()).hexdigest()
    return md5_hash

input_data = "Hello, world! My name is Bill"
md5_hash = compute_md5(input_data)
print("MD5 Hash:", md5_hash)

# encode : method is used to convert the input string to bytes - required
# hexdigest: method convert the hash value to hexadecimal representaion
```

**SHA 1**

SHA-1 is another hash algorithm that was widely used but is now considered weak. Researchers have demonstrated vulnerabilities, and collision attacks have been successfully carried out. As a result, SHA-1 is no longer considered secure for cryptographic purposes.

**SHA 2**

SHA2 is an improved version of the SHA 1 algorithm family. It includes various hash sizes, such as 224, 256, 384, 512. SHA-256 and SHA-512 are the most commonly used, they are considered secure and are widely used for various cryptographic applications.

```python
import hashlib

def compute_sha256(input_string):
    sha256_hash = hashlib.sha256(input_string.encode()).hexdigest()
    return sha256_hash

input_data = "Hello, world!"
sha256_hash = compute_sha256(input_data)
print("SHA-256 Hash:", sha256_hash)

# encode : method is used to convert the input string to bytes - required
# hexdigest: method convert the hash value to hexadecimal representaion
```

Both SHA-256 (Secure Hash Algorithm 256) and MD5 (Message Digest Algorithm 5) are **one-way hash functions**, which means that the process of generating a hash value from input data is **irreversible**. In other words, **you cannot decrypt the hash value to retrieve the original input data.**

The main purpose of one-way hash functions is to generate **fixed-size representations (hash values) of input data**, such as passwords or messages, in a way that is difficult to reverse. These hash values are used for various purposes, including data integrity verification, password hashing, digital signatures, and more.

#### Digital Signature

A digital signature is a cryptographic technique that uses a pair of keys, namely the private key and the public key, to ensure the authenticity, integrity, and non-repudiation of digital messages or documents. Digital signatures provide a high level of security and are widely used for secure communication and authentication in digital transactions.

1. **Key Pair Generation:**
    - A user **generates a pair of keys**: a private key and a public key.
    - The private key is kept secret and never shared.
    - The public key is distributed to others.
2. **Signing Process:**
    - When the user wants to sign a message or document, they **use their private key** to create a **unique digital signature for that message.**
    - The digital signature is a cryptographic representation of the message along with the user's private key.
3. **Verification Process:**
    - Others who receive the message can verify the authenticity and integrity of the message using the **sender's public key.**
    - The digital signature is decrypted using the public key, and the result is compared with the original message.
    - If the two match, it confirms that the message **hasn't been altered** since it was signed and that the sender is the legitimate owner of the private key.
4. **Non-Repudiation:**
    - Non-repudiation means that the sender cannot deny sending the message, as their private key was used to create the digital signature.
    - This ensures accountability and prevents the sender from falsely claiming that they didn't send the message.

Digital signatures are considered very secure due to the mathematical relationship between the private key and the public key. The private key is required to generate the digital signature, and the public key is used to verify it. As long as the private key is kept secure, the digital signature remains strong and reliable.

Digital signatures are widely used in various applications, including email authentication, electronic documents, software distribution, financial transactions, and  **Bitcoin**….. They provide a way to establish trust in the digital world by verifying the authenticity and integrity of messages or documents.

### References
 https://www.youtube.com/watch?v=stsWa9A3sOM
