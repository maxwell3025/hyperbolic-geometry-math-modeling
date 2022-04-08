class Point3{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }
    get phi(){
        return Math.atan2(this.z, Math.hypot(this.x, this.y))
    }
    get theta(){
        return Math.atan2(this.y, this.x)
    }
    get r(){
        return Math.hypot(this.x, this.y, this.z)
    }
    sub(other){
        return new Point(this.x-other.x, this.y-other.y)
    }
    add(other){
        return new Point(this.x+other.x, this.y+other.y)
    }
    cross(other){
        return new Point3(
            this.y*other.z - this.z*other.y, 
            this.z*other.x - this.x*other.z, 
            this.x*other.y - this.y*other.x
        )
    }
    dot(other){
        return this.x*other.x+this.y*other.y+this.z*other.z
    }
}
class Point{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    get theta(){
        return Math.atan2(this.y, this.x)
    }
    get r(){
        return Math.hypot(this.x, this.y)
    }
    sub(other){
        return new Point(this.x-other.x, this.y-other.y)
    }
    add(other){
        return new Point(this.x+other.x, this.y+other.y)
    }
    static polar(r, theta){
        return new Point(r * Math.cos(theta), r * Math.sin(theta))
    }
}
class Line{

}

class PointH{
    //uses polar
    constructor(r, theta){
        this.r = r
        this.t = theta
    }

    dist(other){
        
    }

    get vec3(){
        return new Point3(
            Math.sinh(this.r) * Math.cos(this.t),
            Math.sinh(this.r) * Math.sin(this.t),
            Math.cosh(this.r)
        )
    }

    get klein(){
        return Point.polar(Math.tanh(this.r),this.theta)
    }

    get poisson(){
        return Point.polar(Math.sinh(this.r)/(Math.cosh(this.r)+1),this.theta)
    }

    

}
class LineH{
    //uses 2 imaginary points at infinity
    constructor(a1, a2){
        this.a1 = a1 % (Math.PI * 2)
        this.a2 = a2 % (Math.PI * 2)
    }

    static fromPoints(a, b){
        //in the hyperbola representation, lines are like slices through the hyperbola and the origin
        let sliceNorm = a.vec3.cross(b.vec3)
        console.log(sliceNorm)
        let center = sliceNorm.theta + Math.PI
        console.log(center)
        let span = Math.acos(Math.tan(sliceNorm.phi))
        console.log(span)
        return new LineH(center+span, center-span)
    }
}

console.log(LineH.fromPoints(new PointH(1, 1), new PointH(1, -1)))

