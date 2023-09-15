---
title: 'Standard naming conventions in Python'
slug: {
  en: "standard-naming-convetion-python",
  id: "standard-naming-convetion-python",
  vn: "standard-naming-convetion-python"
}
date: 2022-05-07
description: 'Naming in Python Project'
keywords: 'technical, backend, web develop'
tags: ['web', 'coding', 'django', 'technical']
image: '/media/banners/1.jpg'
---

To become a **good Python developer** involves not only mastering the technical aspects of the language but also adhering to best practices and conventions. Consistent and well-followed naming conventions make your code more readable and maintainable, which is crucial in a collaborative and professional development environment. Below, there are some widely standard naming conventions in Python i am using in Project for company and myself follow PEP8

### Variable and Function Names

1. Use lowercase letters
2. Separate words with underscores like (`snake_case`)
3. Choose descriptive and meaningful names like `counter`, `user_name`, `calculate_average`

### Constant Names and Enums

1. Use uppercase letters
2. Separate words with underscores (`UPPER_CASE_WITH_UNDERSCORES`)
3. Use for values that don’t change during the program’s execution like `MAX_VALUE`, `PI`, `DEFAULT_TIMEOUT, MAX_CONNECTIONS, RED, STATUS`

### Class Names

1. Use CamelCase capitalize the first letter of each word
2. Choose nouns or noun phrases for class names like `Car`, `StudentRecord`, `HttpRequest`,

### Module Names

1. Use lowercase letters
2. Separate words with underscores (`snake_case`)
3. Choose descriptive names
4. Avoid using names of built-in modules or standard library modules
5. Examples: `file_utils.py`, `data_processing.py`

### Package Names

1. Use lowercase letters
2. Avoid underscores if possible
3. Choose short, meaningful names
4. Avoid using name of standard library modules or built-in names

### Method names = Function

1. Use lowercase letters, snake_case, use verbs or verb phrases like `calculate_average`, `process_data`

### Private Names:

1. Start with underscore (`_`) followed by lowercase letters.
2. Examples: `_private_variable`, `_internal_method`.

### Acronyms and Abbreviations

1. Use uppercase for two-letter acronyms, but lowercase for longer acronyms (e.g., `HTTP`, `url`).
2. Avoid using ambiguous abbreviations.

**Imports:**

1. Use separate lines for each import statement.
2. Import standard library modules first, then third-party modules, and finally your own modules.

### Indentation and Line Length

1. Use 4 spaces or tab ( You can setup tab = 4 spaces on IDE)
2. Keep lines below 79 characters for code and 72 characters for docstrings and comments.
3. If necessary, you can extend lines with proper alignment.

Here's an example of a project structure that better adheres to PEP 8 naming conventions:

```bash
my_project/
├── package/
│   ├── __init__.py
│   ├── module1.py
│   └── module2.py
├── scripts/
│   ├── script1.py
│   ├── script2.py
│   └── helper_module.py
├── tests/
│   ├── test_module1.py
│   └── test_module2.py
└── main.py
```

### References

1. https://peps.python.org/pep-0008/

---
*Modified: May, 2022*
