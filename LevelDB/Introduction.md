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

### How does it work?

<img src="/assets/images/levelDB/howdoesitwork.jpg" />

The idea is to do much work in memory and **write new/modified data as new files** (not modifying existing disk data) in batches (doing only sequential reading and writing).

In more detail: 
- There are many 2Mb files each containing sorted by key key-value pairs. 
- These files logically divided into 7 levels each 10 times larger than the previous. 
- Level_0 is data in memory. 
- So for example `level1` may consist of 3 files: file1_l1 contains keys in the range 50-70, file2_l1 90-110, file3_l1 200-250; `level2` consists of 30 files containing keys file1_l2 30-60, file2_l2 110-210 and so on. 
- All data modification that arrive happen in level_0 (ram) and then when it's full are merged with level_1. 
- To merge, all files that have overlapping key-ranges from level_1 with level_0 are read into memory, data is merged (deletes are just marks) and the new files are written to level_1. 
- Then once in a while similar thing happens with level_1 and level_2 (updates travel from level_i to level_i+1 in background processes). 
- <span style="background-color: #C2FFD6">So when iterating (or looking for keys) younger levels are consulted first since they may contain fresher changes.</span>
- The need for 7 layers (and not just 2) comes from the fact that bigger difference in sizes between level i and level i+1 the more data we need to read/write while merging them (if level i+1 much larger than i then the keys from i may belong to many files in i+1 and this needs to be small to fit in memory).
### References:

- [Demystifying LevelDB](https://blog.senx.io/demystifying-leveldb/)
- [How does LevelDB work?](https://www.quora.com/How-does-LevelDB-workgo)