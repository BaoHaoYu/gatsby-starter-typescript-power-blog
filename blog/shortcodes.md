---
title: "Shortcodes"
date: "2020-01-01"
description: tabs, code-tabs, expand, alert, warning, notice, img, box
draft: false
hideToc: false
enableToc: true
enableTocContent: true
tocPosition: inner
banner: http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_DODWl7Z8yW.png
tags:
    - shortcode
categories:
    - demo
---

## H2
dd  
ddd  
dd  
dd  
ddd  
dd  
dd  
dd  
dd  
ddd  
dd  
dd  
ddd  
dd  
dd  
dd  
### H3
dd  
ddd  
dd  
dd  
ddd  
dd  
dd  
dd  
dd  
ddd  
dd  
dd  
ddd  
dd  
dd  
dd  
#### H4-1
dd  
ddd  
dd  
dd  
ddd  
dd  
dd  
dd  
dd  
ddd  
dd  
dd  
ddd  
dd  
dd  
dd  
#### H4-2

#### H4-3

##### H5

## Markdownify box

{{< boxmd >}}
This is **boxmd** shortcode
{{< /boxmd >}}

## Simple box

{{< box >}}
This is **box** shortcode
{{< /box >}}

## Table

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Code tabs

Make it easy to switch between different code

{{< codes java javascript >}}
  {{< code >}}
  ```java
  System.out.println('Hello World!');
  ```
  {{< /code >}}

  {{< code >}}
  ```javascript
  console.log('Hello World!');
  ```
  {{< /code >}}
{{< /codes >}}

## Tabs for general purpose

{{< tabs Windows MacOS Ubuntu >}}

{{< tab >}}
### Windows section

```javascript
console.log('Hello World!');
```

⚠️Becareful that the content in the tab should be different from each other. The tab makes unique id hashes depending on the tab contents. So, If you just copy-paste the tabs with multiple times, since it has the same contents, the tab will not work.
{{< /tab >}}

{{< tab >}}
### MacOS section

Hello world!
{{< /tab >}}

{{< tab >}}
### Ubuntu section
Great!
{{< /tab >}}

{{< /tabs >}}

## Expand

{{< expand "Expand me" >}}

### Title

contents

{{< /expand >}}

{{< expand "Expand me2" >}}

### Title2

contents2

{{< /expand >}}

## Alert

Colored box

{{< alert theme="warning" >}}
**this** is a text
{{< /alert >}}

{{< alert theme="info" >}}
**this** is a text
{{< /alert >}}

{{< alert theme="success" >}}
**this** is a text
{{< /alert >}}

{{< alert theme="danger" >}}
**this** is a text
{{< /alert >}}

## Notice

{{< notice success >}}
success text
{{< /notice >}}

{{< notice info >}}
info text
{{< /notice >}}

{{< notice warning >}}
warning text
{{< /notice >}}

{{< notice error >}}
error text
{{< /notice >}}
