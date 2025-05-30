# JAVASCRIPT FUNCTIONALITY

## What to include?

- Get document from the dom

### Start by setting navigation functionality

#### navigation objective

Here I am going to dynamically get the links container height using Element.getBoundingClientRect() method to return the element height, so that the links height is calculated based on the number of links that I have on the navigation bar. Without getting the height automatically, I may face issues of having to manually update the height anytime I add or remove a navlink. Here's how to fix it;

#### solution

- set css height to auto !important; for large screens

- add the ul inside a parent div and set the div height to 0, I will calculate the ul height and give it to the container div
- then create var for the container div & ul heights
-use getBoundingClientRect().height to get height
- check if containerHeight === 0, if yes linkscontainer.style.height = `${linkHeight}.px`; else 
linkscontainer.style.height = 0;
THis function will automatically get the height & remove it when needed.

### Set the date to update dynamically

#### Date objective

 I will set the date to automatically update according to the current year by first;

#### Date solution

- initialize date var
- date.innerHTML = new Date().getFullYer();

### Fixed nav bar

#### Problem to fix

I will add a navbar that automatically appear and remain fixed when the page scroll past a specified length

#### The solution

- First add scroll event listener to window
- listen for pageYoffset which return the pixel the doc has vertically scrolled by
- add a class when it reaches the scroll width
- create scrollHeight & init window.pageoffset
- get navbarheight
- if scrollheight > navheight add classList("fixed-nav") to navbar else remove the classList
-

#### select links

#### add dark mode

 --clr-1:#00CCFF;/*skyblue */
  --clr-2:#000066;/* deep navy blue */
  --clr-3:#003399; /* navy blue */
  --clr-4:#6699FF; /* baby blue */
  --clr-6:#6699ff4a; /* baby blue */
  --clr-5:#99FFFF; /* ice blue*/
  --text-color:#000000
  