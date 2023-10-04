---
title: 'Scale database with Master-Slave architecture'
slug: {
  vn: "scale-database-with-master-slave",
  en: "scale-database-with-master-slave",
  id: "scale-database-with-master-slave"
}
date: 2023-10-01
description: 'About with Master-Slave architecture'
keywords: 'technical, backend, database'
tags: ['system', 'coding', 'database', 'technical', 'scale', 'business growth']
image: '/media/banners/1.jpg'
---

After the first post about [mistakes when working with databases](https://nmdan.com/blog/mistake-with-database-1), I received a lot of positive feedback from my Facebook account and the Design System group. They also provided suggestions on how to write, the content, and how to organize the posts to make them more engaging. I really appreciate those contributions and there will be more specific changes.
From now, my posts will try to focus on presenting one topic, instead of trying to cover everything in one post. This week, I'm sharing about "Scale databases with a Master-Slave architecture"

#### Problem

When we start, we and everyone else usually code on our personal computers, and everything is set up there. Then we move on to separating the code logic on one server and the database on another server.
In reality, there's nothing wrong with this approach and it's entirely correct if your business or personal operations run smoothly with reasonable operational costs or if the applications are not overly complex. In such cases, scaling up or making changes might not be necessary.

![](/media/blog/scale-database-with-master-slave/simple.png)

However, when a business aims to achieve the following, engineers will need to implement system expansion (scaling the backend, scaling the database). In this article, I will share about scaling the database with a Master-Slave architecture:

1. **Concurrency** - When you want your product to handle concurrent usage by multiple users effectively, allowing multiple read and write operations to the database simultaneously.
2. **Load** - Many users access the system, there is a large amount of data, causing the database to respond slowly. You want to avoid this or reduce response times.
3. **High Availability** - You want your application to keep running no matter what happens. If one server fails, another must immediately take over.

When you want to slove the issues mentioned above, we will need to scale the database, in this article, we will discuss scaling the database with a Master-Slave architecture. (However, it's important to note **that this architecture may not entirely solve all the issues perfectly - 100%** ~ let's explore together)

#### What is Master-Slave
1. Master: This is the primary server responsible for actions like insert, update, and delete, collectively known as "WRITE" operations.
2. Slave: These are copies of the master server, also called replicas. They copy data and are updated through replication. "READ" operations can be performed on slave servers. **This means that all read operations can now be executed on the slave servers or slave nodes, reducing the load on the master server**

From the definitions above, we can conclude:
1. The master handles both READ and WRITE operations.
2. Slaves only allow READ operations. But why only READ? Let's explore how replication works

#### Master-Slave Replication Workflow
1. Initialization: Initially, a full copy of the master database needs to be created on the slave servers. This process can be called as snapshotting. For databases larger than a few gigabytes, this process can be time-consuming and requires waiting.

2. Replication Logs: As mentioned in the previous post, actions taken before actual changes are made to the data are recorded in a Write-Ahead Log (WAL) file. These WAL files are generated on the master server and sent to the slave nodes. Changes in the WAL file are then updated on the slave servers.

When I researched into this and applying it to a product at my company, I became concerned about the fragility of streaming these WAL log files. There are some issues:
1. What happens if there is an interruption or complete stoppage of sending and receiving WAL files? How can we detect and control this?
2. If the sending and receiving of these WAL files are slow, it can result in inconsistencies between the two databases
in reality, two databases are not exactly the same 100%. This significantly impacts user experience and is often referred to as result inconsistency.

At this point, there are **two replication modes** to address some of these concerns.

**Replication Mode:**
1. **Synchronous Replication**: In this mode, the master server will "wait" until WRITE actions have been successfully replicated on all the slave nodes (all WAL files received) before executing the WRITE. This ensures no inconsistency.

2. **Asynchronous Replication**: In this mode, the master server doesn't concern itself with whether the slave servers have synchronized data or not. It immediately executes. This can lead to "inconsistency"

My Mistake: I once designed and confidently applied **synchronous replication** to ensure no "inconsistencies," but it gave rise to another issue.
I had 3 slave servers, or 3 nodes, and one master node. According to theory, when a WRITE action occurs, the master sends the WAL to the slave nodes. It waits until all 3 slave nodes have synchronized before executing the command. This resulted in a DELAY - **increased LATENCY in WRITE actions**.

However, if ONE OUT OF THE 3 NODES fails to synchronize, a problem occurs. The **ACTION WILL CONTINUE TO WAIT AND WILL NOT BE EXECUTED ON EITHER THE MASTER OR ANY NODE**.
This is a **SINGLE POINT OF FAILURE**.

![](/media/blog/scale-database-with-master-slave/dif.png)


#### Hot standby

Hot standby is a technique where a standby server (a slave node) is ready to replace the master server when the current master server encounters issues. It ensures high availability and serves as a fault-tolerance strategy in a database system.
Setting up hot standby is not particularly difficult, and there are better guides available online. Just pay attention to the following:

1. Ensure that the master server and slave servers are configured to communicate with each other.
2. Set up the standby mode, trigger_file, and master information on the designated slave server.

However, the process of transitioning from a standby server or slave node to a master can take some time, so it doesn't guarantee 100% high availability.

#### Conclusion
At this point, I think there are three main questions that people might have if they want to apply this architecture in production:

1. How to manage and monitor replication (streaming files) to know when there are errors, delays, etc.
2. Design and code at the application layer to optimize READ and WRITE operations separately.
3. Design and code at the application layer to switch to using the standby server when the master encounters issues, instead of accessing the master directly.

---

*Modified: Oct, 2023*
