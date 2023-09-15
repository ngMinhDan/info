---
title: 'Internet hoạt động như thế nào ?'
slug: {
  vn: "how-internet-works",
  en: "how-internet-works",
  id: "how-internet-works"
}
date: 2023-05-01
description: 'Giải thích về cách hoạt động của Internet'
keywords: 'internet, basic, web'
tags: ['web', 'internet', 'basic', 'technical']
image: '/media/banners/internet.jpeg'
---

## Internet hoạt động như thế nào ?

Internet là sương sống của các lĩnh vực hiện nay không chỉ web, bây giờ còn là AI, IOT, len lỏi đi sâu vào tất cả các góc của đời sống con người.

Lịch sử phát triển của Internet bắt đầu từ khi nào, nó bắt đầu từ khoảng 1960 với các dự án nghiên cứu được tài trợ bở Quân đội Mỹ. Sau đó được phát triển thành hệ thống công cộng năm 1980 được hỗ trợ bởi nhiều trường đại học và các công ty. Nhiều công nghệ khác nhau đã hỗ trợ internet xuyên suốt khoảng thời gian qua, nhưng cách thức hoạt động của nó không có quá nhiều thay đổi. **Internet là hạ tầng nối tất cả các máy tính lại với nhau và đảm bảo rằng, dù có bất kể chuyện gì xảy ra, nó sẽ tìm cách để giữ kết nối.**

### Kết nối 2 máy tính đơn giản

Khi hai máy tính kết nối với nhau, mình có thể nối nhau thường dùng là Ethernet Cable  hay là có thể kết nối Wifi, hoặc Bluetooth.

Bây giờ hãy tưởng tượng chúng ta có một mạng lưới có 10 máy tính, để mỗi máy có thể kết nối được với nhau thì chúng ta cần 45 đoạn dây nối với nhau. Vậy nếu có 1 tỷ máy tính thì sao, hoặc đơn giản thì bây giờ chúng ta đã có nhiều tỷ thiết bị kết nối internet. Như vậy cách thức trên có thể để đảm bảo các máy tính liên lạc được với nhau tuy nhiên sẽ gặp vấn đề mở rộng.

Để giải quyết vấn đề trên, mỗi máy tính trong mạng sẽ kết nối với một **máy tính nhỏ hơn** gọi là **router**. Router này có nhiệm vụ nó đảm bảo tin nhắn được gửi từ một máy tính A sẽ đến chính xác máy tính B cần nhận. Khi gửi tin nhắn từ máy tính A sang máy tính B, máy tính A gửi đến Router, Router sẽ gửi đến B và đảm bảo rằng nó sẽ không đến nhầm địa chỉ là máy tính C.

Vậy sau bước này hệ thống đã rút gọn lại còn, giải sử 10 máy tính sẽ chỉ cần 10 đoạn dây để kết nối đến 1 router.

### Mạng của mạng

Cứ như thế, mỗi router là một máy tính nhỏ sẽ kết nối với một nhóm các máy tính khác, ta sẽ có máy tính kết nối router, router này kết nối router khác. Một mạng lưới như này rất gần với cách hoạt động của Internet. Tuy nhiên để xây dựng một mạng lưới từ nhà chúng ta sang đến nước Mỹ, quả thật không đơn giản. Tuy nhiên chúng ta đã có đường dây điện và điện thoại, đường dây điện thoại hẳn là đã có thể kết nối với toàn bộ thế giới, bây giờ chúng ta cần áp dụng mạng lưới internet kết nối với mạng lưới điện thoại dây.  Chúng ta cần thiết bị đặc biệt gọi là Modem.

Cái modem này sẽ biến thông tin trên mạng internet thành thông tin có thể quản lý được bằng hệ thống đường dây điện thoại.

Tóm lại bây giờ chúng ta có : Máy tính, các thết bị kết nối với Router, Router kết nối với modem. Bây giờ làm sao để các modem trên toàn thế giới kết nối với nhau. Chúng ta có các thiết bị không thường xuyên trực tiếp kết nối với mạng ~ hay gọi là Client sẽ kết nối với ISP - Internet Service Provider ISP. ISP là công ty quản lý các routers đặc biệt, chúng kết nối với nhau và có một mạng lưới ISP Router. Các ISP này luôn luôn, tham gia vào mạng 24/7. Các công ty ISP có thể kể đến như AT&T, Verizon, Vietel, FPT. Các ISP routers kết nối với nhau, trong nước và ngoài nước.

Đó là cấu trúc của cơ bản của Internet. Dưới đây là biểu đồ của mạng lưới đường dây cable trên thế giới.

![Mô phỏng các đường dây cáp Internet trên thế giới](/media/blog/how-internet-works/internet.png)

Chi tiết về việc Máy Tính A gửi tin nhắn cho Máy Tính B qua Internet

