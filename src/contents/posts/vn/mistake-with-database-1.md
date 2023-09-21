---
title: 'Những sai lầm khi làm việc với CSDL'
slug: {
  vn: "mistake-with-database-1",
  en: "mistake-with-database-1",
  id: "mistake-with-database-1"
}
date: 2023-09-18
description: 'Kinh nghiệm khi làm việc với CSDL - Phần 1'
keywords: 'technical, backend, web develop, database, postgresql'
tags: ['web', 'coding', 'django', 'technical', 'database', 'postgresql']
image: '/media/banners/bat.jpeg'
---

Từ cậu sinh viên mới tốt nghiệp ĐHBK-HN hệ Việt Nhật được vài tháng, mình nhận lời chuyển sang nhận nhiệm vụ chịu trách nhiệm phát triển sản phẩm cho một startup ~ (lead team khoảng 7-10 người). Sau hơn 1 năm làm việc dù đã rất chăm chỉ nhưng những sai lầm và những lỗ hổng kiến thức là điều mình nhận ra nhiều nhất. Gần đây ngoài thời gian học ngoại ngữ, mình chủ yếu tập trung vào việc tìm hiểu kỹ về những vấn đề đó và nay xin phép chia sẻ lại với mọi người. Vì thời gian làm việc của mình còn rất ít so với nhiều anh chị, chỉ dừng ở mức kiến thức học trên trường, sử dụng, mắc sai lầm, nhìn nhận, học lại nên có nhiều thiếu sót hay sai lầm khó tránh khỏi, hi vọng mọi người góp ý để bản thân mình tiến bộ hơn và cộng đồng đều biết, giỏi hơn

### Những sai lầm với Database P1 - Lựa chọn, cài đặt

Hệ quản trị cơ sở dữ liệu mình sử dụng cho tất cả các sản phẩm của công ty là PostgreSQL mặc dù hồi học đại học mình chỉ biết và sử dụng Mysql, Sqlite. Dưới đây là những lý do mình lựa chọn PostgreSQL. Nó phụ thuộc vào những yếu tố như: bài toán cần giải quyết, tính năng, tài chính và độ phổ biến, kiến thức

##### Mục tiêu cần giải quyết
    Các ứng dụng website, app của bên mình sẽ chủ yếu sử dụng dữ liệu thô từ Blockchain (giao dịch, thông tin tin các đối tượng như các khối, token, blockchain, sàn, quỹ đầu tư, NFT, đặc biệt là có log, trace từ EVM của các blockchain như Ethereum, BSC Smartchain …) Do đó mình cần xây dựng một kho dữ liệu để lưu trữ được nhiều trăm triệu rows, sẽ được insert thường xuyên liên tục, cần tổng hợp nhanh, hiếm khi xoá, các database liên quan đến ứng dụng như authentication, users … thì sẽ thêm sửa xoá liên tục (CRUD)

##### Những thứ PostgreSQL cung cấp
    PostgreSQL có thể sử dụng cho cả công việc xây dựng OLTP (Online Transaction Processing) và OLAP (Online Analytical Processing)
    1. Cụ thể: PostgreSQL hỗ trợ đảm bảo các đặc tính ACID (Atomicity - nguyên tử, Consistency - nhất quán, Isolation - cách ly, mình thường hiểu là có thể làm việc song song, Durability - độ bền, có khả năng khôi phục lại) của transactions. Với đặc tính này PostgreSQL có thể xử lý và cung cấp tốt các yêu cầu mình đề ra cho các database liên quan đến ứng dụng người dùng
    2. PostgreSQL có thể dùng để xây dựng OLAP databases, ở đây là database để có thể thực hiện các câu query phức tạp, thực hiện trích xuất, báo cáo. Việc lưu trữ và truy suất có thể lên đến vài trăm triệu rows (logs, trace, transactions của blockchain) là không đơn giản ! Nhất định phải làm sao để hệ thống có thể mở rộng theo chiều ngang - scale out được. PostgreSQL có thể hỗ trợ cả 2 cách scale out với Master Slave Replication và Distributed Database ( Citus Data). Thực tế là mình và team đã từng triển khai cả hai cách này. Ngoài việc PostgreSQL có thể xây dựng lưu trữ dữ liệu lớn, các kỹ thuật như view, function, indexing, partitioning được cung cấp đủ để thực hiện các câu query khó, trích xuất báo cáo tốt.
