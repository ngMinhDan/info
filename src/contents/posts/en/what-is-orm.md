---
title: 'What is ORM'
slug: {
  en: 'what-is-orm',
  id: 'what-is-orm',
  vn: 'what-is-orm'
}
date: 2023-01-10
description: 'My explain about ORM and ORM in Django Framework'
keywords: 'technical, database'
tags: ['technical', 'database', 'basic']
image: '/media/banners/2.jpg'
---

### What is ORM

ORM stands for Object Relational Mapping, it is a programming technique that allows you to interact with a relational database using high level programming constructs, such as objects and class instead writing raw SQL queries.

1. **Object Relational Mapping Concept**. ORM is a programming paradigm that bridges the gap between the object oriented world of programming languages and the relational world of database. It allows you to work with database entities (tables, rows ) as if they were objects in your programming language
2. **Mapping Objects to Tables**. In ORM, you define classes (objects) that correspond to database tables. Each attribute of the class corresponds to a column in the table, and each instance of the class represents a row in a table
3. **CRUD Operations**. ORM provides methods to perform Create, Update, Read, Delete operations on the objects. These operations are translated into SQL queries that interact with the database
4. **Abstraction of SQL**. You can not writing SQL queries, you use methods provided by the ORM to perform database operations
5. **Data conversion and Validation.** ORM handles data type conversion and validation between your programming languages’s data types and database data types. This ensures that the data you insert or retrieve is consistent. This advantages is very very good, if you work with many types of programming’s type and database’s type
6. **Relationships**. ORM systems provide wats to define and work with relationships between objects, like one-to-one, one-to-many, many-to-many relationships. These relationships are translated into SQL relationships between tables.
7. **Migrations.** Many ORM frameworks offer migrations tools that allow you to update database schema as your model evolves over time. Migrations generate SQL scrips to modify the database structure

## Question :

**Q: When i am faced with a requirement that involves complex SQL logic and the ORM’s abstraction does not directly provide the necessary solution ? How can i custom ?**

A: You can easily custom class method with Sql, this is example in Django

```python
# Model.py

from django.db import models
from django.db import connection

class Book(models.Model):
    # Fields and methods as shown above ....

    @classmethod
    def books_by_author(cls, author_name):
        query = """
            SELECT title
            FROM myapp_book
            WHERE author = %s
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [author_name])
            results = [row[0] for row in cursor.fetchall()]

        return results

# View.py

# Assuming this is in your views.py or somewhere else in your app
from django.shortcuts import render
from myapp.models import Book

def books_by_author_view(request, author_name):
    books = Book.books_by_author(author_name) # use method here
    context = {'books': books, 'author_name': author_name}
    return render(request, 'myapp/books_by_author.html', context)
```

**Q: What is concept of migrations**

1. **Model Definitions** - Define your data model using classes, structs…
2. **Migrations Files** - When you make changes to your model, adding a new field, rename…. you will create migration files. These files are scripts that describe how to apply or revert the changes to the database schema
3. **Applying Migrations**  - Use a migration tool or framework command to apply the migration files to the database. The tool changes and generates the SQL to modify the schema
4. **Database Update** - The generated SQL statements are executed on the database
5. **Version Control** -  Migrations files are often versioned along with our application code. This ensures that schema changes are tracked and synchronized across different environments
6. **Rollback and Revert**: Migrations usually support rollback or revert functionality. We can revert the database

Q: I can delete migrations or ignore migrations when deploy ? Because I have latest model in my code

A: We **should not delete or ignore migrations files**, Because :

1. **History and Consistency**. Migrations files act as a history of all the changes you have made to your database schema. If you delete them, you will lose the ability to track changes and ensure consistency between environments
2. **Rollbacks** : Migrations are designed to support rolling back changes. If you delete, you won’t be able to revert to previous state of your database schema
3. **Data Integrity** : Migrations not only change the structure of your database but can also include data migrations that transform existing data. Deleting migrations might result in data inconsistencies or loss

    Example : You want a field to be False for every record. You create a new field with default=False, in this case all field will be False. Then you decide to change the field the Default to True. The current fields are still marked as False since you ran that migration first. If you would not commit and save migration files, all fields would be True since the production server would not know that it was False previously. And your development and production data is not same.

    Django recommend including migrations files as they are part of the code base.

    > The migration files for each app live in a “migrations” directory inside of that app, and are designed to be committed to, and distributed as part of, its codebase. You should be making them once on your development machine and then running the same migrations on your colleagues’ machines, your staging machines, and eventually your production machines.
    >
---

*Modified: May, 2023*
