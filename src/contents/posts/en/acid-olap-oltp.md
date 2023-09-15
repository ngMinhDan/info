---
title: 'What is ACID ? OLAP ? OLTP ? '
slug: {
  en: "acid-olap-oltp",
  id: "acid-olap-oltp",
  vn: "acid-olap-oltp"
}
date: 2023-01-01
description: 'My explain about ACID in Database and OLAP, OLTP'
keywords: 'technical, database'
tags: ['technical', 'database', 'basic']
image: '/media/banners/2.jpg'
---
## ACID ? What is this ?

ACID ? What is this mean ? Before we want to understand What ACID is ? We need to know one important thing that is transaction

#### What is a transaction ?

In the context of database and data storage systems, a transaction is any operation that is treated as single unit of work, which either completes fully or does not complete at all, and leaves the storage system in a consistent state. Transactions access data using read and write operations. In order to maintain consistency in a database, before and after the transaction, certain properties are followed. **These are called ACID properties**

#### ACID Properties

ACID is a set of 4 key properties that define a transaction:

1. **Atomicity**
2. **Consistency**
3. **Isolation**
4. **Durability**

If a database operation has these ACID properties, it can be called an **ACID transaction**, and data storage systems that apply these operations are called **transactional systems**.

##### Atomicity

Each statement in a transaction ( to read, write, update, delete) is treated as a single unit. Either transaction takes place at once or doesn’t happen at all. There is no mid way, transactions do not occur partially. Each transaction is considered as one unit and either run to completion or is not executed at all. It involves the following two operations

1. **Abort**. If a transaction aborts, changes made to the database are not visible
2. **Commit**. If a transaction commits, changes made are visible

Atomicity is also know as “All or nothing rule”

##### Consistency

This mean that integrity constrains must be maintained so that the database is consistent before and after transaction. It refers to the correctness of a database. Ensure that transaction only make changes to table in predefined, predictable ways.

##### Isolation

When multiple user are reading and writing form the table all at once, isolation of their transactions ensures that the concurrent transaction **don’t interfere with or affect one another.**

##### Durability

Ensures that changes to your data made by successfully executed transactions will be saved, even in the event of system failure

#### Advantages of ACID properties

1. Data consistency. ACID properties ensure that the data remains consistent and accurate after any transaction
2. Data integrity. Ensure that any changes to the database are permanent and cannot be lost
3. Concurrency Control.
4. Recovery. ACID properties ensure that in case of any failure or crash, the system can recover the data up to the point of failure or crash

#### Disadvantages of ACID properties

1. **Performance**, ACID properties can cause a performance overhead in the system, as they require additional processing to ensure data consistency and integrity
2. **Scalability**, system may cause scalability issues in large distributed system where multiple transactions occur concurrently. I had the same problem when i scale database Postgres, I will share in article future.
3. **Complexity**

#### Real World Database Management System

Most Relational Database Management System - RDBMS are designed to adhere to the ACID properties. For example :

1. MySQL
2. PostgresSQL
3. Oracle Database
4. SQLite

However, we know disadvantages of ACID properties above, NoSQL Database are not uniform in their adherence to ACID properties. Some NoSQL database prioritize certain aspects of the ACID properties while relaxing others to achieve different goals, such as scalability and availability

1. **MongoDB** did not provide full ACID guarantees for all operations.
2. **Cassandra**. Apache Cassandra is a distributed noSQL database known for its scalability and high availability. Cassandra prioritizes availability and partition tolerance over strict consistency, which means it may not always fully adhere to the ACID properties.
3. **Amazon DynamoDB**

The ACID (Atomicity, Consistency, Isolation, Durability) properties are relevant in both **OLAP** (Online Analytical Processing) and **OLTP** (Online Transaction Processing) systems, but we are often emphasized more in **OLTP systems** due to their focus on **transactional data integrity**.

### OLTP (Online Transaction Processing) Systems

OLTP systems are designed to handle real-time transactional operations, such as updating, inserting, or deleting small amounts of data. These systems are used for day-to-day business operations, such as order processing, inventory management, and customer interactions. A**CID properties** are particularly crucial in OLTP systems because they ensure that transactions are carried out reliably and consistently, maintaining data integrity.

### OLAP (Online Analytical Processing) Systems

OLAP systems are used for complex analysis and reporting on historical data. These systems focus on **querying large datasets** to gain **insights and make strategic decisions**. While ACID properties are still important, OLAP systems might prioritize other factors, such as query **performance and data aggregation**, over strict transactional guarantees. OLAP systems often involve **read-heavy operations** and might not require the same level of transactional consistency as OLTP systems.


---

*Modified: May, 2023*
