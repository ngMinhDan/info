---
title: 'Django hoạt động như thế nào ?'
slug: {
  vn: "how-django-work",
  en: "how-django-work",
  id: "how-django-work"
}
date: 2022-05-07
description: 'Chia sẻ về web framework django'
keywords: 'technical, backend, web develop'
tags: ['web', 'coding', 'django', 'technical']
image: '/media/banners/1.jpg'
---

## Luồng làm việc của Django

Django là một Python web framework nó giúp việc tạo ra một website nhanh hơn rất nhiều lần bằng Python. Django đã xử lý những việc khó khăn khác để cho người sử dụng có thể tập trung vào việc build web application.
Django nhấn mạnh vào việc tái sử dụng các components, tuân thủ theo quy tắc Don’t Repeat Yourself. Cung cấp sẵn các tính năng như login system, db connect, crud.

Django tuân theo MVT design pattern.

1. Model - Model cung cấp data từ database. Trong Django, dữ liệu được phân phối như là Object Relational Mapping ORM, nó là kỹ thuật giúp tương tác với DB dễ dàng hơn. Chi tiết mình sẽ viết ở một bài Database khác
2. View - View là nơi chứa function hoặc method để nhận các HTTP request như các tham số, sử dụng models và lấy các data đưa vào template và gửi về cho người dùng
3. Template - Template là các file text có cấu trúc như HTML có thể thay thế dữ liệu vào trong đó.
4. URLs : Đây là sẽ là nơi đầu tiên được gọi khi nhận một request bất kỳ, và là điểm mạnh so với các framework khác. Nó được build sẵn trong cấu trúc của Django, các URL sẽ được map đến một function hoặc một method để xử lý request tại đó.

![MVT Design Pattern](/media/blog/how-django-work/follow.png)

Tuy nhiên sau khi học xong và sử dụng Django trong thực tế thì trên đây mới chỉ là phần nhìn rất bên ngoài của Django, những thứ được build sẵn ~ nếu khi chúng ta cần điều chỉnh thì cũng mất rất nhiều thời gian để đọc docs hoặc code. Theo mình đây là các chủ đề chính để thực sử nắm được và thành thạo Django

1. Cấu trúc dự án, luồng làm việc của Django - Như trên
2. Template engine, custom template
3. Quản lý Static files, Media files
4. Admin Site, custom Admin
5. Deploy, vận hành

---
### Template Engine trong Django

Dưới đây là các kinh nghiệm và bài học sau khi làm việc với Framework Django. Thực tế Template là một phần quan trọng và không thể thiếu khi sử dụng Django Framework. Tuy nhiên nó cũng tạo ra một số bất tiện khi chúng ta muốn thay đổi bên trong core.

Django sử dụng built-in template engine để render ra dynamic HTML. Template engine này cho phép mình tách biệt phần UI ở đây thường là các file HTML và phần Logic Code Python để xử lý logic cho Web App.  Nó dễ dàng giúp cho chúng ta có thể maintain code, chỉnh sửa thoải mãi giao diện mà không cần động vào tầng Python Code. Đó là cái hay, tiện lợi và dễ sử dụng. Đúng với ý nghĩa của Django giúp cho chúng ta built được website với ý tưởng nhanh nhất có thể.

#### Template Loading

Khi mà chúng ta muốn render một template, thường sẽ  là câu lệnh ```render(request, template_name='index.html' context=  …)``` nghĩa là nó cần biết tệp template này nằm ở đâu và load template này. Đầu tiên Django sẽ tìm danh sách folder template để tìm các template với tên nêu trên.
Django sẽ tìm templates folder trong tất cả các app được đăng ký trong **INSTALLED_APPS**. Nếu app chúng ta là **my_app** thì kết quả sẽ là : **/my_app/templates**
Điều này dẫn đến 2 điều quan trọng sau :