##### Chi phí, độ phổ biến, kiến thức
    1. Nhiều người sẽ nói sao ngu thế đi chọn xây dựng cái này vừa rủi ro, vừa không đảm bảo và PostgreSQL cũ rích rồi dùng làm gì sao không dùng AWS Redshift hay Google BigQuery cho đảm bảo, nhàn đầu. Thì câu trả lời là TIỀN, mình từng dùng Redshift trước đó và biết AWS tính tiền dựa trên độ phức tạp và tài nguyên sử dụng cho mỗi câu query ~ nói chung là tốn kém. Đặt vào bối cảnh công ty thì là lựa chọn chắc chắn không tối ưu, nếu mình làm ở GG, AWS, Rakuten, Tiki, Zalo … những BIG CORP thì có thể mình sẽ dùng các SASS này vì đảm bảo nhiều yếu tố quan trọng hơn rất nhiều thay vì công nhận là phải chịu nhiều rủi ro !
    2. PostgreSQL là open source nên MIỄN PHÍ, dễ tiếp cận, tài liệu đủ, cộng đồng nhiều, các vấn đề mình gặp chắc chắn đã có người gặp rồi chỉ qua là họ có bảo mình hay không 🙂, các dev đã phần đều biết từ hồi học ĐH và có thể học nhanh vì dễ tiếp cận. Ngược lại các RDBMS như Oracle có thể nhiều chức năng hơn nhưng mất phí, ít dev được tiếp cận

#### Sai lầm khi cài đặt cơ sở dữ liệu

[Cài đặt PostgreSQL mà cũng có sai lầm cơ à ? ] nhiều người sẽ bảo vậy, nhưng đúng là cài cắm hồi sinh viên cứ cài thẳng vào con Laptop của mình thì công nhận là dễ, an toàn. Không ai bắt bẻ được và ứng dụng thì cũng chạy trên laptop nên càng không lo lắng. Cứ nghĩ như thế là xong rồi, nghề này nhàn ! Nhưng khi cài cắm để xuất bản và vận hành sản phẩm của cả công ty thì rất áp lực, mình đã mắc nhiều sai lầm !

Có nhiều chủ để cần quan tâm nhưng với cá nhân mình, để cài đặt và vận hành database servers thì mình quan tâm những chủ đề sau:

1. **Works** - Database hoạt động đúng, đủ
2. **Security** - Bảo mật
3. **High Availability, Failover, Backup, Recovery**  - “Cố gắng” luôn sống sót, “cố gắng” chống lỗi
4. **Monitoring, Logging** - Quản lý, theo dõi
5. **Scalability - Khả năng mở rộng**

Dưới đây là những lưu ý và danh sách việc mình sẽ làm cho từng đầu mục trên, cụ thể ở đây là với PostgreSQL. Mọi người có thể sử dụng cho các hệ quản trị cơ sở dữ liệu khác

###### Works - Database hoạt động đúng, đủ

Hoạt động đúng ở đây là: Việc truy cập có được hay không, APIs hoạt động đúng không, logs ra có đúng không, logs lỗi đúng lỗi không

Hoạt động đủ ở đây là: Các chỉ số phần cứng CPU, RAM, Storage,  IO có hoạt động trong mức dự tính hay không ~ Nhiều khi chỉ chạy những tasks đơn giản mà CPU và RAM lên quá cao thì là có vấn đề ! Ổ nhớ ăn quá nhiều cũng là vấn đề ~ Phải chăng cài đặt logs sai ở bước này?, nhầm version phần mềm hay phần cứng có vấn đề?, lựa chọn phần cứng hợp lý chưa? …etc ~

Tóm lại quá cao hay quá thấp cũng cần đặt câu hỏi ?  Chỉ có quá tốt là được nhé !

###### Security - Bảo mật

Đây là tiêu chí khó nhất với mình thời điểm đó. Vì trước đó mình không chú trọng, không có tư duy về nó. Mình sẽ chú ý và làm những điều sau đây sau khi đã có kinh nghiệm:

1. Xem lại kiến trúc về bảo mật của toàn bộ hệ thống ~ Database Servers được Inbound và outbound ở cổng nào ? Server nào có thể truy cập vào Database Servers  ~ server đó là những service nào. Có thể coi như một lần nữa review về System Architecture nhưng ở mặt security - bảo mật
2. Kiểm tra và học về cách hoạt động, cài đặt security của hạ tầng nơi đặt server ~ Thật vậy, để cài đặt đúng theo design architecture thì mỗi hạ tầng - Infrastructure lại có cách cài đặt khác nhau. AWS có Security Groups, Vultrs có Firewall, BizCloud hay Longvan nữa…, có những kiến trúc bảo mật sẽ không thực hiện được trên một số dịch vụ Cloud đúng 100% như ý muốn
3. Với Postgres thì cần quan tâm đến các file như **pg_hba.conf, postgresql.conf**, nắm rõ tất cả các thông tin của 2 file này
###### High Availability, Failover, Backup, Recovery - Cố gắng sống sót, cố gắng chống lỗi

Tại sao lại là cố gắng sống sót và cố gắng chống lỗi, vì thực tế việc **sập-shutdown** hay gặp **lỗi** là việc không ai chắc chắn nó sẽ không bao giờ xảy ra ! Điều mà các kỹ sư cố gắng cần làm đó là: **đảm bảo nó luôn tồn tại dù gặp lỗi, nếu có sập-shut down thì phải có thể hồi phục được ngay**. Mình sẽ chú ý đến những điều sau:

