---
title: 'My mistake when work with database - Part 1'
slug: {
  vn: "mistake-with-database-1",
  en: "mistake-with-database-1",
  id: "mistake-with-database-1"
}
date: 2023-09-18
description: 'About experience with database - Part 1'
keywords: 'technical, backend, web develop, database, postgresql'
tags: ['web', 'coding', 'django', 'technical', 'database', 'postgresql']
image: '/media/banners/bat.jpeg'
---

I'm a recent graduate from Hanoi University of Science and Technology, majoring in the Vietnamese-Japanese program. Just a few months after graduation, I took on the responsibility of developing products for a startup and led a team of about 7-10 people. Despite working diligently for over a year, I've realized that I've made many mistakes and have gaps in my knowledge. Recently, in addition to learning foreign languages, I've been focusing on studying these issues in-depth, and now I'd like to share my findings with everyone.

Because I have limited work experience compared to many others and have only relied on what I learned in school, I've made mistakes and learned from them. I hope that you can provide feedback to help me improve and contribute to the community's knowledge and expertise

### Database Mistakes Part 1 - Choosing and Setting

The database management system I use for all of our company's products is PostgreSQL, even though during my university days, I only knew and used MySQL and SQLite. Here are the reasons why I chose PostgreSQL. It depends on factors like the problem to be solved, features, finances, popularity, and knowledge

##### The problem
    Our company's website and app applications will primarily use raw data from Blockchain, including transactions, information about entities like blocks, tokens, blockchains, exchanges, investment funds, NFTs, and especially logs and traces from EVMs of blockchains like Ethereum and BSC Smartchain. So, we need to build a data repository capable of storing hundreds of millions of rows, which will be regularly inserted, fast reporting and infrequent deletions. For databases related to the applications, such as authentication and user data, there will be continuous adding, updating, and deleting (CRUD methods)

##### What PostgreSQL Provides
PostgreSQL can be used for both OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing) tasks.
1. Specifically, PostgreSQL supports ensuring the ACID properties (Atomicity, Consistency, Isolation, Durability) of transactions. With this feature, PostgreSQL can handle and fulfill the requirements I have for databases related to user applications effectively.
2. PostgreSQL can be used to build OLAP databases, which are databases designed for executing complex queries, performing extractions, and generating reports. Storing and retrieving data, which can reach several hundred million rows (logs, traces, blockchain transactions), is not a simple task! It's essential to ensure that the system can scale horizontally - scale out. PostgreSQL supports both scaling out methods with Master-Slave Replication and Distributed Databases (Citus Data). In fact, my team and I have implemented both of these approaches. In addition to its ability to handle large data storage, PostgreSQL provides techniques like views, functions, indexing, and partitioning, which are essential for executing complex queries and generating reports effectively
##### Cost, Popularity, and Knowledge
1. Many people might wonder why I've chosen to build something that's risky and doesn't guarantee results, especially when PostgreSQL seems outdated, and there are options like AWS Redshift or Google BigQuery that seem more secure. Well, the answer is MONEY. I've used Redshift before, and I know that AWS charges based on the complexity and resources used for each query—generally, it's costly. In the context of our company, it's a definite but not the most optimal choice. If I were working for giants like Google, AWS, Rakuten, Tiki, Zalo... these BIG CORPs, I might use these SaaS options because they prioritize many more critical factors over cost, and they can afford to take fewer risks!
2. PostgreSQL is open-source, so it's FREE, easy to access, has ample documentation, a large community, and most of the issues I encounter have likely been faced by someone else before. Whether they help or not is another story 🙂. Most developers have encountered PostgreSQL since their university days, and it's easy to pick up. On the other hand, RDBMS like Oracle may have more features, but they come at a cost and are less accessible to developers

#### Mistakes in Database Setting

[Can you make mistakes when setting PostgreSQL?] Many people might say, 'How can you make mistakes when installing it?' But the truth is, when you install it on your personal laptop, it's indeed straightforward and safe. No one questions it, and since your application runs on your laptop, there's no need to worry. You might think it's all easy, and this job is relaxed! However, when you install and operate a database server for your entire company, it's very different, and I've made many mistakes!

There are many topics to consider, but personally, when it comes to installing and operating database servers, I focus on the following areas

1. **Works** - Database operates correctly and sufficiently
2. **Security**
3. **High Availability, Failover, Backup, Recovery**
4. **Monitoring, Logging**
5. **Scalability**

Below are considerations and tasks I will perform for each of these categories, specifically with PostgreSQL. Others can adapt these for different database management systems.

###### Works - Database operates correctly and sufficiently
Operating correctly means: Access is possible, APIs work correctly, logs are accurate, and error logs correctly identify errors.

Operating sufficiently means: Hardware metrics such as CPU, RAM, Storage, and IO operate within expected ranges. Sometimes, even simple tasks can cause CPU and RAM usage to spike excessively, indicating an issue. Using too much memory is also a problem. Is the issue related to incorrect log settings, software or hardware versions, hardware choices, etc.?

