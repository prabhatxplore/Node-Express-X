function calculateArea(width, height) {
    return width *height
}

let width = 10 ,height = 5
if(calculateArea(width,height)>100){
    console.log('The area is large')
}else{
    console.log('the area is small')
}

if(calculateArea(width,height)>=100){
    console.log("area is greater than or equal to 100")
}