1. Chúng ta cần đăng ký app tại INSTALLED_APPLS để có thể được Django có thể tìm thấy templates trong nó
2. Chúng ta nên đặt tên app trong chính thư mục template của app đó ví dụ : **/my_app/templates/my_app/home.html**  Vì nếu giả sử website có 2 app và đều có home.html thì câu lệnh ```render(request, template_name='home.html')``` **chưa chắc đã tìm đúng đến home/html thực sự !** , thay vào đó chúng ta nên định nghĩa như sau ```render(request, /my_app/home.html)``` vì trước đó chúng ta đã tạo một folder con trong folder template

    Tại sao ? Django sẽ có thể tìm kiếm nhầm file template ? Giả sử chúng ta có 2 file : **app1/templates/home.html và app2/templates/home.html** thì Django sẽ tìm kiếm home.html **theo thứ tự folders của app được ghi trong installed_app**. Ví dụ **[‘app2’, ‘app1’] được đăng ký trong INSTALLED_APP** Django sẽ **tìm kiếm lần lượt từ app2 đến app1**, nếu trong app2 đã tìm thấy thì sẽ không sử dụng app1 nữa. **Đó là lý do chúng ta nên lưu ý điều trên**
    Sau khi tìm được chính xác file template rồi, bây giờ đến Template Rendering

#### Template Rendering
Khi render template chúng ta có thể sử dụng context data. Context data thực tế là dictionary chứa biến và giá trị sẽ sử dụng trong template. Nó cho phép chúng ta sử dụng data động vào template từ views với từng request khác nhau. Ở đây có 2 thứ cần chú ý trong Template Rendering

##### Template Tags and Filters
Django template hỗ trợ các **tags** và **filters** để có thể thực hiện logic, vòng lặp, điều kiện trực tiếp trong template.

```html
{% for mess in messages %} # we can write logic in template
{% variable | filter_name %} # we can use filter too
```
---
### How manger static files in Django

Khi xây dựng website bằng Django hay bất kỳ framework nào chắc chắn chúng ta sẽ phải sử dụng những file tĩnh như ảnh đặc biệt là css và Js. Tuy nhiên Django không có một giải pháp được xây dựng trong core để có thể phục vụ file tĩnh trên production. Chúng ta có thể làm việc với file tĩnh bình thường trong môi trường development.

#### Load static file

Khi chúng ta muốn sử dụng static file chúng ta sẽ làm như sau :
```
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'chat/css/style.css' %}">
```
Như mọi người thấy ở đây trong folder static của app có tên là chat, tôi đã tạo ra một folder con có tên chính là tên app đó, tiếp theo mới là folder css và style.css. Tại sao lại thế, thì cơ chế load static cũng giống như cơ chế load của template. Nếu ai chưa đọc hãy đọc bài về cơ chế load template của Django. Nó giúp Django tìm kiếm chính xác và không nhầm lẫn các file css giữa các app

#### Deploy static file

Bình thường, khi lập trình tạo ra web chúng ta không gặp vấn đề với static file. Ta setup ```debug=True```, tuy nhiên như mình nói ở trên. Khi đưa lên production, bạn phải setup **STATIC_ROOT**

Nghĩa là sau khi đưa lên production chúng ta sẽ phải chạy một lệnh ```python manage collectstatic```  lệnh này có ý nghĩa là sẽ copy toàn bộ file static của các app đưa ra một folder static root. Và từ giờ chúng ta sẽ serve các file tĩnh này bằng folder static root này. Thường thì chúng ta sẽ sử dụng Web Server để serve các file tĩnh này ra. Dưới đây là một setup như thế:

```python:setting.py

STATIC_URL = 'static/'
STATIC_ROOT = '/var/www/chat/static'
```
Đây là setup cho Nginx để phục vụ các file tĩnh

```shell:my_web.conf
server {
    listen 80;
    server_name domain.name;  # Replace with your actual domain or IP address

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        autoindex on;
        alias /var/www/chat/static;
    }

}
```
Đến đây hãy nhớ những điều sau đây :

1. Mỗi khi bạn bổ sung hay thay đổi file static bên trong các app, bạn phải run lại command **python manage.py collectstatic** để cập nhật thay đổi vào folder root
2. Hãy đảm bảo rằng nginx có quyền để có thể đọc được các file bên trong folder static root, nếu không chúng ta sẽ nhận được mã 403

---
### Deploy Django App
![](/media/blog/how-django-work/flowDeploy.png)

**Django** là một web framework. Nó giúp chúng ta xây dựng website nhanh chóng. Rendering html, authentication, admin, backend logic

**Gunicorn** là một application server, nó sẽ dịch các HTTP request để Python có thể hiểu được, Gunicorn sử dụng Web Server Gateway Interface (WSGI) - đây là một interface để giao tiếp giữa web server và web application

Thực tế thì chúng ta có thể sử dụng WSGI Server có sẵn trong Django có thể chạy được, trước đó mình đã từng sử dụng run câu lệnh python như bình thường và sau đó sử dụng Nginx để reverse các request đến Django. Làm và chạy bình thường tuy nhiên nó không được sử dụng trong môi trường Production. Đây là những gì từ docs có đưa ra :

