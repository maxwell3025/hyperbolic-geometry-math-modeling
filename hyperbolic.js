class Point3{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
        this.parity = true
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
        this.normalize()
    }

    dist(other){
        return Math.acosh(
            Math.cosh(this.r)*Math.cosh(other.r) - Math.cos(this.t-other.t)*Math.sinh(this.r)*Math.sinh(other.r)
        )
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

    get halfPlane(){
        
    }
    
    normalize(){
        if(this.r<0){
            this.r *= -1
            this.t += Math.PI
        }
        this.t = this.t % (Math.PI * 2);
        if(this.t < -Math.PI){
            this.t += Math.PI * 2;
        }
        if(this.t > Math.PI){
            this.t -= Math.PI * 2;
        }
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

function LOC(a, b, c){
    let cosAngle = 1./(Math.tanh(b) * Math.tanh(c))
        -Math.cosh(a)/(Math.sinh(b) * Math.sinh(c))
    if(a==0 || b==0 || c==0){
        return NaN
    }
    if(cosAngle<=-1){
        return Math.PI
    }
    if(cosAngle>=1){
        return 0
    }
    return Math.acos(cosAngle)
}

class Vector{
    constructor(pos, dir){
        this.pos = pos
        this.dir = dir
    }
    
    forward(factor){
        let newDist = new PointH(this.pos.r, Math.PI).dist(new PointH(this.dir.r*factor, this.dir.t))
        let angChange = LOC(this.dir.r*factor, this.pos.r, newDist) * Math.sign(this.dir.t*factor)
        let newAng = LOC(this.pos.r, this.dir.r*factor, newDist) * Math.sign(this.dir.t*factor)
        
        if(this.pos.r != 0){
            this.pos.t += angChange
        }else{
            this.pos.t = this.dir.t
        }
        this.pos.r = newDist
        if(newAng == newAng){
            this.dir.t = newAng
        }
        this.pos.normalize()
        this.dir.normalize()
    }

    turn(angle){
        this.dir.t+=angle
        this.dir.normalize()
    }
}
let a = new PointH(0, 0)
let b = new PointH(1, 0)
let v = new Vector(a, b)
console.log(v)
// for(let i = 0;i<5;i++){
//     v.forward(Math.asinh(Math.sqrt(0.5*(1+Math.sqrt(5.)))))
//     v.turn(Math.PI/2)
//     console.log(v)
// }

v.pos = new PointH(0,0)
v.dir = new PointH(1,0)
for(let i = 0;i<4;i++){
    v.forward(2)
    v.turn(Math.PI*2/5.)
    console.log(v)
}