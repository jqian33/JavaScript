// This file contains utility functions to manage JavaScript array. 
// Such as sorting, binary insert and binary search.

var exports = module.exports = {};

exports.searchIndex = function(list, item) {
    return recursiveBinarySearch(list, item, 0, list.length-1);
}

// https://machinesaredigging.com/2014/04/27/binary-insert-how-to-keep-an-array-sorted-as-you-insert-data-in-it/
exports.binaryInsert = function (value, array, startVal, endVal) {
    recursiveBinaryInsert(value, array, startVal, endVal);
}

exports.sort = function (list) {
    list.sort(function(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a == b ) return 0;
        return a < b ? -1 : 1;
    });
}

function recursiveBinaryInsert (value, array, startVal, endVal) {
    var length = array.length;
    var start = typeof(startVal) != 'undefined' ? startVal : 0;
    var end = typeof(endVal) != 'undefined' ? endVal : length - 1;//!! endVal could be 0 don't use || syntax
    var m = start + Math.floor((end - start)/2);
    
    if(length == 0){
        array.push(value);
        return;
    }

    if(value.toLowerCase() > array[end].toLowerCase()){
        array.splice(end + 1, 0, value);
        return;
    }

    if(value.toLowerCase() < array[start].toLowerCase()){
        array.splice(start, 0, value);
        return;
    }

    if(start >= end){
        return;
    }

    if(value.toLowerCase() < array[m].toLowerCase()){
        recursiveBinaryInsert(value, array, start, m - 1);
        return;
    }

    if(value.toLowerCase() > array[m].toLowerCase()){
        recursiveBinaryInsert(value, array, m + 1, end);
        return;
    }

    //we don't insert duplicates
}

// https://github.com/addyosmani/recursive-binarysearch/blob/master/index.js
function recursiveBinarySearch(array, key, left, right) {
    if (left > right) {
        return -1;
    }
    var middle = Math.floor((right + left) / 2);
    if (array[middle].toLowerCase() === key.toLowerCase()) {
        return middle;
    } 
    else if (array[middle].toLowerCase() > key.toLowerCase()) {
        return recursiveBinarySearch(array, key, left, middle - 1);
    } 
    else {
        return recursiveBinarySearch(array, key, middle + 1, right);
    }
}