Nó chưa đảm bảo security hay performance test, vì Django đơn giản là một web frameworks, nó không phải web servers, do đổ để nâng cấp nó thành một server để có thể xử lý các yêu cầu của môi trường production nằm ngoài chủ đề của Django. Ngoài ra thì một phần quan trọng là logs cũng không được nêu đến trong development tuy nhiên cực kỳ quan trọng trong production.

Tại sao sử dụng Gunicorn

1. Nhanh, có thể xử lý số lượng lớn các request đồng thời, phù hợp môi trường production
2. Hỗ trợ concurrency với nhiều worker processes, default WSGI khi chạy trong development thực tế là single thread và chỉ phù hợp để code và test
3. Graceful Restart, cho phép update application không có downtime, nghĩa là khi chúng ta thay đổi code của Django App, chúng ta muốn khởi động lại Application Server. Gunicorn cho phép khởi động lại mà các worker process cũ sẽ xử lý hết các request đến trước khi nó chuyển sang worker mới.
4. Hỗ trợ logs và có thể configure logs

```shell
gunicorn myapp.wsgi:application # start application server
pkill -HUP gunicorn # graceful restart
```

**Nginx** là một web server. Nó là điểm mà các browsers sẽ gửi trực tiếp request đến, thường sẽ được sử dụng như là reverse proxy để chuyển request đến application server và để serve các file tĩnh trong hệ thống. Nginx là một web server nó có thể serve files cho web user, files có thể bao gồm các loại định dạng như html, css, png, pdf, txt … Trước kia khi chưa có các framework ví dụ như Django, Rails. Cách phổ biến là dùng sử dụng web server để serve trực tiếp các file trong hệ thống.

Lưu ý : Khi chúng ta đưa code lên để deploy trên server, chúng ta nên kèm theo các file migrations. Tại sao lại vậy thì xin hãy đọc bài migrations trong ORM.

Dưới đây là cài đặt Gunicorn và nginx mà mình đã setup:
```shell
cd to_project_directory
mkdir -pv config/gunicorn/
```

```python: config/gunicorn/dev.py
"""Gunicorn *development* config file"""

# Django WSGI application path in pattern MODULE_NAME:VARIABLE_NAME
wsgi_app = "project.wsgi:application" #project : project_name
# The granularity of Error log outputs
loglevel = "debug"
# The number of worker processes for handling requests
workers = 2
# The socket to bind
bind = "0.0.0.0:8000"
# Restart workers when code changes (development only!)
reload = True
# Write access and error info to /var/log
accesslog = errorlog = "/var/log/gunicorn/dev.log"
# Redirect stdout/stderr to log file
capture_output = True
# PID file so you can easily fetch process ID
pidfile = "/var/run/gunicorn/dev.pid"
# Daemonize the Gunicorn process (detach & enter background)
daemon = True
```

```shell
# Make sure ubuntu can reaf and write log into folder
$ sudo mkdir -pv /var/{log,run}/gunicorn/
mkdir: created directory '/var/log/gunicorn/'
mkdir: created directory '/var/run/gunicorn/'
$ sudo chown -cR ubuntu:ubuntu /var/{log,run}/gunicorn/
changed ownership of '/var/log/gunicorn/' from root:root to ubuntu:ubuntu
changed ownership of '/var/run/gunicorn/' from root:root to ubuntu:ubuntu
```

```shell: etc/nginx/sites-enable/chat.conf
server {
  server_name               domainname.com;
  listen                    80;
  location / {
    proxy_pass              http://localhost:8000;
		proxy_set_header X-Client-IP $remote_addr;
    proxy_set_header        Host $host;
  }
	location /static/ {
	alias /var/www/blog/static;
	}
	location /media/ {
	alias /var/www/blog/media
	}
}
```
**Xin nhắc lại các bước Deploy một Django App**

1. Change debug from true to false in setting.py
2. Change allowed host = [* or domain] in setting.py
3. Change static_root and media root in setting.py
4. Run python migrations and migrate to update DB
5. Run to check app works : **python manage.py runserver**
6. Config Gunicorn
    1. Create file log, pid
    2. create file to store static and media
    3. changed ownership
7. Setup nginx
8. Run **python collect static files**
9. Run Gunicorn to start server


---

*Modified: May, 2023*
