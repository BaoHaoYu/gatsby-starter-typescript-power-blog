---
title: msyql错误
date: 2019-10-11 12:13:08
tags:
  - 编程
  - mysql
  - bug
type: 'categories'
categories:
  - 编程
  - mysql
---

```log
Starting MySQLCouldn't find MySQL server (/usr/local/mysql/[FAILED]ld_safe)
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_4hUCGAbXy0.png)
配置/etc/my.cnf

<!--more-->

---

```log
./bin/mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory
```

请执行`yum install -y libaio`

---

```log
The server quit without updating PID file (/opt/env/mysql-8[FAILED]nux-glibc2.12-x86_64/data/iZwz9e6rwf3jatahbux3o6Z.pid)
```

1.内存不足
日志
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_lU5ceLenWB.png)

```log
2019-10-11T03:15:14.629113Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2019-10-11T03:15:14.629256Z 0 [Note] --secure-file-priv is set to NULL. Operations related to importing and exporting data are disabled
2019-10-11T03:15:14.629287Z 0 [Note] /opt/env/mysql/bin/mysqld (mysqld 5.7.27) starting as process 15830 ...
2019-10-11T03:15:14.633733Z 0 [Note] InnoDB: PUNCH HOLE support available
2019-10-11T03:15:14.633756Z 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2019-10-11T03:15:14.633760Z 0 [Note] InnoDB: Uses event mutexes
2019-10-11T03:15:14.633764Z 0 [Note] InnoDB: GCC builtin __sync_synchronize() is used for memory barrier
2019-10-11T03:15:14.633767Z 0 [Note] InnoDB: Compressed tables use zlib 1.2.11
2019-10-11T03:15:14.633770Z 0 [Note] InnoDB: Using Linux native AIO
2019-10-11T03:15:14.637735Z 0 [Note] InnoDB: Number of pools: 1
2019-10-11T03:15:14.637835Z 0 [Note] InnoDB: Using CPU crc32 instructions
2019-10-11T03:15:14.639255Z 0 [Note] InnoDB: Initializing buffer pool, total size = 128M, instances = 1, chunk size = 128M
2019-10-11T03:15:14.639284Z 0 [ERROR] InnoDB: mmap(137428992 bytes) failed; errno 12
2019-10-11T03:15:14.639291Z 0 [ERROR] InnoDB: Cannot allocate memory for the buffer pool
2019-10-11T03:15:14.639296Z 0 [ERROR] InnoDB: Plugin initialization aborted with error Generic error
2019-10-11T03:15:14.639301Z 0 [ERROR] Plugin 'InnoDB' init function returned error.
2019-10-11T03:15:14.639306Z 0 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2019-10-11T03:15:14.639311Z 0 [ERROR] Failed to initialize builtin plugins.
2019-10-11T03:15:14.639316Z 0 [ERROR] Aborting

2019-10-11T03:15:14.639323Z 0 [Note] Binlog end
2019-10-11T03:15:14.639632Z 0 [Note] /opt/env/mysql/bin/mysqld: Shutdown complete
```

分析  
个人网站选了个乞丐版 512MB 内存导致内存不足
