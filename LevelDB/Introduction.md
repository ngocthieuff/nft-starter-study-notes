# Demystifying LevelDB

<img src="/assets/images/levelDB/LevelDB.png" />

### Overview:

#### 1. Sorting String Table SST:
   
Data pushed to LevelDB ends up in files called SST files, Sorting String Table. 
An SST is a :ab: lexicographically sorted list of key/value pairs, where both keys and values are **byte arrays**. 

SST files are **immutable**, meaning that once created they will not be altered. *They may be removed during a process called `compaction`*. :boom:

<sub style="background-color: pink">SST files are all the files with the suffix **.sst** in your leveldb directory. SST files are organized in levels.</sub>

#### 2. Log-Structured Merge-Tree architecture:

Having a <span style="color: #081E5D; font-weight: bold">Log-Structured Merge-Tree</span> architecture, LevelDB does not store data directly in SST files. It stores new key/value pairs mutations (either additions or deletions) <span style="color: #081E5D; font-weight: bold">in a log file</span>. 
<sub style="background-color: pink">This log file is the file with the **.log** suffix in your leveldb directory.</sub> 

The data stored in the log file is also stored in a memory structure called the **memtable**.:blue_heart:

#### 3. The previous memtable is discarded:

When the log file reaches a certain size (around 4 MB), its content is <span style="background-color: #C8EFFF">transferred to a new SST file and a new log file and memtable are initiated</span>, <span style="color: #081E5D; font-weight: bold">the previous memtable is discarded</span>. 

Those **fresh SST files** are collectively called the **level 0 files**. 

Files at level 0 are special because their keys can overlap, since they are simply copies of the various log files.

#### 4. Compaction:

<span style="background-color: #C2FFD6">When the number of files at level 0 reaches a threshold (around 10 files), a <span style="color: #081E5D; font-weight: bold">compaction</span> is triggered.</span>

<sub>As mentioned above: They may be removed during a process called `compaction`</sub>

Compaction will choose a set of overlapping files at level 0 and a set of files they overlap at the next level (level 1) and will merge the data in those files to create a new set of SST files at level 1. The chosen SST files are then discarded. :skull:

#### 5. Manage Files:

LevelDB continuously inspects files at each level and triggers compactions when the number of files or the total size at a given level goes beyond a set threshold. 

**LevelDB manages 7 levels of files**. 

The list of current SST files is kept in a `MANIFEST` file. 
The id of the current `MANIFEST` file is stored in the `CURRENT` file.

When reading data, the set of SST files to access is retrieved from the data in the `MANIFEST`, and the required files are opened and the data to read is reconciled from those files and the current memtable, managing overwrites and deletions.

All operations performed on the SST, log and `MANIFEST` files are logged in the `LOG` file.

### Understanding the LevelDB LOG entries



### References:

- [Demystifying LevelDB](https://blog.senx.io/demystifying-leveldb/)