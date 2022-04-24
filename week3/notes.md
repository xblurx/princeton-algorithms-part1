# Mergesort  
## Divide and conquer recurrence  

How many steps it takes to divide until the base case? It's the number of times you divide n by 2 to get down to 2 that is exactly log base 2 of n.  

![Divide and conquer](./images/divide_conquer.png)

## Mergesort improvements

Mergesort is too complicated to use for small arrays. It adds a lot of overhead to create subarrays. So the first improvement is to use insertion sort for small subarrays. The second improvement we can make is just stop and not proceed merge when array is part sorted, for example when we have an array where a last element in a first half is less or equal to the smallest element in the second half ([1, 2, 3, **4**, **5**, 6, 7, 8]).