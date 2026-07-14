---
title: "Database Pages: The Fundamental Unit of Storage"
date: "2024-12-15"
description: "Understanding how databases store data in pages — the fundamental building block that shapes everything from indexes to sharding."
tags: ["database", "storage", "pages", "buffer-pool", "sharding", "fundamentals"]
readTime: "8 min read"
---

I was learning about Sharding from first principles and strategies and all. just when I stumbled upon this basic thing called Page the smallest unit of storage management that the database engine works with to read or write data from disk.
Our SSD/HDD stores files as raw bytes, but the database engine doesn’t read one byte at a time - that would be incredibly inefficient. Instead, it carves up its data files into fixed-size blocks called pages. MySQL InnoDB uses 16KB pages (show in image), PostgreSQL uses 8KB by default.

Imagine it like; when we go to library for some quotes/sentence it doesn’t let us borrow individual sentences from a book — we must borrow the entire page. Even if we only want 1 sentence on that page, we still get the full page.
That’s exactly how a database works with disk reads.

This single design decision — reading and writing data in pages instead of individual bytes — shapes almost every major database concept you’ll encounter later: indexes, caching, transactions, replication, and even sharding.

* Page header - Contains metadata like page ID, checksum, free space pointer, which table it belongs to.
* Row slots - Alice (id - 1), Bod (id - 2), each stored as a binary encoded tuple
* Free space - unused bytes at the bottom, reserved for future inserts.

Why does database read in full pages?
Because disks are not byte-addressable in practice.
Even though our OS can read individual bytes, doing so is catastrophically wasteful.
- An SSD’s internal architecture is optimised for block-level access (typically 4KB minimum read units at hardware level)
- The OS itself uses a virtual memory system with its own 4KB pages
- And reading 16KB is only marginally more expensive than reading 1 byte, because the fixed latency is dominated by the overhead of the i/o operation, not the transfer size.

So the databases says: “If I’m paying the cost of a disk read anyway, let me grab as much useful data as possible in one shot. — I.e. 16KB page.”

The buffer pool: Pages in RAM
The database never works with data directly on disk. The flow is always:
Query arrives
     ↓
Database checks the Buffer Pool (RAM cache of pages)
     ↓
Is page 5 already in RAM?
  ├── YES → read Carol's row directly from RAM   ← fast (nanoseconds)
  └── NO  → load page 5 from SSD into buffer pool, THEN read  ← slow (microseconds–milliseconds)

[@/assests/blogs/Page 5 - 16 KB on disk](Page 5 - 16 KB on disk)

The buffer pool caches recently/frequently accessed pages. Indexes help reduce the number of pages a query needs, indirectly improving cache efficiency.

Buffer pool for different db’s:-
| MySQL | InnoDB |
| PostgreSQL | Shared buffers |
| MongoDB | WiredTIger Cache |
| Cassandra | OS Page Cache |
| Redis | In Memory |

Why this matters for Sharding and scale?
This page model is the root cause of why scaling a database is hard:
| Problem | Root Cause |
| Slow queries without indexes | Must load too many pages |
| RAM is precious	| Buffer pool can only cache so many pages |
| Write performance degrades | Each write updates the row's page + index pages (multiple I/Os) |
| Large tables = large files = many pages | Eventually doesn't fit on one machine's disk |

The last point — Large table = many pages = large files — is exactly why sharding exists. Instead of storing every row on a single machine, the table is partitioned acrosss multiple machines using a shard key (e.g., user_id). Each shard manages its own subset of rows and organises them into its own pages. A routing layer determines which shard to query, while the B-tree index on that shard locates the required page.

One liner mental model: A database is a system that efficiently manages which pages are on disk, which are in RAM, and which page contains the row we’re looking for. 

Everything in a database — indexes, caching , transactions, replication and sharding — is ultimately an optimisation of one question: How do we minimise expensive disk I/O while finding the right data?

Remember Redis is the one major exception — its stores all data directly in RAM, not on disk pages (persistently). There are no pages to load because the entire dataset lives in memory. Disk is only used for snapshots (RDB) and append-only logs (AOF) for recovery — not for primary data access.

Since Redis serves data directly from memory, it avoids the disk I/O involved in loading pages, making it dramatically faster for many read-heavy workloads.

The Page concept is universal across all databases that touch disk. Nearly every disk-based database solves the same fundamental problem: disk is slow, RAM is fast, so keep hot pages in RAM.

Thats’s all let’s meet in next blog.