Chúng ta đã hiểu về Internet, bây giờ nếu chúng ta muốn gửi 1 tin nhắn từ Việt Nam sang một máy tính bên Mỹ, thì cách thức nó như thế nào. Thực tế, tất cả các thiết bị tham gia vào mạng Internet sẽ có một địa chỉ IP, gọi là Internet protocol address. Nó sẽ là địa chỉ duy nhất trong mạng, tương tự với địa chỉ nhà. Như vậy bây giờ chúng ta gửi tin nhắn từ máy tính A sang máy tính B, nghĩ là sẽ gửi từ địa chỉ IP này sang địa chỉ IP khác. ví dụ từ 107.23.1.10 sang 105.26.5.32

Tuy nhiên địa chỉ IP này rất khó nhớ đối với con người, và chúng ta phát minh ra một cái gọi là domain name. Ví dụ máy chủ của trang web [Google.com](http://Google.com) sẽ sử dụng địa chỉ IP là 143.250.190.78. Domain Name Server sẽ làm nhiệm vụ như một từ điển để khi chúng ta muốn tìm một địa chỉ IP Address cụ thể cho một domain ví dụ như [minhdan.info](http://minhdan.info)

Vậy khi chúng ta gửi một tin nhắn lên [minhdan.info](http://minhdan.info) , thực tế máy tính phải biết được địa chỉ IP thực tế của domain này, nếu không mọi thứ sẽ không xảy ra. Còn các máy tính khi chúng ta gửi yêu cầu và nhận về các thông tin này gọi là Web Servers.

Các địa chỉ IP dù là thiết bị hay server sẽ được cung cấp bởi Internet Service Provider - ví dụ FPT hay Vietel. Các đơn vị này sẽ phải đăng ký với các cơ quan chịu trách nhiệm quản lý và phân phối địa chỉ IP cho các ISP. Ví dụ như ARIN, APNIC …

Các ISP sẽ gán một địa chỉ IP cho Router, địa chỉ này là duy nhất. Khi các thiết bị kết nối với router này để kết nối ra ngoài, sẽ được router gán cho mỗi máy một private IP address.

Router như đã nói ở trên sẽ sử dụng Network Address Translation NAT, thay thế Private IP của yêu cầu gửi đi của thiết bị bằng địa chỉ IP của router - Public IP và gửi ra bên ngoài. Chiều nhận lại cũng vậy, Router nhận trước sau đó lại sử dụng NAT và trả về đúng thiết bị nó cần nhận.

### Internet và Web

Khi chúng ta khám phá các website trên internet bằng Web Browser như Google Chrome hay Safari. Mạng Internet nó liên kết hàng tỷ các thiết từ lớn đến bé, trong số đó có các máy tính gọi là Web Server. Internet là một cơ sở hạ tầng, gồm nhiều tỷ máy tính kết nối với nhau. Web là một service được xây dựng trên nó. Chi tiết về Web Servers, Client, HTTP, Domain mình sẽ nói ở phần sau

### Tổng kết

![](/media/blog/how-internet-works/)

Bây giờ chúng ta sẽ tổng kết lại cách Internet hoạt động và hạ tầng của nó .

1. Các thiết bị máy tính, điện thoại chúng ta khi tham gia mạng Internet kết nối qua một Router, Router này sẽ được cấp một Public IP duy nhất từ các ISP như AT&T, Vietel.
2. Các Router sẽ kết nối với các Modem hoặc kết nối thẳng với các ISP, các ISP là các bên luôn luôn kết nối với tất cả các ISP khác. Các máy tính, server cũng sẽ kết nối với các ISP, từ đó tạo ra một mạng lưới giao tiếp với nhau
3. Các máy tính, cụ thể ở đây là các web server thì đều có một địa chỉ IP duy nhất. Tuy nhiên vì khó nhớ nên chúng ta có Domain Name, các domain này được gán 1 vs 1 với các địa chỉ IP. Khi chúng ta muốn liên kết, truy cập thông qua các domain này, thì việc đầu tiên cần làm là Hỏi DNS servers để lấy địa chỉ IP của server đó.

Câu hỏi :

1. Khi chúng ta kết nối 4G thì sao ? Địa chỉ IP lấy từ đâu

    Khác với truy cập thông qua router theo mô hình gia đình, khi điện thoại kết nối qua Mobile Network 4G , Mobile Network sẽ gán 1 địa chỉ IP cho thiết bị của mình. Các địa chỉ IP này sẽ thay đổi theo thời gian.

### References :

1. https://dev.opera.com/articles/http-basic-introduction/
2. https://dev.opera.com/articles/http-response-codes/
3. https://en.wikipedia.org/wiki/HTTP
4. [https://www.youtube.com/watch?v=keo0dglCj7](https://www.youtube.com/watch?v=keo0dglCj7I)