1. Cài đặt backup dữ liệu hàng ngày. Hãy cài đặt một công việc lặp đi lặp lại là luôn xuất, tải dữ liệu đó mỗi ngày (Jobs) ~ nên nhớ xoá theo thời hạn để tránh đầy bộ nhớ. File có thể là CSV, SQL tuỳ chúng ta
2. Kiểm tra cài đặt WAL file (Write-Ahead Log) và hoạt động lưu trữ, dọn dẹp thường xuyên. Tất cả các thay đổi insert, update, delete tới database đều được ghi vào WAL trước khi thực sự thay đổi trong data file. Nên khi hệ thống bị sập thì có thể sử dụng WAL file này để đưa database từ cõi chết trở về. *Nếu dev nào đó xoá nhầm bảng, cứ bình tĩnh đấm vào mồm dev đó, trước khi kết nối server sửa lại hehe*
3. Tạo tất cả kịch bản xấu, kiểm tra việc server sập, dev xoá nhầm dữ liệu, server mất kết nối với Cluster ... Dù sử dụng một database server hay nhiều database servers thì đều phải lên kịch bản chủ động để các server đó chết. Sau đó xem lại các cài đặt, phương án đã chuẩn bị có hợp lý hay không. Thường thì lần đầu sẽ không thành công đâu, nên phải thử tất cả những điều tệ hại trước khi đưa sản phẩm ra công chúng. Nếu sản phẩm đang có người dùng, database server sập và server phụ không thay thế ngay lập tức hoặc recovery kịp thời thì hậu quả sẽ rất nghiêm trọng. Có câu: *thao trường đổ mồ hôi, chiến trường bớt đổ máu*
4. Ở đây các keyword là : **Wal file, base backup, continuous archiving, standby server, failover**. Nếu có thời gian mình sẽ viết về chủ đề này sau, tuy nhiên viết ở bài này sẽ quá dài
###### Monitoring, Logging - Quản lý, theo dõi
    1. Thực tế thì chỉ rất ít người truy cập được vào Database Servers, việc này lợi thì ít hại thì nhiều vô kể. Tuy nhiên việc theo dõi quản lý hoạt động của database servers là việc chắn chắn phải làm, nhiều devs duy trì làm việc này. Tuỳ từng độ lớn của công ty, độ lớn của team monitoring để quyết định theo dõi, giám sát hoạt động những gì của database server
    2. Mình sẽ quan tâm những thông tin sau: PostgreSQL server log (sụ kiện bật, tắt, lỗi của DB…) cài đặt tại **postgresql.conf, ngoài ra còn Error log, Query log, pg_stat_statements, pg_stat_activity để có thể kiểm tra phát hiện lỗi, vấn đề hiệu năng, phòng ngừa từ xa các vấn đề của database servers**
    3. Có thể sử dụng filebeat, logstash để vận chuyển logs đến server monitor. Vì team mình bé và chi phí cho phần này ít nên sử dụng stack của ELK để monitor và chỉ ở mức sử dụng và cài đặt Alert. Mình biết có nhiều SASS làm tốt điều này trên thị trường hơn
###### Scalability - Khả năng mở rộng
 Không đợi đến việc khi cần mở rộng mới mở rộng mà phải chú ý đến khả năng mở rộng ngay từ ngày ban đầu. Mình sẽ chú ý những việc sau đây
    1. Lên danh sách việc cần làm, kiểm tra việc mở rộng của database server làm sao để không gây gián đoán, lỗi, mất dữ liệu của toàn bộ database servers - clusters. Đảm bảo mọi thứ phải diễn ra trơn tru nhất. Dù Master Slave hay Distributed Database, khi bổ sung thêm servers để mở rộng và cân bằng tải. Đảm bảo việc bổ sung không gây gián đoạn hay phải stop, restart đến master server hay coordinator server. Mình từng cấp phép truy cập vào master servers cho một số IP nhất định và khi bổ sung thì phải restart master server, nếu cấp cho tất cả các địa chỉ IP thì lại ảnh hưởng đến bảo mật. Do đó khi đó mình đã rút kinh nghiệm và cấp cho một dải IP ( Private IP ) cho một danh sách các servers hoặc một group servers chung chức năng của mình ( Tạo một mạng LAN ảo cho các cụm servers)
    2. Tạo sự cố mất kết nối với master server hay coordinator hay sập master server, coordinator server. Tất cả các kịch bản trên đều phải kiểm tra trước khi xuất bản chính thức

Ở các bài viết tiếp theo mình sẽ đề cập đến việc: sai lầm trong thiết kế CSDL (Đặt tên, thiết kế bảng, MQH, đánh index), các vấn đề  khi vận hành CSDL(N+1, Max Connections...), Sai lầm của mình khi sử dụng Master Slave và Citus Data.

---
Những kiến thức này chủ yếu là mình tự học và rút kinh nghiệm, tuy nhiên sẽ không thể biết mà từ học nếu không có sự giúp đỡ, trao cơ hội từ CEO, team devs, cô Trinh dạy Data Modeling, cô Trang dạy OOP, ITSS từ ĐHBK HN