In summary, both excessively high and low resource usage should raise questions. Only being just right is acceptable!

###### Security

This was the most challenging criterion for me at that time because I hadn't much attention to it and didn't have the mindset for it. After gaining experience, here are the steps I take:

1. Review the security architecture of the entire system. Which ports are Database Servers using for inbound and outbound connections? Which servers can access the Database Servers? What services do those servers represent? It's like revisiting the system architecture, but from a security perspective.

2. Check and learn about the security setup and operation of the infrastructure where the servers are located. Indeed, different infrastructures (like AWS with Security Groups, Vultr with Firewall, BizCloud, Longvan, etc.) have varying methods of configuration. Some security architectures may not be fully achievable on certain cloud services exactly as you intend.

3. For PostgreSQL, pay attention to files like pg_hba.conf and postgresql.conf. Have a thorough understanding of all the information in these two files
###### High Availability, Failover, Backup, Recovery
Why do we focus on ensuring High availability and Failover? Because in reality, system shutdowns and errors can happen unexpectedly and no one can guarantee they will never occur! What engineers aim to do is to ensure the system keeps running even when errors occur and to recover quickly if it shuts down. Here's what I pay attention to:

1. Set up daily data backups. Create a recurring job to regularly export and save data every day. Remember to delete old backups to avoid full storage. Backup files can be in formats like CSV or SQL, depending on your needs.

2. Check the Write-Ahead Log (WAL) file settings and storage operations regularly. All changes, including inserts, updates, and deletes in the database, are written to the WAL before they are applied to the data files. So, when the system crashes, you can use the WAL file to bring the database back from the dead. **If some developer accidentally deletes a table, stay calm, punch them in the face and then connect to the server to fix it before reconnecting them ( hehe 😉  )**
3. Create worst-case scenarios and test server crashes, accidental data deletions, server disconnections from the clusters... etc. Whether you're using a single database server or multiple ones, you need proactive disaster scenarios where servers fail. Review the settings and prepared solutions to see if they are appropriate. Usually, the first attempt won't be successful, so you should test all the disastrous scenarios before releasing your product to the public. If your product already has users, and the database server goes down, but the backup server doesn't take over immediately or isn't recovered in time, the consequences can be severe. There's a saying: 'Thao trường đổ mồ hôi, Chiến trường bớt đổ máu'
4. Keywords to research: **Wal file, base backup, continuous archiving, standby server, failover**. If I have time, I'll write more about this topic later. However, covering it in this post would make it too long.

###### Monitoring, Logging - Keeping an Eye on Things
In reality, very few people can access Database Servers. This doesn't provide much benefit, but it can introduce a lot of risks. However, monitoring and managing the activities of database servers is an essential task that many developers handle. Depending on the company's size and the monitoring team's capabilities, you'll decide what aspects of database server operations to watch and supervise.

I'll pay attention to the following information:

1. PostgreSQL server logs (events like start, stop, and database errors...) configured in the postgresql.conf. Additionally, there are Error logs, Query logs, pg_stat_statements, and pg_stat_activity to detect errors, performance issues, and remote threats to database servers.

2. You can use tools like Filebeat and Logstash to transport logs to a monitoring server. Since our team is small, and we have a limited budget for this, we use the ELK stack for monitoring. We're at a basic level, setting up alerts and monitoring. I know that many SaaS solutions on the market do this job better.

This section discusses monitoring and logging practices to ensure that the database servers are running smoothly and to be alerted about any issues.

###### Scalability

Don't wait until you need to scale up to think about scalability; plan for it from day one. I'll pay attention to the following things:

1. Create a checklist of tasks and ensure that scaling the database server doesn't cause disruptions, errors, or data loss across the entire database server cluster. Make sure everything goes as smoothly as possible. Whether it's a Master-Slave setup or a Distributed Database, when adding more servers to scale and balance the load, ensure that the addition doesn't cause any interruptions or require stopping and restarting the master server or coordinator server.

2. I've learned from experience that granting access to the master servers for specific IP addresses and having to restart the master server when adding them can be problematic. So, I've adopted the practice of assigning a range of IP addresses (Private IP) to a list of servers or a group of servers with similar functions (creating a virtual LAN for clusters).

3. Simulate scenarios where you lose connection to the master server or the coordinator, or where the master server or coordinator server fails. Test all these scenarios before officially deploying them.


In my upcoming posts, I'll discuss mistakes in database design (naming, table design, relationships, indexing), issues when operating a database (like N+1, Max Connections...), and my mistakes when using Master-Slave and Citus Data.

---
These skills are mainly self-learned and gained through experience, but it wouldn't have been possible without the help, opportunities and guidance from the CEO, the development team, your professors like Ms. Trinh who taught Data Modeling, and Ms. Trang who taught Object-Oriented Programming (OOP), as well as institutions like ITSS at Hanoi University of Science and Technology (HUST)
