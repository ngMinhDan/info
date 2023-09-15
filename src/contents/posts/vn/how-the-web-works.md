---
title: 'Web hoạt động như thế nào ?'
slug: {
  vn: "how-the-web-works"
}
date: 2023-04-30
description: 'Giải thích về cách hoạt động của web, browser, server'
keywords: 'web, browser, server'
tags: ['technical', 'web', 'browser']
image: '/media/banners/web.jpeg'
---
## How the web works

Thực tế nếu web developer không biết thì cũng không sao, nhưng vì mình rất tò mò nên muốn biết nó là gì. Từ đó nếu có thể sẽ thể hiểu thêm nhiều về công nghệ mới, vì công nghệ mới cũng xuất phát từ khái niệm cơ bản

### Clients and Servers

Các máy tính kết nối trên internet gọi là clients và servers.

1. Hiểu đơn giản Client gửi yêu cầu, Server phản hồi. Client là các thiết bị để ngươi dùng kết nối với internet như máy tính, điện thoại. Máy tính kết nối qua Wifi, điện thoại kết nối qua Mobile Network. Các phần mềm truy cập web thì tồn tại ở trên các thiết bị đó như Firefox, Chrome, Safari.
2. Servers là các máy tính lưu trữ các webpages, sites, apps. Khi client gửi yêu cầu muốn truy cập vào webpage, một bản copy webpage sẽ được nhận về trên client, client sẽ hiển thị nó. Tuy nhiên bây giờ các servers thường chỉ trả dữ liệu, còn các client sẽ sinh ra giao diện từ dữ liệu đó.

### How client and server communication :

1. Browser sẽ truy cập vào DNS servers, tìm ra địa chỉ IP thực sự của server.
2. Browser sẽ gửi HTTP request đến server, hỏi server để lấy thông tin hay lấy toàn bộ website cho client. Tất cả message, data di chuyển giữa client và server trên internet sử dụng giao thức TCP
3. Nếu server chấp nhận client request, server sẽ gửi thông tin “200 ok”. Nghĩa là client có thể xem website, bắt đầu gửi thông tin hay data cho client. Tất cả các thông tin như ảnh hay data khi gửi qua internet sẽ đều được bóc thành các mảnh nhỏ hay gọi là packets.
4. Browsers sẽ nhận từng mảnh nhỏ cho đến khi hoàn tất và hiển thị website ra cho người dùng

#### Hypertext Transfer Protocol

Giao thức HTTP là giao thức để browser và servers nói chuyện với nhau, nó được phát minh vào hơn 30 năm trước !

HTTP là một giao thức đơn giản request-response được đưa ra vào RFX 2616. HTTP là giao thức stateless protocol, nó có nghĩa là client và server sẽ không biết trạng thái của các request. Nó có xuất phát từ một nơi hay không…. HTTP sử dụng TCP connection.

![HTTP Protocol](/media/blog/how-the-web-works/http.png)

Internet và sockets được tạo ra năm 1970, HTTP được tạo ra năm 1990 nó là một giao thức ứng dụng, chạy trên sockets. HTTP thực hiện giống như một cuộc gọi điện thoại ( Sau khi kết nối socket được tạo ra, thường là các TCP Socket. HTTP sẽ bắt đầu được sử dụng )

#### Tạo browser simple with Python

Chúng ta hiểu được mục tiêu của một browser đơn giản sẽ như sau :

1. **Khởi tạo connection - liên kết với server sử dụng TCP Socket**
2. **Gửi yêu cầu tới server bằng HTTP request**
3. **Nhận thông tin**
4. **Ngắt kết nối**

```python:browser.py
import socket

# open socket : to send and receive data inside computer
mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# make a phone call, dialing the phone (host, port)
mysock.connect(('data.pr4.org', 80))
cmd = 'GET http://data.pr4.org/page1.htm HTTP/1.0\r\n\r\n'.encode()
mysock.send(cmd)
# Retrieve data
while True:
    data = mysock.recv(512) # Get upto 512 character
    if len(data) < 1:
        break
		# decode from UTF8 to Unicode
    print(data.decode(),end='')

mysock.close() # close connection
```

#### Tạo web server sử dụng Python

Chúng ta hiểu được mục tiêu của một webserver đơn giản như sau :

1. **Tạo socket**
2. **Lắng nghe , chấp nhận các kết nối socket từ Client**
3. **Chờ request từ Client**
4. **Trả về dữ liệu**
5. **Tắt kết nối**

```python:server.py
# https://docs.python.org/3/howto/sockets.html
# https://stackoverflow.com/questions/8627986/how-to-keep-a-socket-open-until-client-closes-it
# https://stackoverflow.com/questions/10091271/how-can-i-implement-a-simple-web-server-using-python-without-using-any-libraries

from socket import *

def createServer():
    # make a socket, and set port for socket
    serversocket = socket(AF_INET, SOCK_STREAM)
    try :
        # listen on localhost:9000 to listen ( willing a phone call )
        serversocket.bind(('localhost',9000))
        # the sever can handle maxxium of 5 simultaneously request
        serversocket.listen(5)
        while(1):
            # accept connection, after that can send and receive data by HTTP
            # the server enters blocking state, waiting for a client to initiable a connection
            (clientsocket, address) = serversocket.accept()

            # receive data from client
            rd = clientsocket.recv(5000).decode()
            pieces = rd.split("\n")
            if ( len(pieces) > 0 ) : print(pieces[0])

            # respone struct folow RFC standard
            data = "HTTP/1.1 200 OK\r\n"
            data += "Content-Type: text/html; charset=utf-8\r\n"
            data += "\r\n"
            data += "<html><body>Hello World</body></html>\r\n\r\n"
            clientsocket.sendall(data.encode())
            clientsocket.shutdown(SHUT_WR)

    except KeyboardInterrupt :
        print("\nShutting down...\n");
    except Exception as exc :
        print("Error:\n");
        print(exc)

    serversocket.close()

print('Access http://localhost:9000')
createServer()
```

### References :

1. https://dev.opera.com/articles/http-basic-introduction/
2. https://dev.opera.com/articles/http-response-codes/
3. https://en.wikipedia.org/wiki/HTTP
4. [https://www.youtube.com/watch?v=keo0dglCj7](https://www.youtube.com/watch?v=keo0dglCj7I)

---

*Modified: May, 2023*
